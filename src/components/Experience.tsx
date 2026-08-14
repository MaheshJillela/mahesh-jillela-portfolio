import { Reveal, SectionHeading } from "@/components/Reveal";
import { experience } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading eyebrow="Experience" title="Production work, shipped." />

        <div className="mt-14 space-y-8">
          {experience.map((job) => (
            <Reveal key={job.company}>
              <article className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/40 p-6 sm:p-10">
                <div className="absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.13_190/0.16),transparent_65%)]" />
                <div className="relative flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-medium text-foreground sm:text-3xl">{job.role}</h3>
                    <p className="mt-1 text-base text-accent">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs tracking-[0.18em] text-foreground uppercase">
                      {job.period}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {job.type} · {job.place}
                    </p>
                  </div>
                </div>

                <ul className="relative mt-8 grid gap-4 sm:grid-cols-2">
                  {job.points.map((p, i) => (
                    <Reveal as="li" key={p} delay={i * 0.04} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70" />
                      <span className="text-sm leading-relaxed text-foreground/85">{p}</span>
                    </Reveal>
                  ))}
                </ul>

                <div className="relative mt-8 border-t border-border/60 pt-6">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Technologies used
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border/70 bg-secondary/50 px-3 py-1 font-mono text-[11px] text-foreground/80"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
