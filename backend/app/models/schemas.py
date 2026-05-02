# Why: Single source of truth for all request/response shapes.
# Keeping models separate means the router and service layers
# never need to know about HTTP — they just pass typed objects.
from pydantic import BaseModel
from typing import List


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str
    sources: List[str] = []
