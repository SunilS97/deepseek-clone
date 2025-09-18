"use client";

import { useEffect, useRef, useState } from "react";
import MessageBubble from "@/components/MessageBubble";
import PromptBox from "@/components/PromptBox";

export default function Home() {
  const [messages, setMessages] = useState([]);        // [{id, role, content, mode?}]
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("deep");            // "deep" | "search"
  const scrollRef = useRef(null);

  // auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    // 1) add user message
    const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    // 2) fake loading, then add assistant message
    setIsLoading(true);
    // Simulate thinking/lookup — Phase 7 will be a real API call
    setTimeout(() => {
      const replyText =
        mode === "deep"
          ? "🧠 (Phase 3 demo) Deep Think mode response.\n\nWe’ll wire the real model in Phase 7."
          : "🔎 (Phase 3 demo) Search mode response.\n\nWe’ll wire the real model in Phase 7.";
      const aiMsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: replyText,
        mode, // show mode tag above the assistant bubble
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat scroll area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          // Placeholder greeting
          <div className="mx-auto max-w-2xl text-center mt-24">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted/60 border">
              Welcome
            </div>
            <h1 className="mt-6 text-3xl font-bold">
              Chat with <span className="text-primary">DeepSeek</span>
            </h1>
            <p className="mt-3 text-foreground/70">
              Ask questions about anything. Choose{" "}
              <span className="font-medium">🧠 Deep Think</span> for reasoning
              or <span className="font-medium">🔎 Search</span> when you want
              web-informed answers.
            </p>
            <ul className="mt-6 text-left mx-auto max-w-lg space-y-2 text-foreground/70">
              <li>• Press <b>Enter</b> to send, <b>Shift+Enter</b> for newline.</li>
              <li>• The send button activates only when you type text.</li>
              <li>• This is a Phase 3 placeholder — real AI comes in Phase 7.</li>
            </ul>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {isLoading && (
              <div className="w-full flex justify-start mb-3">
                <div className="px-3 py-2 text-sm rounded-2xl border bg-muted">
                  Thinking…
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Prompt box */}
      <PromptBox
        onSend={handleSend}
        isLoading={isLoading}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
}
