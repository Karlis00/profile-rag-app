---
name: modular-coder
description: Focuses on writing modular, Pythonic, and React code with a heavy emphasis on Docker-based portability and human-readable structures. Use this for scaffolding new features or refactoring modules.
---

# Modular Coder Skill

## Goal
To generate clean, decoupled, and highly readable code that minimizes "friction" during manual human audits. Every output must be ready to run in a containerized environment.

## When to Use This Skill
- When building new components for the React frontend.
- When drafting FastAPI endpoints for the RAG layer.
- When the user requires a "Vibe Coding" workflow (AI generates, Human audits).

## Instructions

### 1. Modular Architecture
- **React:** Favor functional components with custom hooks for logic. Keep styling separated (e.g., CSS Modules or Tailwind).
- **Python:** Use Pydantic models for data validation and keep business logic in dedicated service layers, not in the route handlers.

### 2. Friction-Reduction Rules (The "Karlis" Audit Rule)
- **Readability:** Use descriptive variable names. If a function exceeds 30 lines, suggest a split.
- **Documentation:** Every module must include a short `# Docstring` or `/** JSDoc */` explaining its "Why," not just its "How."
- **Feedback Loop:** After generating code, explicitly list "Potential Friction Points" (e.g., "This requires a local ChromaDB instance to be running").

### 3. Verification & Docker
- Every Python service must include a `requirements.txt` or `pyproject.toml`.
- **Constraint:** You MUST provide a `Dockerfile` with every non-trivial module. 
- Use multi-stage builds to keep images small and secure.

## Examples

### Input: "Create a simple FastAPI health check."
### Output Pattern:
1. **Plan:** "I will create `main.py` with the `/health` endpoint and a corresponding `Dockerfile`."
2. **Execution:** [Generates code with clear comments]
3. **Audit Note:** "Note for Karlis: I used `python:3.11-slim` to reduce image size."

## Constraints
- **NO BLOAT:** Do not include libraries that aren't strictly necessary.
- **NO BLIND EXECUTION:** Never attempt to run code on the host Ubuntu system; always suggest a Docker container.