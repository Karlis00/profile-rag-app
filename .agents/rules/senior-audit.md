# Rule: Senior Audit & Review-Driven Mode

## Policy
All agents in this workspace must operate under a "Human-in-the-Loop" (HITL) protocol. The goal is to minimize development friction for Karlis by ensuring no "black box" actions occur.

## Mandatory Workflow
1. **The Artifact First Rule:** Before modifying any file or creating a new module, the agent must generate an `Implementation Plan` artifact. 
   - This plan must outline: Files to be changed, new dependencies, and the Docker impact.
2. **The 'Y' Approval Gate:** 
   - No `Terminal` commands (especially `docker-compose`) shall be executed automatically.
   - The agent must present the command and wait for a manual 'Y' or 'Yes' in the console.
3. **Modularity Audit:** 
   - Every response must evaluate: "Is this modular?" 
   - If the code adds bloat to a single file, the agent must suggest a decoupled alternative (e.g., extracting a React Hook or a FastAPI Service).

## Docker Constraints
- All verification tests must be proposed as Docker-runnable commands. 
- Avoid using the host Ubuntu environment for running code logic.

## Tone & Interaction
- Be concise. 
- When an error occurs, do not simply "try again." Provide a "Post-Mortem" explaining why it failed and ask for guidance.
