// App — root layout: sidebar + chat area.
// Dark, professional theme using the shadcn/ui design token system.
import { Sparkles, Github, Linkedin } from "lucide-react";
import { ChatWindow } from "@/components/ChatWindow";
import { ChatInput } from "@/components/ChatInput";
import { useChat } from "@/hooks/useChat";

const SUGGESTED_QUESTIONS = [
  "What are Karlis's strongest technical skills?",
  "Tell me about his AI and ML experience.",
  "What projects has he built with Docker?",
  "Is he open to relocation?",
];

export default function App() {
  const { messages, isLoading, error, sendMessage } = useChat();

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-72 border-r border-border bg-card px-6 py-8 gap-6">
        {/* Identity */}
        <div>
          <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-4">
            <Sparkles className="text-primary" size={20} />
          </div>
          <h1 className="text-lg font-semibold tracking-tight">Karlis</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Software Engineer · AI &amp; Full-Stack
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Suggested questions */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
            Try asking
          </p>
          <ul className="space-y-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <li key={q}>
                <button
                  onClick={() => sendMessage(q)}
                  disabled={isLoading}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors leading-snug disabled:opacity-40"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer links */}
        <div className="space-y-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={14} /> LinkedIn
          </a>
          <p className="text-xs text-muted-foreground pt-2 border-t border-border">
            ✨ Powered by Gemini
          </p>
        </div>
      </aside>

      {/* ── Chat area ── */}
      <main className="flex flex-col flex-1 min-w-0">
        {/* Header (mobile) */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
          <Sparkles className="text-primary" size={18} />
          <span className="font-semibold text-sm">Karlis | AI Profile</span>
        </header>

        {/* Error banner */}
        {error && (
          <div className="mx-4 mt-4 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Messages */}
        <ChatWindow messages={messages} isLoading={isLoading} />

        {/* Input */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}
