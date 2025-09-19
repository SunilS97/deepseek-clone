// "use client";

// import { useApp } from "@/context/AppContext";
// import MessageBubble from "@/components/MessageBubble";
// import PromptBox from "@/components/PromptBox";

// export default function Home() {
//   const { messages, isLoading, scrollRef } = useApp();

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Chat scroll area */}
//       <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
//         {messages.length === 0 ? (
//           // Placeholder greeting
//           <div className="mx-auto max-w-2xl text-center mt-24">
//             <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted/60 border">
//               Welcome
//             </div>
//             <h1 className="mt-6 text-3xl font-bold">
//               Chat with <span className="text-primary">DeepSeek</span>
//             </h1>
//             <p className="mt-3 text-foreground/70">
//               Ask questions about anything. Choose{" "}
//               <span className="font-medium">🧠 Deep Think</span> or{" "}
//               <span className="font-medium">🔎 Search</span>.
//             </p>
//           </div>
//         ) : (
//           <div className="mx-auto max-w-3xl">
//             {messages.map((m) => (
//               <MessageBubble key={m.id} message={m} />
//             ))}
//             {isLoading && (
//               <div className="w-full flex justify-start mb-3">
//                 <div className="px-3 py-2 text-sm rounded-2xl border bg-muted">
//                   Thinking…
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Prompt box */}
//       <PromptBox />
//     </div>
//   );
// }


"use client";

import { useApp } from "@/context/AppContext";
import MessageBubble from "@/components/MessageBubble";
import PromptBox from "@/components/PromptBox";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();
  const { messages, isLoading, scrollRef } = useApp();

  // If not signed in → show welcome page
  if (!isSignedIn) {
    return (
      <div className="flex flex-col h-screen items-center justify-center text-center px-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted/60 border">
          Welcome
        </div>
        <h1 className="mt-6 text-3xl font-bold">
          Welcome to <span className="text-primary">DeepSeek</span>
        </h1>
        <p className="mt-3 text-foreground/70">
          Please sign in to start chatting with the AI assistant.
        </p>
        <div className="mt-6">
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded bg-primary text-primary-foreground font-medium hover:opacity-90">
              Sign in
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  // If signed in → show chat UI
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
              <span className="font-medium">🧠 Deep Think</span> or{" "}
              <span className="font-medium">🔎 Search</span>.
            </p>
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
      <PromptBox />
    </div>
  );
}


