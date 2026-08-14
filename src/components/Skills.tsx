import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { skillNotes, skills } from "@/data/resume";

const levelWidth: Record<string, string> = {
  "Production Experience": "100%",
  Advanced: "78%",
  "Working Knowledge": "52%",
};

function LevelMeter({ level }: { level: string }) {
  const reduce = useReducedMotion();
  const w = levelWidth[level] ?? "70%";
  return (
    <div className="mt-3 h-[3px] w-full max-w-[9rem] overflow-hidden rounded-full bg-border">
      <motion.span
        className="block h-full rounded-full bg-accent"
        initial={reduce ? { width: w } : { width: 0 }}
        whileInView={{ width: w }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const note = active ? skillNotes[active] : null;

  return (
    <section id="skills" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Skills"
          title="Tools, grouped by what they actually do."
          lead="No percentages. Hover or focus a technology to see how it has been used."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
          <div className="space-y-10">
            {skills.map((group, gi) => (
              <Reveal key={group.group} delay={gi * 0.04}>
                <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <div>
                    <h3 className="label text-accent">{group.group}</h3>
                    <p className="mt-2 font-mono text-[10px] text-muted-foreground">{group.level}</p>
                  </div>
                  <ul className="flex flex-wrap gap-x-6 gap-y-3">
                    {group.items.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(item)}
                          onMouseLeave={() => setActive(null)}
                          onFocus={() => setActive(item)}
                          onBlur={() => setActive(null)}
                          aria-describedby="skill-note"
                          className={`text-left text-base transition-colors duration-200 sm:text-lg ${
                            active === item
                              ? "text-accent"
                              : "text-foreground/75 hover:text-foreground"
                          }`}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Contextual note panel — sticky, mono, system-style */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="label text-muted-foreground">Context</p>
              <p
                id="skill-note"
                aria-live="polite"
                className="mt-4 min-h-24 text-sm leading-relaxed text-foreground/85"
              >
                {note ?? "Select a technology to read where it has been used in production or project work."}
              </p>
              <p className="mt-6 border-t border-border pt-4 font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
                {active ?? "— idle"}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
