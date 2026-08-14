import { profile } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          Built with React · TypeScript · PixiJS
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="self-start font-mono text-[11px] tracking-[0.16em] text-accent uppercase sm:self-auto"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
