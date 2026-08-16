import { Reveal, SectionHeading } from "@/components/Reveal";
import { techStack } from "@/data/resume";

export function TechStack() {
  return (
    <section id="stack" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="07"
          eyebrow="Tech stack"
          title="Grouped by what I actually use it for."
          lead="No logo wall. Frontend is the primary block — everything else is there because a production application needed it."
        />

        <div className="mt-16 space-y-4">
          {techStack.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05}>
              <div
                className={`grid gap-5 rounded-xl border p-6 sm:grid-cols-[13rem_1fr] sm:gap-10 sm:p-8 ${
                  g.primary ? "border-accent/50 bg-accent/5" : "border-border bg-surface/50"
                }`}
              >
                <div>
                  <p
                    className={`font-mono text-[10px] tracking-[0.16em] uppercase ${
                      g.primary ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {g.group}
                  </p>
                  <p className="mt-2 font-mono text-[10px] text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")} / {techStack.length}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 transition-colors ${
                        g.primary
                          ? "border-accent/40 bg-accent/10 font-display text-sm font-medium text-foreground hover:border-accent hover:text-accent sm:text-base"
                          : "border-border bg-background/70 text-sm text-foreground/80 hover:border-accent/50 hover:text-foreground"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 shrink-0 rounded-full ${g.primary ? "bg-accent" : "bg-accent/40"}`}
                      />
                      {it}
                    </li>
                  ))}
                </ul>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
