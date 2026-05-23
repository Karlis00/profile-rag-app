// constants/content.ts — Single source of truth for portfolio content.
// Keep in sync with data/CV_Karlis_Kam_Hung_Chan.md for Phase 3 RAG ingestion.

import {
  Brain,
  Code2,
  Shield,
  Layout,
  Server,
  Linkedin,
  Mail,
  MapPin,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TimelineEra {
  id: string;
  title: string;
  period: string;
  description: string;
  roles: Experience[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  techStack: string[];
  metrics?: string[];
  link?: string;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

// ─── Hero ───────────────────────────────────────────────────────────────────

export const HERO = {
  name: "Karlis (Kam Hung Chan)",
  subtitle: "Software Developer | AI & Web3 Specialist | IT Technician",
  summary:
    "Hong Kong-based developer with a unique trajectory from frontline emergency services and banking to high-level AI specialization. Building AI-driven systems and decentralized applications with resilience forged in high-stakes environments.",
} as const;

// ─── Timeline Eras ──────────────────────────────────────────────────────────

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    id: "era-1",
    title: "Emergency Services & Finance",
    period: "2018 – 2020",
    description:
      "Built foundational high-pressure decision-making skills as an Ambulanceman and managed regulatory narratives at the HK Association of Banks.",
    roles: [
      {
        role: "Ambulanceman",
        company: "Fire Services Department (HKFSD)",
        period: "2018 – 2019",
        highlights: [
          "Provided emergency medical services in high-stakes, time-critical environments.",
          "Demonstrated professional resilience, teamwork, and complex task execution under extreme pressure.",
        ],
      },
      {
        role: "Business Executive",
        company: "The Hong Kong Association of Banks",
        period: "2019 – 2020",
        highlights: [
          "Managed professional operations and high-level correspondence within the financial sector.",
          "Collaborated with industry stakeholders to support organizational objectives and financial standards.",
        ],
      },
    ],
  },
  {
    id: "era-2",
    title: "Software Engineering & AI Pivot",
    period: "2021 – 2026",
    description:
      "Completed Software Engineering (Centennial) and AI Postgraduate (Georgian). Developed EasyFun and CardioScan (ECG Classifier).",
    roles: [
      {
        role: "Blockchain Project Executive",
        company: "Smart Up Incubator",
        period: "2021 – 2022",
        highlights: [
          "Managed blockchain-focused initiatives and project lifecycles within a technology incubator.",
          "Coordinated between technical teams and stakeholders to drive project milestones.",
        ],
      },
      {
        role: "Frontend Developer",
        company: "Nexxus",
        period: "2022 – 2023",
        highlights: [
          "Contributed to frontend architecture using modern JavaScript frameworks.",
          "Built responsive and performant web applications.",
        ],
      },
    ],
  },
  {
    id: "era-3",
    title: "AI & Web3 Research",
    period: "2026 – Present",
    description:
      "Deep-diving into Agentic AI and RAG architectures. Technical testing for decentralized protocols (Polkadex).",
    roles: [
      {
        role: "AI Specialist / Developer",
        company: "Independent",
        period: "2024 – Present",
        highlights: [
          "Engineered RAG pipelines and Agentic AI frameworks using Gemini, ChromaDB, and FastAPI.",
          "Developed CardioScan: AI-based ECG classifier with ResNet and Mamba architectures.",
        ],
      },
      {
        role: "Community Tester",
        company: "Polkadex",
        period: "April 2026 – Present",
        highlights: [
          "Executes end-to-end testing for decentralized exchange (DEX) environments.",
          "Validates Polkadex protocols and monitors cross-chain transfer functionalities.",
        ],
      },
    ],
  },
];

// ─── Projects ───────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: "cardioscan",
    title: "CardioScan",
    description:
      "AI-powered ECG classifier utilizing ResNet and Mamba architectures for automated arrhythmia detection. Processes the PTB-XL dataset with 20,000+ 12-lead ECG recordings for multi-class heart disease classification.",
    featured: true,
    techStack: ["Python", "PyTorch", "ResNet", "Mamba", "FastAPI", "React"],
    metrics: [
      "20,000+ ECG recordings",
      "Multi-model (CNN / ResNet / Mamba)",
      "1–3s inference latency",
    ],
  },
  {
    id: "profile-rag",
    title: "Profile RAG App",
    description:
      "Personal profile web application using an Agentic AI framework and RAG layer. Modular architecture with FastAPI, ChromaDB, and Gemini API, deployed via Docker on Ubuntu.",
    featured: false,
    techStack: ["React", "TypeScript", "FastAPI", "ChromaDB", "Gemini API", "Docker"],
  },
  {
    id: "easyfun",
    title: "EasyFun",
    description:
      "Event registration and participation web application developed at Centennial College. Full-stack implementation handling user registration, event management, and participation tracking.",
    featured: false,
    techStack: ["AngularJS", "Node.js", "MongoDB"],
  },
];

// ─── Skills ─────────────────────────────────────────────────────────────────

export const SKILLS: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "TypeScript", "JavaScript", "Solidity"],
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: [
      "RAG Pipelines",
      "Agentic AI",
      "Computer Vision",
      "Deep Learning",
      "ResNet",
      "Mamba",
    ],
  },
  {
    title: "Web3 & Blockchain",
    icon: Shield,
    skills: ["Substrate Nodes", "Hyperbridge", "Polkadex DEX", "Cross-chain Transfers"],
  },
  {
    title: "Frontend & Design",
    icon: Layout,
    skills: ["React", "Vite", "TailwindCSS", "shadcn/ui", "AngularJS"],
  },
  {
    title: "Backend & Infrastructure",
    icon: Server,
    skills: [
      "FastAPI",
      "Node.js",
      "Docker",
      "docker-compose",
      "Linux (Ubuntu)",
      "PostgreSQL",
      "ChromaDB",
    ],
  },
];

// ─── Education ──────────────────────────────────────────────────────────────

export const EDUCATION: Education[] = [
  {
    degree: "Postgraduate Degree in Artificial Intelligence",
    institution: "Georgian College",
    period: "2024 – 2026",
  },
  {
    degree: "Diploma in Computer Software Engineering",
    institution: "Centennial College",
    period: "2022 – 2023",
  },
];

// ─── Contact ────────────────────────────────────────────────────────────────

export const CONTACTS: ContactLink[] = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kamhung",
    href: "https://www.linkedin.com/in/kamhung/",
    icon: Linkedin,
  },
  {
    label: "Email",
    value: "karlsichan@gmail.com",
    href: "mailto:karlsichan@gmail.com",
    icon: Mail,
  },
];

export const LOCATION = {
  label: "Hong Kong 🇭🇰",
  detail: "Permanent Resident",
  icon: MapPin,
} as const;

export const AVAILABILITY = {
  label: "Immediately Available",
  detail: "Full-time role",
  icon: CalendarCheck,
} as const;

// ─── Nav Links ──────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
