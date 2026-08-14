import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { education, pillars, profile } from "@/data/resume";

const statements = [
  "Frontend Development",
  "Interactive Experiences",
  "React",
  "PixiJS",
  "Animation",
  "Performance",
  "Full-Stack Development",
];

export function About() {
  const [hover, setHover] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* Left: heading + facts, offset editorial column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading index="01" eyebrow="About" title="Engineer first, interaction always." />

            <Reveal delay={0.1}>
              <dl className="mt-12 space-y-5">
                {[
                  { k: "Role", v: profile.title },
                  { k: "Based", v: profile.location },
                  { k: "Degree", v: education.degree },
                  { k: "Institute", v: `${education.school}` },
                  { k: "Period", v: `${education.period} · CGPA ${education.cgpa}` },
                ].map((row) => (
                  <div key={row.k} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border pb-4">
                    <dt className="label text-muted-foreground">{row.k}</dt>
                    <dd className="text-sm leading-snug text-foreground">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: big typographic statements, each with contextual note */}
          <div>
            <ul className="-mt-2">
              {statements.map((s, i) => {
                const pillar = pillars.find((p) => p.label === s) ?? pillars[i % pillars.length]!;
                const isOn = hover === i;
                return (
                  <Reveal
                    as="li"
                    key={s}
                    delay={i * 0.04}
                    className="group border-b border-border"
                  >
                    <div
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      className="py-6 sm:py-7"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-8">
                        <span
                          className={`font-mono text-[11px] transition-colors ${
                            isOn ? "text-accent" : "text-muted-foreground"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3
                          className={`font-display text-[7.5vw] leading-[1] font-medium tracking-[-0.02em] transition-colors duration-300 sm:text-4xl lg:text-[3.25rem] ${
                            isOn ? "text-accent" : "text-foreground/80"
                          }`}
                        >
                          {s}
                        </h3>
                      </div>
                      <motion.p
                        initial={false}
                        animate={
                          reduce
                            ? { height: "auto", opacity: 1 }
                            : { height: isOn ? "auto" : 0, opacity: isOn ? 1 : 0 }
                        }
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden pl-8 sm:pl-16"
                      >
                        <span className="mt-3 block max-w-lg text-sm leading-relaxed text-muted-foreground">
                          {pillar.note}
                        </span>
                      </motion.p>
                      {/* Always readable on touch / reduced motion */}
                      <p className="mt-3 max-w-lg pl-8 text-sm leading-relaxed text-muted-foreground sm:hidden sm:pl-16">
                        {pillar.note}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
