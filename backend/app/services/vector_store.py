# Why: Wraps ChromaDB HTTP client so the rest of the app never imports
# chromadb directly. Swap the vector store here without touching other layers.
import chromadb
from app.config import settings


def get_chroma_client() -> chromadb.HttpClient:
    return chromadb.HttpClient(
        host=settings.chroma_host,
        port=settings.chroma_port,
    )


def get_or_create_collection(client: chromadb.HttpClient):
    """Get (or create) the profile docs collection with cosine similarity."""
    return client.get_or_create_collection(
        name=settings.collection_name,
        metadata={"hnsw:space": "cosine"},
    )
