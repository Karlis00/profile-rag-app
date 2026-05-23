# Why: Orchestrates the full RAG pipeline in one place.
# ingest_documents() runs on startup; answer_question() handles each /chat call.
import logging
from pathlib import Path
from jinja2 import Template

from app.config import settings
from app.services.vector_store import get_chroma_client, get_or_create_collection
from app.services.llm_service import embed_query, embed_documents, generate_answer

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Prompt template — tweak tone/instructions here without touching logic.
# ---------------------------------------------------------------------------
_PROMPT_TEMPLATE = Template(
    """You are a professional AI assistant representing Karlis to potential employers.
Answer the question truthfully and confidently using ONLY the context provided below.
If the context does not contain enough information, say:
"I don't have specific details on that yet, but Karlis would be happy to discuss it further."

Context:
{% for chunk in chunks %}---
{{ chunk }}
{% endfor %}

Employer's question: {{ question }}

Answer:"""
)


# ---------------------------------------------------------------------------
# Ingestion
# ---------------------------------------------------------------------------
def ingest_documents() -> int:
    """
    Load all .md files from the data directory and upsert into ChromaDB.
    Chunking strategy: split on double newlines, skip chunks under 20 chars.
    Returns the number of source documents processed.
    """
    client = get_chroma_client()
    collection = get_or_create_collection(client)

    if collection.count() > 0:
        logger.info("Documents already ingested into ChromaDB. Skipping ingestion.")
        return collection.count()

    data_path = Path(settings.data_dir)
    doc_paths = list(data_path.rglob("*.md"))

    if not doc_paths:
        logger.warning("No .md files found in %s — /chat will return empty context.", settings.data_dir)
        return 0

    for doc_path in doc_paths:
        text = doc_path.read_text(encoding="utf-8")
        # Simple paragraph-level chunking
        chunks = [c.strip() for c in text.split("\n\n") if len(c.strip()) > 20]

        if not chunks:
            continue

        # Batch embed all chunks for a document
        embeddings = embed_documents(chunks)
        doc_ids = [f"{doc_path.stem}_{i}" for i in range(len(chunks))]
        metadatas = [{"source": doc_path.name} for _ in chunks]

        collection.upsert(
            ids=doc_ids,
            embeddings=embeddings,
            documents=chunks,
            metadatas=metadatas,
        )

        logger.info("Ingested %d chunks from %s", len(chunks), doc_path.name)

    return len(doc_paths)


# ---------------------------------------------------------------------------
# Retrieval + Generation
# ---------------------------------------------------------------------------
def answer_question(question: str) -> dict:
    """
    Full RAG pipeline:
    1. Embed the question
    2. Retrieve top-k chunks from ChromaDB
    3. Build a prompt with context
    4. Generate answer via Gemini
    5. Return answer + deduplicated source list
    """
    try:
        client = get_chroma_client()
        collection = get_or_create_collection(client)

        question_embedding = embed_query(question)

        results = collection.query(
            query_embeddings=[question_embedding],
            n_results=settings.top_k,
            include=["documents", "metadatas"],
        )

        chunks = results["documents"][0] if results["documents"] else []
        raw_sources = [m["source"] for m in results["metadatas"][0]] if results["metadatas"] else []
        # Deduplicate while preserving order
        sources = list(dict.fromkeys(raw_sources))

        if not chunks:
            return {
                "answer": (
                    "My knowledge base is still being set up. "
                    "Please ensure the data directory contains your CV and project files."
                ),
                "sources": [],
            }

        prompt = _PROMPT_TEMPLATE.render(chunks=chunks, question=question)
        answer = generate_answer(prompt)

        return {"answer": answer, "sources": sources}
    except Exception as e:
        logger.error("Error during RAG pipeline: %s", e)
        return {
            "answer": "I'm currently experiencing high traffic or a temporary network issue. Please try again in a few moments, or feel free to reach out to Karlis directly through the contact section!",
            "sources": []
        }
