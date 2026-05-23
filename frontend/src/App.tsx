// App — Phase 2: single-page professional portfolio layout with scroll navigation.
// Phase 1 chat components (ChatWindow, ChatInput, etc.) are preserved in
// src/components/ for Phase 3 RAG chatbot integration.
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { FloatingChat } from "@/components/FloatingChat";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <FloatingChat />
    </div>
  );
}
