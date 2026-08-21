import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, LineReveal } from "@/components/Reveal";
import {
  aboutPoints,
  fullFlow,
  frontendCore,
  luvis,
  luvisArchitecture,
  mindset,
  skillMatrix,
} from "@/data/resume";

const EASE = [0.22, 1, 0.36, 1] as const;

function Chapter({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
      <div className="flex items-center gap-5">
        <span className="font-mono text-[10px] text-accent">{index}</span>
        <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">{label}</span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

function AboutOrbit() {
  const [active, setActive] = useState(0);
  const item = aboutPoints[active];
  return (
    <section id="about" className="relative overflow-hidden py-28 sm:py-40">
      <Chapter index="01" label="Positioning">
        <div className="mt-14 grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="max-w-xl font-editorial text-5xl leading-[0.96] text-foreground sm:text-7xl">
              Frontend is the <em className="text-accent">centre.</em>
            </h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-10 border-l border-accent/50 pl-5"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">{item?.k}</p>
                <p className="mt-3 max-w-md text-base leading-relaxed text-foreground/80">{item?.v}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[600px]" aria-label="Interactive map of Mahesh's capabilities">
            <div className="absolute inset-[12%] rounded-full border border-border" />
            <div className="absolute inset-[28%] rounded-full border border-accent/25" />
            <div className="absolute inset-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-center font-mono text-[10px] tracking-[0.16em] text-accent-foreground uppercase shadow-[0_0_70px_color-mix(in_oklab,var(--accent)_18%,transparent)] sm:size-36">
              Frontend<br />developer
            </div>
            {aboutPoints.map((point, i) => {
              const angle = (i / aboutPoints.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(angle) * 43;
              const y = 50 + Math.sin(angle) * 43;
              return (
                <button
                  key={point.k}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border-b px-1 py-2 font-mono text-[9px] tracking-[0.1em] uppercase transition-colors sm:text-[11px] ${
                    active === i ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {point.k}
                </button>
              );
            })}
          </div>
        </div>
      </Chapter>
    </section>
  );
}

function CapabilityBands() {
  const [active, setActive] = useState(0);
  const capability = frontendCore[active];
  return (
    <section id="frontend" className="relative py-28 sm:py-40">
      <Chapter index="02" label="Frontend craft">
        <div className="mt-16 lg:grid lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-editorial text-5xl leading-none text-foreground sm:text-7xl">The interface<br /><em className="text-muted-foreground">is the product.</em></h2>
            <p className="mt-8 max-w-sm border-l border-accent/50 pl-5 text-sm leading-relaxed text-muted-foreground">
              Select a discipline to see the browser-side decisions behind it.
            </p>
          </div>
          <div className="mt-14 divide-y divide-border border-y border-border lg:mt-0">
            {frontendCore.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group w-full py-8 text-left sm:py-10"
                aria-pressed={active === i}
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-[10px] text-accent/70">0{i + 1}</span>
                  <span className={`font-editorial text-3xl transition-transform duration-500 sm:text-5xl ${active === i ? "translate-x-3 text-accent" : "text-foreground group-hover:translate-x-2"}`}>
                    {item.title}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground">{String(item.items.length).padStart(2, "0")}</span>
                </div>
                {active === i ? (
                  <motion.div layout className="mt-6 ml-10 flex flex-wrap gap-x-6 gap-y-3 sm:ml-16">
                    {capability?.items.map((skill) => (
                      <span key={skill} className="font-mono text-[10px] tracking-[0.08em] text-foreground/70 uppercase">{skill}</span>
                    ))}
                  </motion.div>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </Chapter>
    </section>
  );
}

function RequestRiver() {
  const reduce = useReducedMotion();
  return (
    <section id="systems" className="relative overflow-hidden py-28 sm:py-40">
      <Chapter index="03" label="Beyond the browser">
        <h2 className="mt-14 max-w-4xl font-editorial text-5xl leading-[0.96] text-foreground sm:text-7xl">
          One click becomes a <em className="text-accent">system journey.</em>
        </h2>
        <div id="flow" className="relative mt-20 overflow-x-auto pb-8">
          <div className="relative min-w-[980px] py-24">
            <svg viewBox="0 0 1000 220" className="absolute inset-x-0 top-7 h-56 w-full" aria-hidden="true">
              <path d="M25 120 C150 15 210 205 340 105 S540 20 650 120 S825 200 975 80" fill="none" stroke="color-mix(in oklab, var(--accent) 26%, transparent)" strokeWidth="1.5" />
              <motion.path
                d="M25 120 C150 15 210 205 340 105 S540 20 650 120 S825 200 975 80"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeDasharray="8 34"
                animate={reduce ? {} : { strokeDashoffset: [0, -84] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            <ol className="relative flex justify-between">
              {fullFlow.filter((_, i) => [0, 1, 2, 3, 5, 6, 8, 9, 11].includes(i)).map((item, i) => (
                <li key={item.step} className={`${i % 2 ? "mt-24" : ""} w-24 text-center`}>
                  <span className="mx-auto block size-3 rounded-full border border-accent bg-background shadow-[0_0_18px_var(--accent)]" />
                  <span className="mt-4 block font-mono text-[9px] leading-relaxed tracking-[0.08em] text-foreground uppercase">{item.step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div id="cloud" className="mt-8 flex items-center justify-end gap-4">
          <span className="h-px w-20 bg-accent/50" />
          <span className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">Interface → production → user</span>
        </div>
      </Chapter>
    </section>
  );
}

function LuvisWorld() {
  const [active, setActive] = useState("web");
  const nodes = luvisArchitecture.nodes.filter((node) => node.id !== "user");
  const nodes = luvisArchitecture.nodes.filter((node) => node.id !== "user");
  return (
    <section id="luvis" className="relative overflow-hidden py-28 sm:py-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_50%,var(--ember-soft),transparent_42%)]" />
      <Chapter index="04" label="Case study — the only project">
        <div className="mt-14 grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div className="relative z-10">
            <p className="font-mono text-[10px] tracking-[0.22em] text-ember uppercase">{luvis.subtitle}</p>
            <h2 className="mt-5 font-editorial text-[22vw] leading-[0.72] text-foreground sm:text-[9rem] lg:text-[10rem]">Luvis</h2>
            <p className="mt-10 max-w-sm border-l border-ember pl-5 text-base leading-relaxed text-foreground/80">{luvis.lead}</p>
            <a href={luvis.url} target="_blank" rel="noreferrer noopener" className="mt-8 inline-flex items-center gap-3 border-b border-ember pb-2 font-mono text-[10px] tracking-[0.16em] text-ember uppercase">
              Visit {luvis.urlLabel}<ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[680px]">
            <div className="absolute inset-[8%] rounded-full border border-border" />
            <div className="absolute inset-[25%] rounded-full border border-ember/30" />
            <div className="absolute inset-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ember text-center font-editorial text-2xl text-background sm:size-40 sm:text-3xl">Web<br />app</div>
            {nodes.map((node, i) => {
              const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(a) * 44;
              const y = 50 + Math.sin(a) * 44;
              const isActive = active === node.id;
              const onRight = x > 50;
              return (
                <div key={node.id} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                  <button type="button" onClick={() => setActive(node.id)} onMouseEnter={() => setActive(node.id)} onFocus={() => setActive(node.id)} className={`-translate-x-1/2 -translate-y-1/2 whitespace-nowrap border-b py-2 font-mono text-[8px] tracking-[0.08em] uppercase transition-colors sm:text-[10px] ${isActive ? "border-ember text-ember" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                    {node.label}
                  </button>
                  <AnimatePresence>
                    {isActive ? (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`pointer-events-none absolute top-3 z-20 w-40 border-l border-ember/60 bg-background/85 py-1 pl-3 sm:w-48 ${onRight ? "left-0" : "right-0 -translate-x-full border-l-0 border-r border-r-ember/60 pr-3 pl-0 text-right"}`}
                      >
                        <span className="font-editorial text-base text-foreground sm:text-lg">{node.label}</span>
                        <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">{node.body}</span>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}

          </div>
        </div>
      </Chapter>
    </section>
  );
}

function SkillTopography() {
  const allSkills = useMemo(() => skillMatrix.flatMap((layer) => layer.skills.map((skill) => ({ ...skill, layer: layer.layer }))), []);
  const [active, setActive] = useState(allSkills[0]?.name ?? "React");
  const selected = allSkills.find((skill) => skill.name === active) ?? allSkills[0];
  return (
    <section id="skills" className="relative py-28 sm:py-44">
      <Chapter index="05" label="Skill topography">
        <div className="mt-14 grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-editorial text-5xl leading-[0.96] text-foreground sm:text-7xl">Depth,<br /><em className="text-accent">not percentages.</em></h2>
            <div className="mt-10 border-l border-accent/50 pl-5">
              <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">{selected?.layer} / {selected?.depth}</p>
              <p className="mt-3 font-editorial text-3xl text-foreground">{selected?.name}</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{selected?.note}</p>
              <p className="mt-4 font-mono text-[9px] tracking-[0.14em] text-foreground/60 uppercase">Proof — {selected?.proof}</p>
            </div>
          </div>
          <div className="space-y-12">
            {skillMatrix.map((layer, layerIndex) => (
              <div key={layer.id} className="relative border-l border-border pl-7 sm:pl-10">
                <span className="absolute top-2 -left-1 size-2 rounded-full bg-accent" />
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">0{layerIndex + 1} / {layer.layer}</p>
                <div className="mt-6 flex flex-wrap gap-x-7 gap-y-5">
                  {layer.skills.map((skill) => (
                    <button key={skill.name} type="button" onClick={() => setActive(skill.name)} onMouseEnter={() => setActive(skill.name)} onFocus={() => setActive(skill.name)} className={`font-editorial text-2xl transition-colors sm:text-4xl ${active === skill.name ? "text-accent" : "text-foreground/45 hover:text-foreground"}`}>
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-28 flex flex-col items-center text-center">
          <span className="h-24 w-px bg-linear-to-b from-accent to-transparent" />
          <p className="mt-8 max-w-2xl font-editorial text-3xl italic leading-snug text-foreground/75 sm:text-4xl">“{mindset.statement}”</p>
        </div>
      </Chapter>
    </section>
  );
}

export function EditorialJourney() {
  return (
    <>
      <AboutOrbit />
      <CapabilityBands />
      <RequestRiver />
      <LuvisWorld />
      <SkillTopography />
    </>
  );
}