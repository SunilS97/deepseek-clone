import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "DeepSeek Clone",
  description: "AI chat app built with Next.js, Clerk, MongoDB, and TailwindCSS.",
  icons: { icon: "/favicon.ico" },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-background text-foreground`}
      >
        {/* App layout: Sidebar on the left, main chat area on the right */}
        <div className="flex h-screen">
          {/* Sidebar (collapsible) */}
          <Sidebar />

          {/* Main content area (chat UI with PromptBox) */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
