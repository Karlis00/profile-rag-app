# Why: FastAPI entry point. Uses lifespan context manager (FastAPI 0.93+)
# to run document ingestion once on startup — so /chat works immediately
# without a separate ingest step.
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import chat
from app.services.rag_service import ingest_documents

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Run ingestion before the server accepts requests."""
    logger.info("=== Profile RAG API starting up ===")
    logger.info("Ingesting documents from /app/data ...")
    count = ingest_documents()
    logger.info("Ingestion complete — %d source document(s) loaded.", count)
    yield
    logger.info("=== Profile RAG API shutting down ===")


app = FastAPI(
    title="Profile RAG API",
    description="Answers employer questions using Karlis's CV and project data.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)


@app.get("/health", tags=["meta"])
def health():
    """Liveness probe — returns OK when the server is running."""
    return {"status": "ok"}
