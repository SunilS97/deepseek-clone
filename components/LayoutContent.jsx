"use client";

import { useUser } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";

export default function LayoutContent({ children }) {
  const { isSignedIn } = useUser();

  return (
    <div className="flex h-screen">
      {isSignedIn && <Sidebar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
