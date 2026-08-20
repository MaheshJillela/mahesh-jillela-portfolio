import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { depthMeta, skillMatrix, type SkillDepth } from "@/data/resume";

type Skill = { name: string; depth: SkillDepth; note: string; proof: string };

export function SkillMatrix() {
  const [layerId, setLayerId] = useState(skillMatrix[0]!.id);
  const layer = skillMatrix.find((l) => l.id === layerId)!;
  const [active, setActive] = useState<Skill>(layer.skills[0]! as Skill);

  const selectLayer = (id: string) => {
    const next = skillMatrix.find((l) => l.id === id)!;
    setLayerId(id);
    setActive(next.skills[0]! as Skill);
  };

  return (
    <section id="skills-matrix" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="08"
          eyebrow="Skill showcase"
          title="Every skill, and where I used it."
          lead="Grouped by the layer of the application it belongs to — from the interface down to the server it runs on. Pick a layer, then a skill, to see how it shows up in real work."
        />

        {/* Layer selector */}
        <Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {skillMatrix.map((l) => {
              const isOn = l.id === layerId;
              return (
                <button
                  key={l.id}
                  type="button"
                  data-cursor="VIEW"
                  onClick={() => selectLayer(l.id)}
                  aria-pressed={isOn}
                  className={`group relative overflow-hidden p-5 text-left transition-colors sm:p-6 ${
                    isOn ? "bg-accent/10" : "bg-background hover:bg-surface"
                  }`}
                >
                  <span className="flex items-baseline justify-between">
                    <span
                      className={`font-mono text-[10px] tracking-[0.16em] ${isOn ? "text-accent" : "text-muted-foreground"}`}
                    >
                      {l.index}
                    </span>
                    <span
                      className={`font-mono text-[10px] ${isOn ? "text-accent" : "text-muted-foreground/60"}`}
                    >
                      {String(l.skills.length).padStart(2, "0")}
                    </span>
                  </span>
                  <span
                    className={`mt-4 block font-display text-lg font-medium transition-colors sm:text-xl ${
                      isOn ? "text-accent" : "text-foreground group-hover:text-accent/80"
                    }`}
                  >
                    {l.layer}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                    {l.lead}
                  </span>
                  {isOn && (
                    <motion.span
                      layoutId="layer-underline"
                      className="absolute inset-x-0 bottom-0 h-px bg-accent"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          {/* Skill rows */}
          <div className="overflow-hidden rounded-xl border border-border">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={layer.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-px bg-border"
              >
                {(layer.skills as Skill[]).map((s, i) => {
                  const isOn = active.name === s.name;
                  const meta = depthMeta[s.depth];
                  return (
                    <li key={s.name} className="bg-background">
                      <button
                        type="button"
                        data-cursor="VIEW"
                        onMouseEnter={() => setActive(s)}
                        onFocus={() => setActive(s)}
                        onClick={() => setActive(s)}
                        aria-pressed={isOn}
                        className={`flex w-full items-center gap-4 px-4 py-4 text-left transition-colors sm:px-6 ${
                          isOn ? "bg-accent/[0.07]" : "hover:bg-surface"
                        }`}
                      >
                        <span
                          className={`font-mono text-[10px] ${isOn ? "text-accent" : "text-muted-foreground/60"}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex-1 font-display text-base font-medium transition-colors sm:text-lg ${
                            isOn ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {s.name}
                        </span>
                        <span className="hidden font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase sm:inline">
                          {meta.label}
                        </span>
                        <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
                          {[0, 1, 2].map((d) => (
                            <span
                              key={d}
                              className={`size-1.5 rounded-full ${
                                d < meta.dots
                                  ? isOn
                                    ? "bg-accent"
                                    : "bg-accent/55"
                                  : "bg-border-strong"
                              }`}
                            />
                          ))}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            </AnimatePresence>
          </div>

          {/* Detail panel */}
          <Reveal delay={0.06} className="lg:sticky lg:top-28 lg:self-start">
            <div className="noise relative overflow-hidden rounded-xl border border-accent/35 bg-surface p-6 sm:p-8">
              <div className="grid-texture absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-baseline justify-between">
                  <p className="label text-accent">{layer.layer}</p>
                  <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {depthMeta[active.depth].label}
                  </p>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p className="mt-5 font-display text-2xl leading-tight font-medium text-foreground">
                      {active.name}
                    </p>
                    <p
                      aria-live="polite"
                      className="mt-3 min-h-20 text-sm leading-relaxed text-foreground/85"
                    >
                      {active.note}
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                        used in
                      </span>
                      <span className="h-px flex-1 bg-border" aria-hidden="true" />
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-accent uppercase">
                        {active.proof}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.1em] text-muted-foreground/70 uppercase">
                  {skillMatrix.reduce((n, l) => n + l.skills.length, 0)} skills · 04 layers · one
                  production application
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
