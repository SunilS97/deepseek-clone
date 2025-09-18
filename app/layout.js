import "./globals.css";
import { Inter } from "next/font/google";

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
        {children}
      </body>
    </html>
  );
}
