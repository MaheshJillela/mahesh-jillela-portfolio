import { useState } from "react";
import { RotateCw, Anchor, ChevronDown } from "lucide-react";
import { SlotMachine, type MachineEvent } from "@/components/pixi/SlotMachine";

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

export function SlotEngine() {
  const [selected, setSelected] = useState(0);
  const [request, setRequest] = useState(0);
  const [running, setRunning] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [event, setEvent] = useState<MachineEvent>({
    phase: "Ready to spin",
    remaining: null,
    complete: false,
  });
  const mechanic = mechanics[selected]!;
  const spin = () => {
    setConfirm(false);
    setRunning(true);
    setRequest((r) => r + 1);
  };
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="label text-accent">Production experience / playable reel system</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Core engine and feature development across Seariches, Eye of the Reels and Pirates
            Awakening.
          </p>
        </div>
        <span className="rounded-full border border-border px-3 py-2 font-mono text-[10px] text-muted-foreground">
          ORIGINAL PORTFOLIO DEMO
        </span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-[#b08c50]/40 bg-[#080e19] shadow-[0_24px_90px_#0008]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#b08c50]/25 bg-[#101722] px-5 py-4">
          <div className="flex items-center gap-3 text-[#e8c58a]">
            <Anchor className="size-5" />
            <span className="font-mono text-xs tracking-[.18em]">THE CAPTAIN’S VAULT</span>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-[#9aa8b9]">
            PIXI.JS / 5 REELS / FEATURE ENGINE
          </span>
        </div>
        <div className="grid lg:grid-cols-[1fr_240px]">
          <div className="relative isolate min-w-0 overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#29445b_0%,#111e30_40%,#070c17_80%)]">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
              viewBox="0 0 760 540"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <circle cx="610" cy="80" r="55" fill="#c9dfdf" />
              <path d="M0 435 Q100 410 220 442 T440 435 T760 440 V540 H0Z" fill="#456176" />
              <path
                d="M42 130 V430 M42 170 L155 305 H42Z M35 185 L-36 305 H35Z M0 402 L145 402 L111 440 H30Z"
                fill="#02050c"
              />
              <path
                d="M690 210 V420 M698 230 L790 335 H698Z M680 240 L620 335 H680Z M620 410 H760 L730 443 H650Z"
                fill="#02050c"
              />
            </svg>
            <div className="relative flex items-center justify-between gap-2 px-5 pt-5 text-[10px] tracking-wider text-[#cfb481]">
              <span>DEMONSTRATION MODE</span>
              <span>
                {event.remaining !== null
                  ? `${event.remaining} ${selected === 4 ? "RESPINS" : "FREE SPINS"} REMAINING`
                  : "NO REAL MONEY"}
              </span>
            </div>
            <SlotMachine
              feature={selected}
              request={request}
              onEvent={(next) => {
                setEvent(next);
                if (next.complete) setRunning(false);
              }}
            />
            <div className="relative border-t border-[#b08c50]/20 bg-[#090e19]/90 px-5 py-4">
              <p
                role="status"
                aria-live="polite"
                className="min-h-5 text-center font-mono text-xs text-[#f1d59d]"
              >
                {event.phase}
              </p>
            </div>
            {confirm && (
              <div
                className="absolute inset-0 z-10 grid place-items-center bg-[#050912]/85 p-6 backdrop-blur-sm"
                role="dialog"
                aria-modal="true"
                aria-label="Enter buy feature"
              >
                <div className="max-w-sm rounded-2xl border border-[#b08c50]/60 bg-[#101a29] p-7 text-center">
                  <Anchor className="mx-auto size-8 text-[#e8c58a]" />
                  <h4 className="mt-4 font-editorial text-3xl text-[#f1d59d]">
                    Enter the treasure feature?
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-[#aeb9c9]">
                    Preview the confirmation-to-feature transition. No purchase or balance deduction
                    takes place.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      autoFocus
                      onClick={spin}
                      className="rounded-full bg-[#e8c58a] px-5 py-3 text-sm text-[#16131a]"
                    >
                      Enter feature
                    </button>
                    <button
                      onClick={() => setConfirm(false)}
                      className="rounded-full border border-[#a38a5e] px-5 py-3 text-sm text-[#e8c58a]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col border-t border-[#b08c50]/20 bg-[#0c1421] p-5 lg:border-t-0 lg:border-l">
            <p className="font-mono text-[10px] tracking-[.18em] text-[#a38a5e]">SELECT A SYSTEM</p>
            <div
              role="group"
              aria-label="Slot engine systems"
              className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1"
            >
              {mechanics.map((item, i) => (
                <button
                  key={item.name}
                  disabled={running || confirm}
                  aria-pressed={i === selected}
                  onClick={() => {
                    setSelected(i);
                    setRunning(false);
                  }}
                  className={`rounded-lg border px-3 py-3 text-left text-xs transition-colors disabled:opacity-40 ${selected === i ? "border-[#b08c50]/70 bg-[#b08c50]/10 text-[#f1d59d]" : "border-[#ffffff0c] text-[#9aa8b9] hover:border-[#b08c50]/40 hover:text-[#f1d59d]"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="mt-6 border-t border-[#b08c50]/20 pt-5 lg:mt-auto">
              <p className="text-[10px] tracking-wider text-[#9aa8b9]">
                {mechanic.short.toUpperCase()}
              </p>
              <button
                disabled={running || confirm}
                onClick={() => (selected === 5 ? setConfirm(true) : spin())}
                className="mt-4 flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-[#f5dea0]/60 bg-gradient-to-b from-[#edcf8f] to-[#b68a43] text-sm font-semibold tracking-wider text-[#21180d] shadow-[0_4px_20px_#dcb66322] transition-transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-50"
              >
                <RotateCw className={`size-5 ${running ? "motion-safe:animate-spin" : ""}`} />
                {running ? "IN PLAY" : selected === 5 ? "BUY FEATURE DEMO" : "SPIN DEMO"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="label text-accent">Behind the feature</p>
          <h3 className="mt-3 font-editorial text-3xl">{mechanic.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {mechanic.description}
          </p>
        </div>
        <div className="self-center">
          <ol className="flex flex-wrap items-center gap-2">
            {mechanic.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-border bg-surface/40 px-3 py-2 text-xs text-foreground/80">
                  {step}
                </span>
                {i < mechanic.steps.length - 1 && (
                  <span aria-hidden="true" className="text-accent/60">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{mechanic.focus}</p>
        </div>
      </div>
      <details className="group rounded-xl border border-border p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm">
          Explore the engine architecture
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { name: "Game interface", body: "Player input · control state · feature entry" },
            {
              name: "Core slot engine",
              body: "Round lifecycle · reel controller · feature modules",
            },
            {
              name: "PixiJS presentation",
              body: "Masked reel strips · symbol textures · animation timelines",
            },
          ].map((item) => (
            <div key={item.name} className="rounded-lg border border-border p-4">
              <p className="text-sm text-accent">{item.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Input → round lifecycle → feature module → reel presentation → completion → ready
        </p>
      </details>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Original artwork and scripted demo outcomes. This portfolio sample demonstrates frontend
        mechanics; it does not reproduce the named games or implement wagering.
      </p>
    </div>
  );
}
