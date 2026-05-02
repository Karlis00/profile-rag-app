# Profile Webapp with a RAG Bot 🤖

A containerized, Retrieval-Augmented Generation (RAG) agent designed to act as a personal professional surrogate. This app allows users to interact with an AI that has "read" my CV and project documentation to provide accurate, context-aware answers about my professional background.

---

## 🏗️ Technical Architecture

The application is built with a focus on modularity and security, specifically designed to operate from regions with restricted AI access (like Hong Kong) using a VPN sidecar.

*   **Frontend:** Vite + React (Ghibli-inspired aesthetic).
*   **Backend:** FastAPI + Uvicorn.
*   **Vector Database:** ChromaDB for semantic search and document storage.
*   **LLM & Embeddings:** Google Gemini for high-speed, cost-effective inference.
*   **Networking:** [Gluetun](https://github.com/qdm12/gluetun) VPN client (WireGuard/Surfshark) to bypass geofencing for API calls.

## 🚀 Key Features

*   **Smart Ingestion:** Automatically parses and embeds markdown documentation (`cv.md`, `SKILL.md`) into a vector store on startup.
*   **Geofence Bypass:** Integrated VPN gateway ensures stable connectivity to global AI services from any location.
*   **Persona-Driven:** Uses a `SKILL.md` directive layer to ensure the AI maintains a consistent professional persona and follows specific communication rules.
*   **Optimized Performance:** Specifically tuned for the 2026 Gemini 2.5 Flash-Lite model for the best balance of quota and reasoning.

## 🛠️ Prerequisites

*   **Docker & Docker Compose**
*   **Surfshark VPN Account** (or any WireGuard-compatible provider)
*   **Google Gemini API Key** (from AI Studio)

## 📦 Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Karlis00/profile-rag-app.git](https://github.com/Karlis00/profile-rag-app.git)
    cd profile-rag-app
    ```

2.  **Configure Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    GEMINI_API_KEY=your_gemini_key_here
    SURFSHARK_WG_PRIVATE_KEY=your_wireguard_private_key
    SURFSHARK_WG_ADDRESS=your_wireguard_address/32
    ```

3.  **Deploy with Docker Compose:**
    ```bash
    docker-compose up -d
    ```

4.  **Access the App:**
    *   **Frontend:** `http://localhost:5173`
    *   **Backend API:** `http://localhost:8000` (Routed through VPN)
    *   **ChromaDB:** `http://localhost:8001`

## 📂 Project Structure
```text
├── backend/
│   ├── app/
│   │   ├── services/      # RAG logic, LLM service, and Embeddings
│   │   └── routers/       # API endpoints (/chat)
│   └── Dockerfile
├── frontend/
│   ├── src/               # React components & UI
│   └── Dockerfile
├── data/
│   ├── cv.md              # Knowledge source for the AI
│   └── SKILL.md           # Instructions for the AI's persona
└── docker-compose.yml     # Multi-container orchestration
