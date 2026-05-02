# Why: Centralises all env-var config in one place using Pydantic Settings.
# Any service that needs config imports `settings` — nothing is hard-coded.
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    gemini_api_key: str

    chroma_host: str = "chromadb"
    chroma_port: int = 8000  # ChromaDB default internal port

    data_dir: str = "/app/data"
    collection_name: str = "profile_docs"
    top_k: int = 5

    class Config:
        env_file = ".env"


settings = Settings()
