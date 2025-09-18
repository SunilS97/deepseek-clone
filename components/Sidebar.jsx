"use client";
import { useState } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`h-screen bg-muted border-r flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        {/* Simple DS logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">
            DS
          </div>
          {isOpen && <span className="ml-2 font-bold text-lg">DeepSeek</span>}
        </div>

        {/* Collapse/Expand button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button className="w-full px-3 py-2 rounded bg-primary text-primary-foreground font-medium hover:opacity-90">
          {isOpen ? "＋ New Chat" : "＋"}
        </button>
      </div>

      {/* Recents */}
      <div className="flex-1 overflow-y-auto px-4">
        <p className="text-sm text-muted-foreground mb-2">
          {isOpen ? "Recents" : "R"}
        </p>
        <ul className="space-y-2">
          <li className="p-2 rounded hover:bg-muted cursor-pointer">
            {isOpen ? "Chat 1" : "C1"}
          </li>
          <li className="p-2 rounded hover:bg-muted cursor-pointer">
            {isOpen ? "Chat 2" : "C2"}
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t flex flex-col items-center gap-4">
        {/* QR Code hover */}
        <div className="relative group">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold cursor-pointer">
            QR
          </div>
          <div className="absolute left-14 bottom-0 w-32 h-32 bg-white border rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition">
            <img
              src="/qr.png"
              alt="QR Code"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Clerk Profile Section */}
        <ClerkProfile isOpen={isOpen} />
      </div>
    </aside>
  );
}

/* Helper component for Clerk auth (login/logout) */
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
