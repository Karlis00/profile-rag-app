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
  subtitle: "Software Developer | AI & Web3 Specialist",
  summary:
    "Adaptable Software Developer and AI Specialist focused on engineering robust web applications, Agentic AI pipelines, and Web3 solutions. Combining deep technical expertise with a diverse background in government services, finance, and healthcare, I excel at delivering resilient, scalable software in fast-paced, agile environments.",
} as const;

// ─── Timeline Eras ──────────────────────────────────────────────────────────

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    id: "era-1",
    title: "Government Services & Finance",
    period: "2019 – 2022",
    description:
      "Developed high-pressure decision-making and stakeholder management skills through roles in the Fire Services Department, Drainage Services Department, and the financial sector.",
    roles: [
      {
        role: "Community Relations Officer",
        company: "Drainage Services Department (HKDSD)",
        period: "10/2021 – 03/2022",
        highlights: [
          "Managed public consultations and liaised with community stakeholders.",
          "Resolved project complaints to ensure smooth public works implementation.",
        ],
      },
      {
        role: "Ambulanceman",
        company: "Fire Services Department (HKFSD)",
        period: "04/2020 – 10/2021",
        highlights: [
          "Coordinated real-time emergency resources and managed high-pressure incidents.",
          "Executed rapid risk assessments under tight timelines.",
        ],
      },
      {
        role: "Business Executive",
        company: "The Hong Kong Association of Banks",
        period: "10/2019 – 04/2020",
        highlights: [
          "Supported high-level administrative and project tasks within the financial sector.",
          "Liaised with member banks and regulatory bodies to support industry-wide initiatives.",
        ],
      },
    ],
  },
  {
    id: "era-2",
    title: "Software Engineering & Web Development",
    period: "2019 – 2023",
    description:
      "Transitioned into tech, working on blockchain applications and frontend development, alongside completing a Software Engineering diploma.",
    roles: [
      {
        role: "Frontend Development Consultant",
        company: "Nexxus",
        period: "09/2022 – 06/2023",
        highlights: [
          "Developed and maintained responsive user interfaces using React and React Native.",
          "Collaborated with backend teams to integrate RESTful APIs and optimized frontend performance.",
        ],
      },
      {
        role: "Blockchain Project Executive",
        company: "Smart Up Incubator Limited",
        period: "04/2019 – 10/2019",
        highlights: [
          "Contributed to the design and implementation of the 'SmartUp' DApp using Agile/Scrum.",
          "Built responsive frontend components using JavaScript and performed UI validation.",
        ],
      },
    ],
  },
  {
    id: "era-3",
    title: "AI & Web3 Research",
    period: "2024 – Present",
    description:
      "Deep-diving into Agentic AI, RAG architectures, and testing decentralized exchange protocols.",
    roles: [
      {
        role: "AI Specialist / Developer",
        company: "Independent",
        period: "01/2024 – Present",
        highlights: [
          "Engineered RAG pipelines and Agentic AI frameworks using Gemini, ChromaDB, and FastAPI.",
          "Developed CardioScan: AI-based ECG classifier with ResNet and Mamba architectures.",
        ],
      },
      {
        role: "Community Volunteering Tester",
        company: "Polkadex",
        period: "04/2026 – Present",
        highlights: [
          "Managing the E2E testing lifecycle for a decentralized exchange (DEX) protocol.",
          "Stress-testing protocols under high-frequency trading scenarios for reliability and security.",
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
    metrics: ["Status: Running Right Now", "Agentic AI Framework"],
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
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "C#", "Java", "Solidity"],
  },
  {
    title: "AI & Data Science",
    icon: Brain,
    skills: [
      "RAG Pipelines",
      "LLMs & Prompt Engineering",
      "Deep Learning (CNN, ResNet, Mamba)",
      "TensorFlow & Scikit-learn",
      "Pandas",
      "Google AI Studio",
    ],
  },
  {
    title: "Web3 & Blockchain",
    icon: Shield,
    skills: ["Substrate Nodes", "Hyperbridge", "Polkadex DEX", "Cross-chain Transfers"],
  },
  {
    title: "Frontend & Mobile",
    icon: Layout,
    skills: ["React", "React Native", "Flutter", "Vite", "TailwindCSS", "AngularJS"],
  },
  {
    title: "Backend & Cloud",
    icon: Server,
    skills: [
      "FastAPI",
      "Node.js",
      "ExpressJS",
      "Docker",
      "AWS & Azure",
      "PostgreSQL",
      "ChromaDB",
    ],
  },
];

// ─── Education ──────────────────────────────────────────────────────────────

export const EDUCATION: Education[] = [
  {
    degree: "Postgraduate Certificate in Artificial Intelligence",
    institution: "Georgian College",
    period: "01/2024 – 04/2026",
  },
  {
    degree: "Diploma in Computer Software Engineering",
    institution: "Centennial College",
    period: "01/2022 – 04/2023",
  },
  {
    degree: "Bachelor of Arts in Journalism and Communication",
    institution: "Chu Hai College of Higher Education",
    period: "01/2009 – 07/2013",
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
