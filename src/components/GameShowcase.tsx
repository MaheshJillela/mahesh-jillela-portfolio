import { useRef, useState } from "react";
import { Graphics } from "pixi.js";
import { ArrowUpRight, Code2, Layers, Monitor, Rocket } from "lucide-react";
import { usePixiScene, prefersReducedMotion } from "@/lib/pixi";

const formats = [
  {
    name: "Slots",
    title: "Orchestrate the reveal.",
    note: "Reel motion → staggered stops → result presentation",
    skills: ["Masked reels", "Animation sequencing", "Game states"],
    detail:
      "A small rendering study: clipped symbols, independent reel timing and a clear transition back to idle.",
  },
  {
    name: "Crash",
    title: "Make every frame count.",
    note: "Round start → rising curve → round complete",
    skills: ["Delta-time animation", "Canvas paths", "Round lifecycle"],
    detail:
      "A predetermined curve demonstrates time-based rendering and round states. The value is illustrative, not a game outcome.",
  },
  {
    name: "Arcade",
    title: "Turn input into feedback.",
    note: "Pointer input → scene coordinates → visual response",
    skills: ["Hit testing", "Pointer events", "Immediate feedback"],
    detail:
      "Tap the illuminated targets to explore a lightweight input loop. Touch and mouse share the same interaction.",
  },
];

function GameCanvas({
  mode,
  playing,
  target,
  onComplete,
}: {
  mode: number;
  playing: boolean;
  target: number;
  onComplete: () => void;
}) {
  const state = useRef({ mode, playing, target, onComplete });
  state.current = { mode, playing, target, onComplete };
  const host = usePixiScene((app) => {
    const g = new Graphics();
    app.stage.addChild(g);
    let elapsed = 0;
    let previous = -1;
    let wasPlaying = false;
    let hit = -1;
    let previousTarget = -1;
    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;
    const tap = (event: { global: { x: number; y: number } }) => {
      if (state.current.mode !== 2) return;
      const w = app.screen.width;
      const h = app.screen.height;
      for (let i = 0; i < 6; i++) {
        const x = w * (0.24 + (i % 3) * 0.26);
        const y = h * (0.32 + Math.floor(i / 3) * 0.36);
        if (Math.hypot(event.global.x - x, event.global.y - y) < 30) hit = i;
      }
    };
    app.stage.on("pointerdown", tap);
    app.ticker.add((ticker) => {
      const s = state.current;
      if (previous !== s.mode || (s.playing && !wasPlaying)) {
        elapsed = 0;
        hit = -1;
      }
      if (s.target !== previousTarget) {
        hit = s.target;
        previousTarget = s.target;
      }
      previous = s.mode;
      wasPlaying = s.playing;
      if (s.playing) elapsed += ticker.deltaMS;
      const progress = prefersReducedMotion() ? 1 : Math.min(elapsed / 2400, 1);
      const w = app.screen.width;
      const h = app.screen.height;
      g.clear();
      for (let x = 20; x < w; x += 28)
        for (let y = 20; y < h; y += 28) g.circle(x, y, 1).fill({ color: 0x789d9a, alpha: 0.15 });
      if (s.mode === 0) {
        const cell = Math.min(w / 4.4, 85);
        const left = (w - cell * 3) / 2;
        for (let col = 0; col < 3; col++) {
          g.roundRect(left + col * cell + 3, h / 2 - cell * 1.3, cell - 6, cell * 2.6, 12).fill(
            0x132526,
          );
          const moving = s.playing && progress < 0.55 + col * 0.18;
          const offset = moving ? (elapsed * (0.35 + col * 0.07)) % cell : 0;
          for (let row = -2; row <= 2; row++) {
            const y = h / 2 + row * cell + offset;
            if (Math.abs(y - h / 2) > cell * 0.95) continue;
            const x = left + (col + 0.5) * cell;
            const radius = cell * 0.23;
            g.poly([x, y - radius, x + radius, y, x, y + radius, x - radius, y]).fill({
              color: row === 0 && !moving ? 0x5eead4 : 0x537778,
              alpha: 0.95,
            });
          }
        }
        g.roundRect(left - 5, h / 2 - cell * 0.46, cell * 3 + 10, cell * 0.92, 8).stroke({
          color: 0x5eead4,
          width: 1,
          alpha: 0.65,
        });
      } else if (s.mode === 1) {
        const p = elapsed > 0 ? progress : 0;
        g.moveTo(w * 0.12, h * 0.8)
          .lineTo(w * 0.9, h * 0.8)
          .stroke({ color: 0x537778, width: 1 });
        g.moveTo(w * 0.12, h * 0.8);
        for (let i = 0; i <= 60; i++) {
          const t = (i / 60) * p;
          g.lineTo(w * (0.12 + 0.75 * t), h * (0.8 - 0.63 * t * t));
        }
        g.stroke({ color: 0x5eead4, width: 3 });
        g.circle(w * (0.12 + 0.75 * p), h * (0.8 - 0.63 * p * p), 7).fill(0x5eead4);
      } else {
        for (let i = 0; i < 6; i++) {
          const x = w * (0.24 + (i % 3) * 0.26);
          const y = h * (0.32 + Math.floor(i / 3) * 0.36);
          g.circle(x, y, hit === i ? 29 : 24)
            .fill(hit === i ? 0x5eead4 : 0x183536)
            .stroke({ color: 0x5eead4, width: 1 });
          if (hit === i) g.circle(x, y, 8).fill(0x132526);
        }
      }
      if (s.playing && progress === 1) s.onComplete();
    });
    return () => {
      app.stage.off("pointerdown", tap);
    };
  });
  return <div ref={host} className="h-[280px] w-full sm:h-[340px]" aria-hidden="true" />;
}

function Heading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <p className="label mb-4 text-accent">{label}</p>
        <h2 className="max-w-3xl font-display text-4xl leading-tight tracking-tight sm:text-6xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

export function GameShowcase() {
  const [mode, setMode] = useState(0);
  const [target, setTarget] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState("Ready to explore");
  const [locale, setLocale] = useState("en");
  const [jurisdiction, setJurisdiction] = useState("A");
  const [sound, setSound] = useState(true);
  const [stage, setStage] = useState(0);
  const item = formats[mode]!;
  const copy =
    locale === "es"
      ? { play: "Jugar", balance: "Saldo", settings: "Ajustes" }
      : locale === "de"
        ? { play: "Spielen", balance: "Guthaben", settings: "Einstellungen" }
        : { play: "Play", balance: "Balance", settings: "Settings" };
  const stages = [
    {
      label: "Build",
      title: "From a blank canvas",
      body: "Game frontend implementation, reusable UI and animation behaviour.",
    },
    {
      label: "Staging",
      title: "Integration before release",
      body: "An environment for checking the integrated game and control panel.",
    },
    {
      label: "Certification",
      title: "Configuration under review",
      body: "Awareness of certification environments and jurisdiction-specific configurations.",
    },
    {
      label: "Production",
      title: "The player-facing experience",
      body: "Experience taking frontend game work through to production development.",
    },
  ];
  return (
    <>
      <section
        id="gaming"
        className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
      >
        <Heading label="01 / Interactive game craft" title="Less reading. More playing.">
          <p className="max-w-xs text-sm text-muted-foreground">
            Original technique studies, inspired by the kinds of games I build. No wagering or real
            money.
          </p>
        </Heading>
        <div className="overflow-hidden rounded-3xl border border-border bg-surface/50">
          <div
            className="flex flex-wrap gap-2 border-b border-border p-4"
            role="group"
            aria-label="Game format"
          >
            {formats.map((format, i) => (
              <button
                key={format.name}
                aria-pressed={mode === i}
                onClick={() => {
                  setMode(i);
                  setPlaying(false);
                  setStatus("Ready to explore");
                }}
                className={`rounded-full px-5 py-3 text-sm transition-colors ${mode === i ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/10"}`}
              >
                {format.name}
              </button>
            ))}
          </div>
          <div className="grid lg:grid-cols-[1.3fr_1fr]">
            <div className="relative border-b border-border lg:border-r lg:border-b-0">
              <div className="flex justify-between px-6 pt-5 font-mono text-[10px] tracking-wider text-muted-foreground">
                <span>PIXI.JS / LIVE CANVAS</span>
                <span>TECHNIQUE STUDY</span>
              </div>
              <GameCanvas
                target={target}
                mode={mode}
                playing={playing}
                onComplete={() => {
                  setPlaying(false);
                  setStatus("Sequence complete · ready to replay");
                }}
              />
              {mode === 2 && (
                <div
                  className="flex flex-wrap justify-center gap-2 px-6 pb-5"
                  role="group"
                  aria-label="Arcade targets"
                >
                  {Array.from({ length: 6 }, (_, i) => (
                    <button
                      key={i}
                      aria-pressed={target === i}
                      onClick={() => {
                        setTarget(i);
                        setStatus(`Target ${i + 1} activated`);
                      }}
                      className="rounded-lg border border-accent/40 px-3 py-2 text-xs text-accent"
                    >
                      Target {i + 1}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 px-6 pb-6">
                <p role="status" className="text-xs text-muted-foreground">
                  {mode === 2 && target < 0
                    ? "Tap a target or use the buttons below the canvas"
                    : status}
                </p>
                {mode !== 2 && (
                  <button
                    disabled={playing}
                    onClick={() => {
                      setPlaying(true);
                      setStatus("Sequence running…");
                    }}
                    className="rounded-full bg-accent px-6 py-3 text-sm text-accent-foreground disabled:opacity-50"
                  >
                    {playing ? "Running…" : "Run sequence ↗"}
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="label text-accent">{item.name} / frontend mechanics</p>
              <h3 className="mt-5 font-editorial text-4xl sm:text-5xl">{item.title}</h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border px-3 py-2 font-mono text-[10px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-accent">
                {item.note}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="control-panel"
        className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8"
      >
        <Heading label="02 / Production interface experience" title="One panel. Many contexts." />
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              I implemented a complete new control panel design across multiple jurisdictions and
              localizations.
            </p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Explore a simplified concept: the same interface adapts its language and available
              controls. Sample profiles illustrate configuration; they do not represent legal
              requirements.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="text-xs text-muted-foreground">
                Language
                <select
                  aria-label="Language"
                  value={locale}
                  onChange={(e) => setLocale(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-border bg-background p-3 text-foreground"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                </select>
              </label>
              <label className="text-xs text-muted-foreground">
                Sample jurisdiction profile
                <select
                  aria-label="Sample jurisdiction profile"
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-border bg-background p-3 text-foreground"
                >
                  <option value="A">Profile A · full controls</option>
                  <option value="B">Profile B · limited controls</option>
                </select>
              </label>
            </div>
          </div>
          <div className="rounded-3xl border border-accent/25 bg-surface p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <Layers className="size-5 text-accent" />
              <span className="label text-muted-foreground">CONTROL PANEL / CONCEPT</span>
            </div>
            <div lang={locale} className="py-8">
              <p className="text-xs text-muted-foreground">{copy.balance}</p>
              <p className="mt-2 font-mono text-3xl">
                1,000 <span className="text-sm text-muted-foreground">DEMO</span>
              </p>
              <div className="mt-8 grid grid-cols-[1fr_auto] gap-4">
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground">{copy.settings}</p>
                  <button
                    aria-pressed={sound}
                    onClick={() => setSound(!sound)}
                    className="mt-3 text-sm text-accent"
                  >
                    Audio {sound ? "ON" : "OFF"}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setStatus("Control panel preview selected · explore the game study above");
                    document.getElementById("gaming")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-accent px-8 text-accent-foreground"
                >
                  {copy.play} ↗
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-border pt-5 text-xs">
              <span className="rounded-lg bg-accent/10 px-3 py-2 text-accent">
                {locale.toUpperCase()} locale
              </span>
              <span className="rounded-lg bg-accent/10 px-3 py-2 text-accent">
                Profile {jurisdiction}
              </span>
              <span className="rounded-lg border border-border px-3 py-2">
                {jurisdiction === "A" ? "Extended controls available" : "Extended controls hidden"}
              </span>
            </div>
            {jurisdiction === "A" && (
              <div className="mt-4 rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground">
                Extended controls slot · enabled by this sample configuration
              </div>
            )}
          </div>
        </div>
      </section>
      <section id="production" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8">
        <Heading
          label="03 / From scratch to production"
          title="The canvas is only the beginning."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stages.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setStage(i)}
              aria-pressed={stage === i}
              className={`rounded-2xl border p-6 text-left transition-colors ${stage === i ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"}`}
            >
              <span className="font-mono text-xs text-accent">
                0{i + 1} {i < 3 ? "→" : "↗"}
              </span>
              <span className="mt-7 block text-lg">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 flex gap-5 rounded-2xl border border-border p-7" aria-live="polite">
          <Rocket className="mt-1 size-6 shrink-0 text-accent" />
          <div>
            <h3 className="text-xl">{stages[stage]!.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{stages[stage]!.body}</p>
          </div>
        </div>
      </section>
      <section id="frontend" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8">
        <Heading label="04 / Beyond games" title="Game craft. Frontend foundations." />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Code2,
              name: "TypeScript + JavaScript",
              note: "The logic behind interactions",
              diagram: "INPUT → STATE → FEEDBACK",
            },
            {
              icon: Layers,
              name: "React",
              note: "Reusable interfaces and components",
              diagram: "APP / COMPONENT / UI",
            },
            {
              icon: Monitor,
              name: "Responsive UI",
              note: "Interfaces across screen sizes",
              diagram: "DESKTOP ↔ TABLET ↔ MOBILE",
            },
          ].map(({ icon: Icon, name, note, diagram }) => (
            <div key={name} className="rounded-2xl border border-border p-7">
              <Icon className="size-7 text-accent" />
              <div className="my-10 border-y border-border py-6 font-mono text-[10px] tracking-wider text-accent">
                {diagram}
              </div>
              <h3 className="text-xl">{name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
        <a href="#contact" className="mt-8 inline-flex items-center gap-3 text-sm text-accent">
          Let’s build an interactive experience <ArrowUpRight className="size-4" />
        </a>
      </section>
    </>
  );
}
