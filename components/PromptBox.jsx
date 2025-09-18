"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function PromptBox() {
  const { sendMessage, isLoading, mode, setMode } = useApp();
  const [input, setInput] = useState("");

  const canSend = input.trim().length > 0 && !isLoading;

  const handleSubmit = () => {
    if (!canSend) return;
    sendMessage(input.trim());
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t bg-background p-4">
      {/* Mode toggle */}
      <div className="mb-2 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("deep")}
          className={`px-3 py-1 rounded-full text-sm border ${
            mode === "deep"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/70"
          }`}
        >
          🧠 Deep Think
        </button>
        <button
          type="button"
          onClick={() => setMode("search")}
          className={`px-3 py-1 rounded-full text-sm border ${
            mode === "search"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/70"
          }`}
        >
          🔎 Search
        </button>
      </div>

      {/* Input + Send */}
      <div className="flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask anything... (Enter to send, Shift+Enter for newline)"
          rows={3}
          className="flex-1 resize-none rounded-xl border border-gray-400 bg-white px-3 py-2 outline-none focus:border-gray-900 focus:ring-0"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSend}
          className={`h-10 px-4 rounded-xl font-medium border ${
            canSend
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-muted text-foreground/40 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}
