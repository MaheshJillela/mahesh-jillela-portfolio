import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Play, RotateCcw } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const mechanics = [
  {
    name: "Rendering",
    tech: ["PixiJS", "TexturePacker", "HTML5 Canvas"],
    title: "Loose assets → one atlas",
    action: "Pack the sprites",
    proof: "Game asset pipelines + Pixoma atlas inspection",
  },
  {
    name: "Animation",
    tech: ["Spine", "TypeScript", "Game state"],
    title: "Input → animation → result",
    action: "Trigger animation",
    proof: "Reel, bonus and character animation systems",
  },
  {
    name: "Interface",
    tech: ["React", "TypeScript", "Responsive UI"],
    title: "Same game. Different screen.",
    action: "Switch viewport",
    proof: "Portrait + landscape game layouts",
  },
];
const scatter = [
  [50, 60],
  [210, 40],
  [370, 85],
  [125, 175],
  [340, 200],
  [220, 270],
  [55, 290],
  [410, 300],
] as const;

export function SkillMechanics() {
  const [selected, setSelected] = useState(0);
  const [activated, setActivated] = useState(false);
  const [run, setRun] = useState(0);
  const reduce = useReducedMotion();
  const mechanic = mechanics[selected]!;
  return (
    <section id="frontend" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8">
      <p className="label text-accent">04 / Skills in motion</p>
      <h2 className="mt-4 font-editorial text-5xl leading-tight sm:text-7xl">
        See what the skill <em className="text-accent">does.</em>
      </h2>
      <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface/40">
        <div
          className="flex flex-wrap gap-2 border-b border-border p-4"
          role="group"
          aria-label="Skill mechanics"
        >
          {mechanics.map((item, i) => (
            <button
              type="button"
              key={item.name}
              aria-pressed={selected === i}
              onClick={() => {
                setSelected(i);
                setActivated(false);
              }}
              className={`min-h-11 rounded-full px-5 text-sm ${selected === i ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/10"}`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="relative min-h-80 border-b border-border p-5 lg:border-r lg:border-b-0">
            <div className="grid-fade absolute inset-0" aria-hidden="true" />
            {selected === 0 && (
              <svg
                viewBox="0 0 500 380"
                className="relative mx-auto max-h-96 w-full"
                role="img"
                aria-label={
                  activated
                    ? "Eight sprites organised into a texture atlas"
                    : "Eight individual sprites before atlas packing"
                }
              >
                <rect
                  x="100"
                  y="65"
                  width="300"
                  height="250"
                  rx="12"
                  stroke="var(--accent)"
                  strokeDasharray={activated ? "0" : "5 8"}
                  fill="var(--accent-soft)"
                  opacity={activated ? 1 : 0.25}
                />
                {scatter.map(([x, y], i) => (
                  <motion.g
                    key={i}
                    initial={false}
                    animate={{
                      x: activated ? 125 + (i % 4) * 72 : x,
                      y: activated ? 105 + Math.floor(i / 4) * 120 : y,
                      rotate: activated ? 0 : ((i % 3) - 1) * 15,
                    }}
                    transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : i * 0.035 }}
                  >
                    <rect
                      width="50"
                      height="65"
                      rx="5"
                      fill="var(--surface)"
                      stroke="var(--accent)"
                    />
                    <path
                      d={i % 2 ? "M25 10 L40 32 L25 54 L10 32 Z" : "M10 16 L40 16 L40 48 L10 48 Z"}
                      fill="var(--accent)"
                      opacity={0.35 + (i % 3) * 0.2}
                    />
                  </motion.g>
                ))}
              </svg>
            )}
            {selected === 1 && (
              <div className="relative mx-auto flex min-h-80 flex-col justify-center">
                <svg
                  viewBox="0 0 500 280"
                  className="w-full"
                  role="img"
                  aria-label={
                    activated
                      ? "Character animation triggered by game state"
                      : "Character waiting for an input"
                  }
                >
                  <line x1="60" x2="440" y1="235" y2="235" stroke="var(--border-strong)" />
                  <motion.g
                    key={run}
                    initial={false}
                    animate={{
                      x: activated ? (reduce ? 150 : [0, 60, 150]) : 0,
                      y: activated && !reduce ? [0, -50, 0] : 0,
                    }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  >
                    <path
                      d="M90 160 L65 220 M90 160 L115 220 M90 120 L55 155 M90 120 L125 100"
                      stroke="var(--accent)"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                    <rect x="72" y="107" width="36" height="62" rx="12" fill="var(--accent)" />
                    <circle cx="90" cy="80" r="22" fill="var(--accent)" />
                    <circle cx="98" cy="76" r="3" fill="var(--background)" />
                  </motion.g>
                  {[300, 355, 410].map((x) => (
                    <path
                      key={x}
                      d={`M${x} 155 l8 15 -8 15 -8 -15 Z`}
                      fill="var(--accent)"
                      opacity={activated ? 0.2 : 0.8}
                    />
                  ))}
                </svg>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
                  {["Idle", "Action", "Result"].map((label, i) => (
                    <span
                      key={label}
                      className={`rounded-lg border py-3 ${(activated && i === 2) || (!activated && i === 0) ? "border-accent text-accent" : "border-border text-muted-foreground"}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selected === 2 && (
              <div className="relative grid min-h-80 place-items-center">
                <motion.div
                  initial={false}
                  animate={{ width: activated ? 170 : "95%" }}
                  transition={{ duration: reduce ? 0 : 0.5 }}
                  className="rounded-2xl border-2 border-accent/50 bg-background p-4"
                >
                  <div className="mb-3 flex items-center justify-between text-[9px] text-muted-foreground">
                    <span>GAME UI</span>
                    <Layers className="size-3 text-accent" />
                  </div>
                  <div className="grid h-32 grid-cols-3 items-center gap-2 rounded-xl bg-accent/10 p-3">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="grid aspect-square place-items-center rounded border border-accent/40 text-xl text-accent"
                      >
                        ◇
                      </div>
                    ))}
                  </div>
                  <div className={`mt-3 flex gap-2 ${activated ? "flex-col" : "flex-row"}`}>
                    <div className="flex-1 rounded-lg border border-border p-3 text-center text-[10px]">
                      Controls
                    </div>
                    <div className="flex-1 rounded-lg bg-accent p-3 text-center text-[10px] text-accent-foreground">
                      Play
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="label text-accent">{mechanic.name}</p>
            <h3 className="mt-4 font-editorial text-3xl sm:text-4xl">{mechanic.title}</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {mechanic.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-2 font-mono text-[10px]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setActivated(!activated);
                setRun((value) => value + 1);
              }}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 self-start rounded-full bg-accent px-6 text-sm text-accent-foreground"
            >
              {activated ? <RotateCcw className="size-4" /> : <Play className="size-4" />}
              {activated ? "Reset mechanic" : mechanic.action}
            </button>
            <p role="status" className="mt-5 min-h-5 font-mono text-[11px] text-accent">
              {selected === 0
                ? activated
                  ? "ATLAS PACKED / SPRITES SHARE ONE TEXTURE"
                  : "INDIVIDUAL ASSETS / READY TO PACK"
                : selected === 1
                  ? activated
                    ? "INPUT RECEIVED → ANIMATION → RESULT"
                    : "IDLE / WAITING FOR INPUT"
                  : activated
                    ? "PORTRAIT / CONTROLS STACKED"
                    : "LANDSCAPE / CONTROLS INLINE"}
            </p>
            <div className="mt-6 border-t border-border pt-5">
              <p className="font-mono text-[9px] text-muted-foreground">WHERE I USE IT</p>
              <p className="mt-2 text-sm">{mechanic.proof}</p>
            </div>
            <a
              href="#experience"
              className="mt-6 inline-flex min-h-11 items-center gap-3 text-xs text-accent"
            >
              Explore the career curve <ArrowRight className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
