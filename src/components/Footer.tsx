import { profile } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          {profile.name} — {profile.title}
        </p>
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground/70 uppercase">
          Built with React, TypeScript, Tailwind, PixiJS
        </p>
      </div>
    </footer>
  );
}
