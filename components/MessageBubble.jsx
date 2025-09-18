"use client";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
          ${isUser ? "bg-primary text-primary-foreground" : "bg-muted border"}
        `}
      >
        {/* small mode tag (only if assistant and mode exists) */}
        {message.mode && !isUser && (
          <div className="mb-1 text-[10px] opacity-80">
            {message.mode === "deep" ? "🧠 Deep Think" : "🔎 Search"}
          </div>
        )}
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}
