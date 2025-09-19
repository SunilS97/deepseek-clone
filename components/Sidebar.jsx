// "use client";

// import { useState } from "react";
// import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
// import { useApp } from "@/context/AppContext";
// import ChatLabel from "@/components/ChatLabel";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const { chats, renameChat, deleteChat } = useApp();

//   return (
//     <aside
//       className={`h-screen bg-muted border-r flex flex-col transition-all duration-300 ${
//         isOpen ? "w-64" : "w-20"
//       }`}
//     >
//       {/* Logo + Toggle */}
//       <div className="flex items-center justify-between p-4 border-b">
//         <div className="flex items-center">
//           <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">
//             DS
//           </div>
//           {isOpen && <span className="ml-2 font-bold text-lg">DeepSeek</span>}
//         </div>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="ml-2 p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition"
//           aria-label="Toggle Sidebar"
//         >
//           {isOpen ? "←" : "→"}
//         </button>
//       </div>

//       {/* New Chat */}
//       <div className="p-4">
//         <button className="w-full px-3 py-2 rounded bg-primary text-primary-foreground font-medium hover:opacity-90">
//           {isOpen ? "＋ New Chat" : "＋"}
//         </button>
//       </div>

//       {/* Recents */}
//       <div className="flex-1 overflow-y-auto px-4">
//         <p className="text-sm text-muted-foreground mb-2">
//           {isOpen ? "Recents" : "R"}
//         </p>

//         {chats.length === 0 ? (
//           <p className="text-xs text-muted-foreground">
//             {isOpen ? "No chats yet" : ""}
//           </p>
//         ) : (
//           <ul className="space-y-2">
//             {chats.map((chat) => (
//               <li key={chat.id}>
//                 <ChatLabel
//                   chat={chat}
//                   onRename={(chat) => {
//                     const newTitle = prompt("Enter new chat name:", chat.title);
//                     if (newTitle) renameChat(chat.id, newTitle);
//                   }}
//                   onDelete={(chat) => {
//                     if (confirm(`Delete chat "${chat.title}"?`)) {
//                       deleteChat(chat.id);
//                     }
//                   }}
//                 />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Bottom Section */}
//       <div className="p-4 border-t flex flex-col items-center gap-4">
//         {/* QR Code */}
//         <div className="relative group">
//           <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold cursor-pointer">
//             QR
//           </div>
//           <div className="absolute left-14 bottom-0 w-32 h-32 bg-white border rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition">
//             <img src="/qr.png" alt="QR Code" className="w-full h-full object-contain" />
//           </div>
//         </div>

//         {/* Clerk Profile */}
//         <ClerkProfile isOpen={isOpen} />
//       </div>
//     </aside>
//   );
// }

// /* Helper component for Clerk auth (login/logout) */
// function ClerkProfile({ isOpen }) {
//   const { isSignedIn, user } = useUser();

//   if (isSignedIn) {
//     return (
//       <div
//         className={`w-full ${
//           isOpen
//             ? "flex items-center justify-between gap-2"
//             : "flex justify-center"
//         }`}
//       >
//         {isOpen && (
//           <div className="flex-1 min-w-0">
//             <div className="text-sm font-medium truncate">
//               {user.fullName ||
//                 user.username ||
//                 user.primaryEmailAddress?.emailAddress}
//             </div>
//             <div className="text-xs text-foreground/60 truncate">
//               {user.primaryEmailAddress?.emailAddress}
//             </div>
//           </div>
//         )}
//         <UserButton
//           appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }}
//           afterSignOutUrl="/"
//         />
//       </div>
//     );
//   }

//   return (
//     <SignInButton mode="modal">
//       <button className="w-full px-3 py-2 rounded border hover:bg-muted transition">
//         {isOpen ? "Sign in" : "⇪"}
//       </button>
//     </SignInButton>
//   );
// }


"use client";

import { useState } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useApp } from "@/context/AppContext";
import ChatLabel from "@/components/ChatLabel";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { chats, renameChat, deleteChat, createNewChat, setActiveChat, activeChatId } = useApp();

  return (
    <aside
      className={`h-screen bg-muted border-r flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">
            DS
          </div>
          {isOpen && <span className="ml-2 font-bold text-lg">DeepSeek</span>}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      {/* ✅ New Chat Button */}
      <div className="p-4">
        <button
          onClick={createNewChat}
          className="w-full px-3 py-2 rounded bg-primary text-primary-foreground font-medium hover:opacity-90"
        >
          {isOpen ? "＋ New Chat" : "＋"}
        </button>
      </div>

      {/* Recents */}
      <div className="flex-1 overflow-y-auto px-4">
        <p className="text-sm text-muted-foreground mb-2">
          {isOpen ? "Recents" : "R"}
        </p>

        {chats.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            {isOpen ? "No chats yet" : ""}
          </p>
        ) : (
          <ul className="space-y-2">
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`rounded cursor-pointer ${
                  chat.id === activeChatId ? "bg-primary/10" : ""
                }`}
              >
                <ChatLabel
                  chat={chat}
                  onRename={(chat) => {
                    const newTitle = prompt("Enter new chat name:", chat.title);
                    if (newTitle) renameChat(chat.id, newTitle);
                  }}
                  onDelete={(chat) => {
                    if (confirm(`Delete chat "${chat.title}"?`)) {
                      deleteChat(chat.id);
                    }
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold cursor-pointer">
            QR
          </div>
          <div className="absolute left-14 bottom-0 w-32 h-32 bg-white border rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition">
            <img src="/qr.png" alt="QR Code" className="w-full h-full object-contain" />
          </div>
        </div>
        <ClerkProfile isOpen={isOpen} />
      </div>
    </aside>
  );
}

function ClerkProfile({ isOpen }) {
  const { isSignedIn, user } = useUser();

  if (isSignedIn) {
    return (
      <div
        className={`w-full ${
          isOpen
            ? "flex items-center justify-between gap-2"
            : "flex justify-center"
        }`}
      >
        {isOpen && (
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">
              {user.fullName ||
                user.username ||
                user.primaryEmailAddress?.emailAddress}
            </div>
            <div className="text-xs text-foreground/60 truncate">
              {user.primaryEmailAddress?.emailAddress}
            </div>
          </div>
        )}
        <UserButton
          appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }}
          afterSignOutUrl="/"
        />
      </div>
    );
  }

  return (
    <SignInButton mode="modal">
      <button className="w-full px-3 py-2 rounded border hover:bg-muted transition">
        {isOpen ? "Sign in" : "⇪"}
      </button>
    </SignInButton>
  );
}

