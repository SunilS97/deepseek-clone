export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted/60 border">
          Phase 1 • Setup Complete
        </div>

        {/* Title */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight">
          DeepSeek <span className="text-primary">Clone</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-foreground/70">
          Next.js + TailwindCSS is configured. Let&apos;s build the sidebar next.
        </p>

        {/* Button */}
        <a
          href="#"
          className="mt-8 inline-flex items-center rounded-xl border px-4 py-2 font-medium hover:shadow-md"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}
