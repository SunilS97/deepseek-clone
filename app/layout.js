import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import { AppProvider } from "@/context/AppContext";

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
      <body className={`${inter.variable} font-sans bg-background text-foreground`}>
        <ClerkProvider>
          <AppProvider>
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1">{children}</main>
            </div>
          </AppProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
