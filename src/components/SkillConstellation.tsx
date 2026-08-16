import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { constellation, skillNotes } from "@/data/resume";

type Node = { label: string; x: number; y: number; ring: 1 | 2 | 3 };

function build(): Node[] {
  const nodes: Node[] = [];
  constellation.ring1.forEach((label, i, arr) => {
    const a = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
    nodes.push({ label, x: 50 + Math.cos(a) * 0, y: 50 + Math.sin(a) * 0, ring: 1 });
  });
  constellation.ring2.forEach((label, i, arr) => {
    const a = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
    nodes.push({ label, x: 50 + Math.cos(a) * 26, y: 50 + Math.sin(a) * 26, ring: 2 });
  });
  constellation.ring3.forEach((label, i, arr) => {
    const a = (i / arr.length) * Math.PI * 2 - Math.PI / 2 + 0.28;
    nodes.push({ label, x: 50 + Math.cos(a) * 44, y: 50 + Math.sin(a) * 44, ring: 3 });
  });
  return nodes;
}

const nodes = build();

export function SkillConstellation() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("FRONTEND");
  const note = skillNotes[active];

  return (
    <section id="skills" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="08"
          eyebrow="Skills"
          title="A constellation, not a progress bar."
          lead="Frontend sits at the centre of everything. The outer ring is the production stack I work with around it."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <div className="noise relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface">
              <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />

              {/* rings */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                {[13, 26, 44].map((r) => (
                  <circle
                    key={r}
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke="color-mix(in oklab, var(--accent) 22%, transparent)"
                    strokeWidth="0.3"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {nodes.map((n) => (
                  <line
                    key={`l-${n.label}`}
                    x1="50"
                    y1="50"
                    x2={n.x}
                    y2={n.y}
                    stroke={active === n.label ? "var(--accent)" : "color-mix(in oklab, var(--accent) 16%, transparent)"}
                    strokeWidth={active === n.label ? "0.4" : "0.15"}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {nodes.map((n, i) => {
                const isActive = active === n.label;
                return (
                  <motion.button
                    key={n.label}
                    type="button"
                    data-cursor="VIEW"
                    onClick={() => setActive(n.label)}
                    onMouseEnter={() => setActive(n.label)}
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.035 }}
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border whitespace-nowrap transition-colors ${
                      n.ring === 1
                        ? "px-3 py-1.5 font-display text-[11px] tracking-[0.12em] sm:px-5 sm:py-2.5 sm:text-base"
                        : "px-2 py-1 font-mono text-[8px] tracking-[0.1em] sm:px-2.5 sm:text-[10px]"
                    } uppercase ${
                      isActive
                        ? "border-accent bg-accent text-accent-foreground"
                        : n.ring === 1
                          ? "border-accent/60 bg-accent/10 text-accent"
                          : "border-border bg-background text-foreground/75 hover:border-accent/50 hover:text-accent"
                    }`}
                  >
                    {n.label}
                  </motion.button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="label text-muted-foreground">Context</p>
              <p className="mt-4 font-display text-xl font-medium text-accent">{active}</p>
              <p aria-live="polite" className="mt-3 min-h-20 text-sm leading-relaxed text-foreground/85">
                {note ?? "Select a node to read how this is used in my work."}
              </p>
              <div className="mt-6 space-y-2 border-t border-border pt-4">
                {[
                  { k: "Core", v: constellation.ring1.join(", ") },
                  { k: "Ring 2", v: constellation.ring2.join(" · ") },
                  { k: "Ring 3", v: constellation.ring3.join(" · ") },
                ].map((r) => (
                  <p key={r.k} className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
                    <span className="text-accent">{r.k}</span> — {r.v}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
