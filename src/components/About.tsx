import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { aboutPoints, education, positioning, profile } from "@/data/resume";

function CoreDiagram() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="noise relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-10">
      <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative">
        <p className="label text-muted-foreground">My core</p>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-4 overflow-hidden rounded-lg border border-accent/50 bg-accent/10 px-5 py-7 text-center"
        >
          {!reduce ? (
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-accent/15 to-transparent"
              animate={{ x: ["0%", "400%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            />
          ) : null}
          <span className="relative font-display text-3xl font-medium tracking-[-0.02em] text-accent sm:text-5xl">
            {positioning.core}
          </span>
          <span className="relative mt-2 block font-mono text-[10px] tracking-[0.2em] text-accent/70 uppercase">
            Primary expertise
          </span>
        </motion.div>

        <div className="mt-6 flex flex-col items-center">
          <span aria-hidden="true" className="h-6 w-px bg-border-strong" />
          <p className="label mt-3 text-muted-foreground">My extended engineering</p>
        </div>

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {positioning.extended.map((e, i) => (
            <motion.li
              key={e}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onMouseEnter={() => setActive(e)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(e)}
                onBlur={() => setActive(null)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors ${
                  active === e
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {e}
              </button>
              {i < positioning.extended.length - 1 ? (
                <span aria-hidden="true" className="font-mono text-[10px] text-accent/50">
                  →
                </span>
              ) : null}
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 border-t border-border pt-5 text-sm leading-relaxed text-foreground/85">
          {positioning.statement}
        </p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading index="01" eyebrow="About" title="Frontend first. Production aware." />

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                {profile.description}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-10 space-y-5">
                {[
                  { k: "Role", v: profile.title },
                  { k: "Based", v: profile.location },
                  { k: "Degree", v: education.degree },
                  { k: "Institute", v: education.school },
                  { k: "Period", v: `${education.period} · CGPA ${education.cgpa}` },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border pb-4"
                  >
                    <dt className="label text-muted-foreground">{row.k}</dt>
                    <dd className="text-sm leading-snug text-foreground">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="space-y-10">
            <Reveal delay={0.06}>
              <CoreDiagram />
            </Reveal>

            <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {aboutPoints.map((p, i) => (
                <Reveal as="li" key={p.k} delay={i * 0.04} className="group bg-background p-5">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
                    {p.k}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80 transition-colors group-hover:text-foreground">
                    {p.v}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
