import { useEffect, useRef, useState } from "react";
import { Graphics } from "pixi.js";
import { usePixiScene, prefersReducedMotion } from "@/lib/pixi";
import { useReducedMotion } from "@/lib/useReducedMotion";

const mechanics = [
  {
    name: "Core slot engine",
    short: "Round lifecycle",
    description:
      "Core-level and full slot-engine experience: coordinating reel behaviour, round states, feature transitions and the return to base play.",
    steps: ["Ready", "Spin", "Reel stops", "Present result", "Round complete"],
    focus: "A shared round lifecycle connects the game UI, reel system and feature modules.",
  },
  {
    name: "Reel expansion",
    short: "Dynamic reel layout",
    description:
      "Experience implementing reel expansion: moving from the base reel layout into an expanded play area and back.",
    steps: [
      "Base layout",
      "Spin",
      "Expansion trigger",
      "Expand reels",
      "Present result",
      "Restore layout",
    ],
    focus:
      "The reel geometry changes while symbols, presentation and control state remain coordinated.",
  },
  {
    name: "Lock & respins",
    short: "Persistent symbol state",
    description:
      "Experience with lock and respin mechanics: retain selected symbols while the remaining positions participate in the next spin.",
    steps: [
      "Base spin",
      "Reel stops",
      "Lock symbols",
      "Respin unlocked",
      "Present result",
      "Release locks",
    ],
    focus:
      "Locked positions persist across the respin; the rest of the reel system continues independently.",
  },
  {
    name: "Free spins",
    short: "Feature round lifecycle",
    description:
      "Experience developing free-spin features, including entry, the feature round loop and the transition back to the base game.",
    steps: [
      "Base game",
      "Feature trigger",
      "Enter free spins",
      "Feature spin",
      "Collect result",
      "Return to base",
    ],
    focus:
      "A feature owns its round state and hands control back to the base engine when its sequence ends.",
  },
  {
    name: "HNS · Hold & Spin",
    short: "Hold, respin, collect",
    description:
      "Experience with HNS features: held symbols, subsequent spins and a dedicated collection presentation.",
    steps: [
      "Feature trigger",
      "Hold symbols",
      "Respin",
      "Hold new symbols",
      "Collect",
      "Return to base",
    ],
    focus: "Held positions are tracked separately from moving symbols throughout the feature loop.",
  },
  {
    name: "Buy feature",
    short: "Alternative feature entry",
    description:
      "Experience implementing buy-feature flows, connecting a separate entry path to the feature lifecycle.",
    steps: [
      "Feature selection",
      "Confirm entry",
      "Enter feature",
      "Feature spin",
      "Collect result",
      "Return to base",
    ],
    focus:
      "A separate entry path joins the same feature system instead of duplicating its round lifecycle.",
  },
];

function ReelSimulation({ mechanic, step }: { mechanic: number; step: number }) {
  const state = useRef({ mechanic, step });
  state.current = { mechanic, step };
  const host = usePixiScene((app) => {
    const g = new Graphics();
    app.stage.addChild(g);
    let time = 0;
    app.ticker.add((ticker) => {
      time += ticker.deltaMS;
      const { mechanic: m, step: s } = state.current;
      const w = app.screen.width;
      const h = app.screen.height;
      const expanded = m === 1 && s >= 3 && s < 5;
      const rows = expanded ? 5 : 3;
      const cell = Math.min((w - 36) / 5, (h - 40) / 5, 58);
      const left = (w - cell * 5) / 2;
      const top = (h - cell * rows) / 2;
      const locked = (m === 2 && s >= 2 && s < 5) || (m === 4 && s >= 1 && s < 5);
      const spinning =
        (m <= 2 && s === 1) || (m === 2 && s === 3) || (m >= 3 && s === 3) || (m === 4 && s === 2);
      g.clear();
      for (let col = 0; col < 5; col++) {
        g.roundRect(left + col * cell + 2, top - 4, cell - 4, rows * cell + 8, 8).fill(0x132526);
        for (let row = -1; row <= rows; row++) {
          const held =
            locked &&
            ((col === 0 && row === 1) ||
              (col === 3 && row === 0) ||
              (m === 4 && s >= 3 && col === 2 && row === 2));
          const offset =
            spinning && !held && !prefersReducedMotion() ? (time * (0.15 + col * 0.025)) % cell : 0;
          const y = top + (row + 0.5) * cell + offset;
          if (y < top + 8 || y > top + rows * cell - 8) continue;
          const x = left + (col + 0.5) * cell;
          const r = cell * 0.21;
          const color = held ? 0xffcb77 : (row + col) % 3 === 0 ? 0x5eead4 : 0x678c91;
          if ((row + col) % 2 === 0) g.poly([x, y - r, x + r, y, x, y + r, x - r, y]).fill(color);
          else g.circle(x, y, r * 0.85).fill(color);
          if (held)
            g.roundRect(x - cell * 0.4, y - cell * 0.4, cell * 0.8, cell * 0.8, 5).stroke({
              color: 0xffcb77,
              width: 2,
            });
        }
      }
      g.roundRect(left - 3, top - 7, cell * 5 + 6, rows * cell + 14, 10).stroke({
        color: expanded ? 0xffcb77 : 0x5eead4,
        alpha: 0.6,
        width: 1,
      });
    });
  });
  return <div ref={host} aria-hidden="true" className="h-[330px] w-full" />;
}

export function SlotEngine() {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const reduce = useReducedMotion();
  const mechanic = mechanics[selected]!;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => {
        if (step >= mechanic.steps.length - 1) setRunning(false);
        else setStep(step + 1);
      },
      reduce ? 120 : 1100,
    );
    return () => window.clearTimeout(timer);
  }, [running, step, mechanic, reduce]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 border-b border-border pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="label text-accent">Production slot-game experience</p>
          <h3 className="mt-4 font-editorial text-3xl sm:text-4xl">
            From individual mechanics
            <br />
            to the complete slot engine.
          </h3>
        </div>
        <div className="flex gap-7">
          <div>
            <strong className="font-mono text-4xl text-accent">05</strong>
            <p className="mt-2 text-xs text-muted-foreground">Feature systems</p>
          </div>
          <div>
            <strong className="font-mono text-4xl text-accent">03</strong>
            <p className="mt-2 text-xs text-muted-foreground">Real game titles</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Games I have worked on">
        {["Seariches", "Eye of the Reels", "Pirates Awakening"].map((name) => (
          <span
            key={name}
            className="rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm"
          >
            {name}
          </span>
        ))}
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        My work spans core slot development, full slot-engine implementation and feature mechanics
        in real production games. Select a system to trace its flow and inspect an illustrative
        simulation.
      </p>
      <div
        className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
        role="group"
        aria-label="Slot engine systems"
      >
        {mechanics.map((item, i) => (
          <button
            key={item.name}
            aria-pressed={selected === i}
            onClick={() => {
              setSelected(i);
              setStep(0);
              setRunning(false);
            }}
            className={`rounded-xl border p-5 text-left transition-colors ${selected === i ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"}`}
          >
            <span className="font-mono text-[10px] text-accent">
              {i === 0 ? "ENGINE" : `FEATURE / 0${i}`}
            </span>
            <span className="mt-3 block text-base">{item.name}</span>
            <span className="mt-1 block text-xs text-muted-foreground">{item.short}</span>
          </button>
        ))}
      </div>
      <div className="grid overflow-hidden rounded-2xl border border-border lg:grid-cols-[1.1fr_1fr]">
        <div className="bg-surface/50 p-5 sm:p-7">
          <div className="flex flex-wrap justify-between gap-2 font-mono text-[10px] text-muted-foreground">
            <span>PIXI.JS / {mechanic.name.toUpperCase()}</span>
            <span>ILLUSTRATIVE SEQUENCE</span>
          </div>
          <ReelSimulation mechanic={selected} step={step} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p role="status" className="text-sm text-accent">
              {step + 1} / {mechanic.steps.length} · {mechanic.steps[step]}
              {!running && step === mechanic.steps.length - 1 ? " · Complete" : ""}
            </p>
            <button
              disabled={running}
              onClick={() => {
                setStep(0);
                setRunning(true);
              }}
              className="rounded-full bg-accent px-5 py-3 text-sm text-accent-foreground disabled:opacity-50"
            >
              {running ? "Running…" : "Run mechanic ↗"}
            </button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Original portfolio visualization. These sequences illustrate state transitions, not the
            artwork, rules or outcomes of any named game.
          </p>
        </div>
        <div className="border-t border-border p-6 lg:border-t-0 lg:border-l sm:p-8">
          <p className="label text-accent">Mechanic flow / select a state</p>
          <h4 className="mt-4 font-editorial text-3xl">{mechanic.name}</h4>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {mechanic.description}
          </p>
          <ol className="mt-6">
            {mechanic.steps.map((label, i) => (
              <li key={label} className="relative pb-4 pl-8 last:pb-0">
                {i < mechanic.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`absolute top-6 bottom-0 left-[10px] border-l ${i < step ? "border-accent" : "border-border"}`}
                  />
                )}
                <button
                  aria-current={step === i ? "step" : undefined}
                  onClick={() => {
                    setRunning(false);
                    setStep(i);
                  }}
                  className={`flex min-h-8 items-center text-left text-sm ${step === i ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 grid size-[22px] place-items-center rounded-full border font-mono text-[9px] ${step === i ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background"}`}
                  >
                    {i + 1}
                  </span>
                  {label}
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
            {mechanic.focus}
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-border p-6 sm:p-8">
        <p className="label text-accent">How the layers connect</p>
        <h4 className="mt-3 text-xl">Shared engine. Feature-specific behaviour.</h4>
        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="rounded-xl border border-border p-5">
            <p className="text-sm">Game interface</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Controls · player input · game state
            </p>
          </div>
          <span aria-hidden="true" className="self-center text-center text-accent">
            →
          </span>
          <div className="rounded-xl border border-accent/50 bg-accent/5 p-5">
            <p className="text-sm text-accent">Core slot engine</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Round lifecycle · reels · feature transitions
            </p>
          </div>
          <span aria-hidden="true" className="self-center text-center text-accent">
            →
          </span>
          <div className="rounded-xl border border-border p-5">
            <p className="text-sm">PixiJS presentation</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Symbols · animation · result display
            </p>
          </div>
        </div>
        <div className="mt-4 border-l border-accent/40 pl-5">
          <p className="text-xs text-muted-foreground">
            ↳ Feature modules attach to the round lifecycle
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {mechanics.slice(1).map((item) => (
              <span
                key={item.name}
                className="rounded-lg bg-accent/10 px-3 py-2 text-xs text-accent"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
