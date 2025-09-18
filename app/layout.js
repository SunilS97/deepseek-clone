import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "DeepSeek Clone",
  description:
    "AI chat app built with Next.js, Clerk, MongoDB, and TailwindCSS.",
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
        <ClerkProvider
          appearance={{
            elements: {
              card: "shadow-xl rounded-2xl",
              headerTitle: "text-xl",
              formFieldInput:
                "border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/40",
              button: "rounded-lg",
            },
          }}
        >
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
