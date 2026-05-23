# Phase 2: Professional Portfolio Foundation — Implementation Plan

> **Status**: ⏳ Awaiting approval
> **Builds on**: Phase 1 (scaffolding complete)
> **Goal**: Transform the frontend from a chat-only UI into a high-density, single-page professional portfolio with smooth scroll navigation.

---

## Current State Audit (What Phase 1 Already Gives Us)

| Asset | Status | Notes |
|---|---|---|
| Vite + React + TypeScript | ✅ Exists | `frontend/` fully scaffolded |
| Tailwind CSS v3 | ✅ Exists | `tailwind.config.ts` + `index.css` with shadcn dark tokens |
| shadcn/ui (Radix UI) | ✅ Exists | `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/*` installed |
| lucide-react | ✅ Exists | `^0.378.0` in `package.json` |
| framer-motion | ❌ Missing | **Must install** |
| `src/components/sections/` | ❌ Missing | **Must create** (Hero, Experience, Projects, Skills, Contact) |
| `src/constants/content.ts` | ❌ Missing | **Must create** (source of truth synced with `data/CV_Karlis_Kam_Hung_Chan.md`) |
| Chat components | ✅ Exists | ChatWindow, ChatInput, MessageBubble, TypingIndicator — **preserve for Phase 3** |
| `App.tsx` | ✅ Exists | Currently chat-only — **will be rewritten** as portfolio layout |
| `frontend/Dockerfile` | ✅ Exists | Dev-only (single stage, `npm run dev`) — **no changes needed** |
| `index.css` | ✅ Exists | Dark theme tokens — **will extend** with portfolio-specific utilities |

---

## Dependency Delta

Only **one** new dependency is needed:

```bash
# Run from frontend/
npm install framer-motion
```

Everything else (React, Tailwind, shadcn, lucide-react) is already installed.

---

## Directory Structure (After Phase 2)

```
frontend/src/
├── App.tsx                          ← REWRITE: portfolio layout + scroll nav
├── main.tsx                         ← no changes
├── index.css                        ← EXTEND: mesh gradient, section utilities
├── constants/
│   └── content.ts                   ← NEW: centralized CV data (source of truth)
├── components/
│   ├── sections/                    ← NEW: 5 portfolio section components
│   │   ├── Hero.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── Navbar.tsx                   ← NEW: sticky top nav with scroll links
│   ├── ui/                          ← shadcn primitives (untouched)
│   ├── ChatWindow.tsx               ← PRESERVE (Phase 3)
│   ├── ChatInput.tsx                ← PRESERVE (Phase 3)
│   ├── MessageBubble.tsx            ← PRESERVE (Phase 3)
│   └── TypingIndicator.tsx          ← PRESERVE (Phase 3)
├── hooks/
│   └── useChat.ts                   ← PRESERVE (Phase 3)
├── services/
│   └── api.ts                       ← PRESERVE (Phase 3)
└── lib/                             ← untouched
```

---

## Implementation Steps

### Step 1: Install framer-motion

```bash
cd frontend && npm install framer-motion
```

No Vite/Tailwind/shadcn re-initialization needed — all already configured.

---

### Step 2: Create `src/constants/content.ts`

> [!IMPORTANT]
> This is the **single source of truth** for all portfolio content. Every section component reads from this file. When `data/CV_Karlis_Kam_Hung_Chan.md` is updated for Phase 3 RAG ingestion, this file must stay in sync.

**Data to extract from existing `data/` files:**

| Content Block | Source File |
|---|---|
| Name, title, tagline | `CV_Karlis_Kam_Hung_Chan.md` lines 1–9 |
| Technical skills (categorized) | `CV_Karlis_Kam_Hung_Chan.md` lines 13–19 |
| Professional experience (5 roles) | `CV_Karlis_Kam_Hung_Chan.md` lines 23–48 |
| Projects (CardioScan, Profile RAG App) | `CV_Karlis_Kam_Hung_Chan.md` lines 52–61 + `CardioScan_System_Report.md` |
| Education | `CV_Karlis_Kam_Hung_Chan.md` lines 64–67 |
| Contact info | `CV_Karlis_Kam_Hung_Chan.md` lines 79–85 |

**Exported types & constants:**

```typescript
// Types
export interface TimelineEra { ... }
export interface Experience { ... }
export interface Project { ... }
export interface SkillCategory { ... }
export interface ContactLink { ... }

// Constants
export const HERO: { name, subtitle, tagline }
export const TIMELINE_ERAS: TimelineEra[]     // 3 eras for visual timeline
export const EXPERIENCES: Experience[]          // 5 roles with details
export const PROJECTS: Project[]               // CardioScan (featured) + Profile RAG App + EasyFun
export const SKILLS: SkillCategory[]           // 5 categories from CV
export const EDUCATION: { ... }[]
export const CONTACTS: ContactLink[]
```

---

### Step 3: Create Section Components

#### 3a. `Navbar.tsx` — Sticky Navigation

- Fixed top, `bg-slate-950/80 backdrop-blur-md`
- Name/logo left-aligned, nav links right-aligned
- Links: `#hero`, `#experience`, `#projects`, `#skills`, `#contact`
- Smooth scroll via `scrollIntoView({ behavior: 'smooth' })`
- Mobile: hamburger menu with slide-in drawer
- Active section highlighting on scroll (IntersectionObserver)

#### 3b. `Hero.tsx` — Identity & AI Hook

- Full viewport height (`min-h-screen`)
- Background: `bg-slate-950` with CSS mesh gradient (radial-gradient positioned top-right, using primary blue + purple hues)
- Content:
  - `h1`: **"Karlis (Kam Hung Chan)"** — large, high-contrast white, Inter font
  - Subhead: **"Software Developer | AI & Web3 Specialist | IT Technician"**
  - Brief 1-2 line professional summary
  - CTA buttons: "View Experience ↓" (scroll) + "Get in Touch" (scroll to Contact)
- framer-motion: fade-in + slide-up on mount
- Subtle animated gradient orb or particles in background

#### 3c. `Experience.tsx` — Career Timeline

> [!TIP]
> The timeline visually narrates the progression: **emergency services → finance → tech → AI/Web3**

**Layout**: Vertical timeline with a glowing line down the center (desktop) or left-aligned (mobile).

**Three Eras** (grouped timeline segments):

| Era | Period | Description |
|---|---|---|
| Emergency Services & Finance | 2018 – 2020 | Ambulanceman (HKFSD) → Business Executive (HK Association of Banks) |
| Software Engineering & AI Pivot | 2021 – 2026 | Centennial College → Georgian College → EasyFun → CardioScan |
| AI & Web3 Research | 2026 – Present | Agentic AI, RAG architectures, Polkadex community testing |

**Per role card**:
- Role title + company
- Date range badge
- 2-3 bullet point highlights
- framer-motion: staggered fade-in as cards scroll into view

#### 3d. `Projects.tsx` — Project Grid

**Layout**: Featured project (CardioScan) spans full width with expanded detail. Below: 2-column grid for smaller projects.

**CardioScan** (featured):
- Title + "AI Healthcare" badge
- Description from `CardioScan_System_Report.md`
- Tech stack badges: `Python`, `PyTorch`, `ResNet`, `Mamba`, `FastAPI`, `React`
- Key metrics: "20,000+ ECG recordings", "Multi-model (CNN/ResNet/Mamba)", "1-3s inference"

**Profile RAG App**:
- Self-referential — "The site you're viewing"
- Tech badges: `React`, `FastAPI`, `ChromaDB`, `Gemini API`, `Docker`

**EasyFun**:
- Event registration webapp
- Tech badges: `AngularJS`, `Node.js`

Each card: hover lift effect, border glow on hover, framer-motion entrance animation.

#### 3e. `Skills.tsx` — Categorized Tech Stack

**Layout**: Grid of skill category cards (2-3 columns).

| Category | Skills |
|---|---|
| Languages | Python, TypeScript, JavaScript, Solidity |
| AI & Machine Learning | RAG pipelines, Agentic AI, Computer Vision, Deep Learning (ResNet, Mamba) |
| Web3 & Blockchain | Substrate nodes, Hyperbridge, Polkadex DEX |
| Frontend & Design | React, Vite, TailwindCSS, shadcn/ui |
| Backend & Infra | FastAPI, Node.js, Docker, docker-compose, Linux, PostgreSQL, ChromaDB |

Each skill: small pill/badge with icon where possible (lucide-react).
Category cards: subtle gradient borders, hover scale effect.

#### 3f. `Contact.tsx` — Socials & CTA

- Clean section with contact info
- Links: LinkedIn (`linkedin.com/in/kamhung/`), Email (`karlsichan@gmail.com`)
- Location badge: "Hong Kong 🇭🇰"
- Availability badge: "Immediately Available"
- Optional: "Ask my AI" button (hooks into Phase 3 chat)

---

### Step 4: Rewrite `App.tsx`

**From** (Phase 1): sidebar + chat-only layout
**To** (Phase 2): full-page scrolling portfolio

```tsx
// Simplified structure
<>
  <Navbar />
  <main className="scroll-smooth">
    <Hero />
    <Experience />
    <Projects />
    <Skills />
    <Contact />
  </main>
</>
```

- Each section wrapped in `<section id="..." className="min-h-screen">` for anchor navigation
- `scroll-smooth` on html element via CSS
- Phase 1 chat components are **not deleted** — they remain in `components/` for Phase 3 integration

---

### Step 5: Extend `index.css`

Add to existing file (preserve all current tokens):

```css
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Mesh gradient utility for Hero */
.mesh-gradient {
  background:
    radial-gradient(ellipse at 80% 20%, hsl(217 91% 60% / 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, hsl(280 70% 50% / 0.08) 0%, transparent 50%);
}

/* Timeline glow line */
.timeline-line {
  background: linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05));
}
```

---

### Step 6: Docker Verification

The existing `frontend/Dockerfile` runs `npm run dev` — **no changes needed**. The new `framer-motion` dependency will be installed during `docker compose build` via the existing `RUN npm install` step.

**Verify**: `docker compose up --build` → frontend at `localhost:5173` renders the portfolio.

---

## Files Changed Summary

| Action | File | Description |
|---|---|---|
| **INSTALL** | `package.json` | Add `framer-motion` dependency |
| **NEW** | `src/constants/content.ts` | Centralized CV data (source of truth) |
| **NEW** | `src/components/Navbar.tsx` | Sticky nav with scroll links |
| **NEW** | `src/components/sections/Hero.tsx` | Identity section with mesh gradient |
| **NEW** | `src/components/sections/Experience.tsx` | Career timeline (3 eras, 5+ roles) |
| **NEW** | `src/components/sections/Projects.tsx` | Featured CardioScan + project grid |
| **NEW** | `src/components/sections/Skills.tsx` | Categorized tech stack badges |
| **NEW** | `src/components/sections/Contact.tsx` | Socials, email, availability |
| **REWRITE** | `src/App.tsx` | Portfolio layout (replaces chat layout) |
| **EXTEND** | `src/index.css` | Mesh gradient, timeline, scroll utilities |

**Preserved (untouched):**
- `src/components/ChatWindow.tsx`
- `src/components/ChatInput.tsx`
- `src/components/MessageBubble.tsx`
- `src/components/TypingIndicator.tsx`
- `src/hooks/useChat.ts`
- `src/services/api.ts`
- `frontend/Dockerfile`
- All backend & docker-compose files

---

## Verification Plan

### Visual
- [ ] `localhost:5173` → portfolio renders (not the old chat UI)
- [ ] Hero section: slate-950 bg, mesh gradient visible, name + subtitle rendered
- [ ] Experience timeline: 3 eras displayed with role cards
- [ ] Projects: CardioScan featured card with tech badges
- [ ] Skills: 5 categories with pill badges
- [ ] Contact: LinkedIn + email links functional

### Navigation
- [ ] Navbar links smooth-scroll to correct sections (`#experience`, `#projects`, etc.)
- [ ] Active section highlights in navbar on scroll

### Responsiveness
- [ ] Mobile (375px): single-column layout, hamburger menu, timeline left-aligned
- [ ] Tablet (768px): 2-column grids where applicable
- [ ] Desktop (1280px+): full layout with centered content

### Docker
- [ ] `docker compose up --build` → frontend builds successfully with framer-motion
- [ ] Portfolio loads at `localhost:5173`

### Preserved Functionality
- [ ] Chat components still exist in `src/components/` (no import errors, ready for Phase 3)

---

## What's NOT in Phase 2

- RAG chatbot integration into portfolio (Phase 3)
- `/ingest` endpoint (Phase 3)
- Production build + nginx (Phase 3)
- Authentication / rate limiting (Phase 3)
- Streaming responses (Phase 3)
