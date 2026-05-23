import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatWindow } from "./ChatWindow";
import { ChatInput } from "./ChatInput";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Container */}
      <div
        className={cn(
          "mb-4 flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ease-in-out origin-bottom-right",
          isOpen
            ? "h-[500px] w-[350px] scale-100 opacity-100 sm:h-[600px] sm:w-[400px]"
            : "h-0 w-0 scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs text-primary-foreground/80">Ask me about Karlis's background</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 transition-colors hover:bg-primary-foreground/20 sm:hidden"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Chat area */}
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
      
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Toggle chat"
      >
        <MessageCircle 
          size={28} 
          className={cn("absolute transition-all duration-300", isOpen ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0")} 
        />
        <X 
          size={28} 
          className={cn("absolute transition-all duration-300", isOpen ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90")} 
        />
      </button>
    </div>
  );
}
