// ChatInput — sticky input bar at the bottom of the chat.
// Replace with v0.dev generated version for a premium look.
import { useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (question: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-background px-4 py-3">
      <div className="flex items-end gap-2 bg-secondary rounded-xl px-3 py-2">
        <textarea
          id="chat-input"
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none leading-relaxed max-h-32"
          placeholder="Ask about Karlis's experience, skills or projects…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          id="chat-send-btn"
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center transition-opacity disabled:opacity-40 hover:opacity-90"
          aria-label="Send message"
        >
          <Send size={14} />
        </button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        Press <kbd className="px-1 py-0.5 rounded bg-muted text-xs">Enter</kbd> to send · Shift+Enter for new line
      </p>
    </div>
  );
}
