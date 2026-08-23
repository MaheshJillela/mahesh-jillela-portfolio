import { Reveal } from "@/components/Reveal";
import { philosophy } from "@/data/resume";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden py-28 sm:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,var(--accent-soft),transparent_50%)]"
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="flex items-center gap-5">
          <span className="font-mono text-[10px] text-accent">10</span>
          <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
            Developer philosophy
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <h2 className="mt-14 max-w-4xl font-editorial text-5xl leading-[0.94] text-foreground sm:text-7xl">
          Engineering <em className="text-accent">interactive experiences.</em>
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <p className="border-l border-accent pl-6 font-editorial text-2xl leading-snug text-foreground/85 sm:text-3xl">
              “{philosophy.statement}”
            </p>
          </Reveal>

          <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {philosophy.pillars.map((p, i) => (
              <Reveal as="li" key={p.k} delay={i * 0.05} className="group bg-background p-6">
                <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                  {String(i + 1).padStart(2, "0")} / {p.k}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                  {p.v}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
