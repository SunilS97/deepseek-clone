"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

// 1. Create the context
const AppContext = createContext();

// 2. Provider component
export function AppProvider({ children }) {
  const [messages, setMessages] = useState([]);     // chat history
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("deep");         // "deep" or "search"
  const scrollRef = useRef(null);

  // Auto-scroll to bottom whenever messages or loading changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Simulated send (Phase 7 will replace with real AI call)
  const sendMessage = async (text) => {
    const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    setIsLoading(true);
    setTimeout(() => {
      const reply = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          mode === "deep"
            ? "🧠 (Phase 5 demo) Deep Think response."
            : "🔎 (Phase 5 demo) Search response.",
        mode,
      };
      setMessages((prev) => [...prev, reply]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <AppContext.Provider
      value={{
        messages,
        setMessages,
        isLoading,
        setIsLoading,
        mode,
        setMode,
        sendMessage,
        scrollRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// 3. Hook for easy access
export const useApp = () => useContext(AppContext);
