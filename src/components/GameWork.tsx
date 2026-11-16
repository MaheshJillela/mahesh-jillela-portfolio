import { useState } from "react";
import { ArrowRight, Check, Gamepad2, Layers, Radio, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { gameWork, launchFlow, analyticsEvents } from "@/data/gameWork";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function GameWork() {
  const [family, setFamily] = useState("Slots");
  const [active, setActive] = useState<string>(gameWork[0].id);
  const games = gameWork.filter((game) => game.family === family);
  const game = gameWork.find((item) => item.id === active)!;
  return (
    <div className="mb-10 overflow-hidden rounded-3xl border border-border bg-surface/30">
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        {[
          ["5", "Slot clients"],
          ["9", "Crash / instant variants"],
          ["2", "Shared client projects"],
        ].map(([count, label]) => (
          <div key={label} className="p-4 sm:p-6">
            <span className="font-editorial text-4xl text-accent sm:text-5xl">{count}</span>
            <span className="mt-2 block text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-[1fr_1fr]">
        <div className="border-b border-border p-5 lg:border-r lg:border-b-0 sm:p-7">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Game project family">
            {["Slots", "Crash / instant"].map((label) => (
              <button
                type="button"
                key={label}
                aria-pressed={family === label}
                onClick={() => {
                  setFamily(label);
                  setActive(gameWork.find((item) => item.family === label)!.id);
                }}
                className={`min-h-11 rounded-full px-4 text-xs ${family === label ? "bg-accent text-accent-foreground" : "border border-border text-muted-foreground"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2" role="group" aria-label="Referenced games">
            {games.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setActive(item.id)}
                aria-pressed={active === item.id}
                className={`flex min-h-14 items-center gap-3 rounded-xl border p-3 text-left text-xs ${active === item.id ? "border-accent/50 bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                <Gamepad2 className="size-4 shrink-0" aria-hidden="true" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5 sm:p-7" aria-live="polite">
          <p className="label text-accent">Game → mechanic map</p>
          <h3 className="mt-4 font-editorial text-4xl">{game.name}</h3>
          <div className="mt-7 space-y-3">
            {game.mechanics.map((mechanic, i) => (
              <div key={mechanic} className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-accent/60">0{i + 1}</span>
                <span className="h-px w-6 bg-accent/30" />
                <span className="flex-1 rounded-lg border border-border bg-background/30 px-3 py-3 text-xs">
                  {mechanic}
                </span>
                <Check className="size-3 text-accent" aria-hidden="true" />
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            My work spans full feature implementations and contributions within shared game clients.
          </p>
          <details className="mt-3 text-[11px] text-muted-foreground">
            <summary className="min-h-11 cursor-pointer py-3">Project reference</summary>
            <p className="break-words font-mono">{game.source}</p>
            <p className="mt-3 leading-relaxed">
              Counts group route aliases and include game variants. Mechanics shown are represented
              in the referenced clients.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

export function ProductionWork() {
  const [step, setStep] = useState(0);
  const [failed, setFailed] = useState(false);
  const [event, setEvent] = useState<string>(analyticsEvents[0]);
  const [captured, setCaptured] = useState<string[]>([]);
  const reduce = useReducedMotion();
  return (
    <section id="launch-work" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8">
      <p className="label text-accent">Production ownership / Client side</p>
      <h2 className="mt-4 font-editorial text-5xl leading-tight sm:text-7xl">
        From partner lobby
        <br />
        <em className="text-accent">to a running game.</em>
      </h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {["Independent client-side launch work", "Session integration", "GA4 analytics"].map(
          (label) => (
            <span key={label} className="rounded-full border border-border px-4 py-2 text-xs">
              {label}
            </span>
          ),
        )}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-3xl border border-border bg-surface/40 p-5 sm:p-7">
          <p className="label text-accent">Launch simulator</p>
          <ol className="mt-7 space-y-3">
            {launchFlow.map((item, i) => (
              <li
                key={item.title}
                className={`flex items-center gap-4 rounded-xl border p-4 ${step === i ? "border-accent/50 bg-accent/10" : "border-border"}`}
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full border font-mono text-xs ${step >= i ? "border-accent text-accent" : "border-border text-muted-foreground"}`}
                >
                  {step > i ? <Check className="size-4" /> : i + 1}
                </span>
                <div>
                  <h3 className="text-sm">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.action}</p>
                </div>
                {step === i && (
                  <motion.span
                    layoutId="launch-position"
                    transition={{ duration: reduce ? 0 : 0.3 }}
                    className="ml-auto size-2 rounded-full bg-accent"
                  />
                )}
              </li>
            ))}
          </ol>
          <div
            role="status"
            className="mt-5 min-h-14 text-xs leading-relaxed text-muted-foreground"
          >
            {failed ? "Launch response rejected → error state → retry." : launchFlow[step]!.detail}
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                if (failed) setFailed(false);
                else setStep((value) => Math.min(value + 1, 3));
              }}
              disabled={step === 3 && !failed}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-xs text-accent-foreground disabled:opacity-50"
            >
              {failed ? "Retry launch" : step === 3 ? "Game ready" : "Advance launch"}
              <ArrowRight className="size-3" />
            </button>
            {step === 2 && !failed && (
              <button
                type="button"
                onClick={() => setFailed(true)}
                className="min-h-11 rounded-full border border-border px-4 text-xs"
              >
                Try failed response
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setStep(0);
                setFailed(false);
              }}
              aria-label="Reset launch simulator"
              className="grid size-11 place-items-center rounded-full border border-border"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border bg-surface/40 p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <p className="label text-accent">GA4 / event inspector</p>
            <Radio className="size-5 text-accent" aria-hidden="true" />
          </div>
          <div className="my-7 flex items-center justify-between gap-2 text-center text-xs">
            <span className="rounded-xl border border-border p-4">Player action</span>
            <ArrowRight className="size-4 text-accent" />
            <span className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-accent">
              Client event
            </span>
            <ArrowRight className="size-4 text-accent" />
            <span className="rounded-xl border border-border p-4">GA4</span>
          </div>
          <label htmlFor="analytics-event" className="text-xs text-muted-foreground">
            Event from the client catalog
          </label>
          <select
            id="analytics-event"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background p-3 font-mono text-xs"
          >
            {analyticsEvents.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setCaptured((previous) => [event, ...previous].slice(0, 4))}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/50 px-5 text-xs text-accent"
          >
            <Layers className="size-4" />
            Preview event
          </button>
          <div
            className="mt-5 min-h-36 rounded-xl border border-border bg-background/50 p-4"
            role="log"
            aria-label="Local analytics event preview"
          >
            {captured.length === 0 ? (
              <p className="font-mono text-[11px] text-muted-foreground">
                Awaiting a player action…
              </p>
            ) : (
              <ol className="space-y-3">
                {captured.map((name, i) => (
                  <li
                    key={`${i}-${name}`}
                    className="flex items-center justify-between gap-3 font-mono text-[11px]"
                  >
                    <span className="text-accent">{name}</span>
                    <span className="text-muted-foreground">previewed</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
            Local simulation using event names from the game clients.
          </p>
        </div>
      </div>
    </section>
  );
}
