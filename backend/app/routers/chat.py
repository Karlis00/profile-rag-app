# Why: Thin route handler — all business logic lives in rag_service.
# Routers should never contain logic; they translate HTTP ↔ service calls.
from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.rag_service import answer_question

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    result = answer_question(request.question)
    return ChatResponse(**result)
