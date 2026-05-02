// Why: Thin API layer — all backend communication goes through here.
// Swap the base URL here if the backend moves; nothing else needs changing.
import axios from "axios";

const api = axios.create({
  // Empty baseURL: Vite dev proxy forwards /chat and /health to backend:8000
  baseURL: "",
  headers: { "Content-Type": "application/json" },
});

export interface ChatResponse {
  answer: string;
  sources: string[];
}

export async function sendQuestion(question: string): Promise<ChatResponse> {
  const { data } = await api.post<ChatResponse>("/chat", { question });
  return data;
}

export async function checkHealth(): Promise<boolean> {
  try {
    await api.get("/health");
    return true;
  } catch {
    return false;
  }
}
