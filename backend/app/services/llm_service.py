# app/services/llm_service.py
from google import genai
import os
from app.config import settings

# Initialize the 2026 Client (defaults to v1 stable)
client = genai.Client(api_key=settings.gemini_api_key)

# FLAGSHIP MODEL 2026: gemini-embedding-2
# This model is multimodal and doesn't use the old 'task_type' parameter.
EMBED_MODEL = "gemini-embedding-2"

def embed_query(text: str) -> list[float]:
    """Embed a user question for retrieval."""
    # For Embedding 2, we provide instructions directly in the prompt 
    # instead of using a task_type enum.
    response = client.models.embed_content(
        model=EMBED_MODEL,
        contents=f"Represent this query for retrieving relevant documents: {text}"
    )
    return response.embeddings[0].values

def embed_document(text: str) -> list[float]:
    """Embed a document chunk for storage."""
    response = client.models.embed_content(
        model=EMBED_MODEL,
        contents=text # Standard documents don't need special instructions
    )
    return response.embeddings[0].values

def embed_documents(texts: list[str]) -> list[list[float]]:
    """Embed a list of document chunks for storage in a single batch request."""
    response = client.models.embed_content(
        model=EMBED_MODEL,
        contents=texts
    )
    return [e.values for e in response.embeddings]

def generate_answer(prompt: str) -> str:
    """Call the latest stable flash model."""
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )
    return response.text