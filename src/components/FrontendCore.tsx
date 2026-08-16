import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { InteractiveGrid } from "@/components/pixi/InteractiveGrid";
import { frontendCore } from "@/data/resume";

export function FrontendCore() {
  const [open, setOpen] = useState(frontendCore[0]!.id);

  return (
    <section id="frontend" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
        <InteractiveGrid className="absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Core expertise"
          title="Frontend Engineering."
          lead="The largest part of my work: building interfaces that are responsive, interactive and ready for real users — with every state accounted for."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* Accordion of capability groups */}
          <div className="border-t border-border">
            {frontendCore.map((g, i) => {
              const isOpen = open === g.id;
              return (
                <Reveal key={g.id} delay={i * 0.05}>
                  <div className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setOpen(g.id)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-baseline gap-5 py-6 text-left"
                    >
                      <span
                        className={`font-mono text-[11px] transition-colors ${
                          isOpen ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block font-display text-2xl font-medium transition-colors sm:text-3xl ${
                            isOpen ? "text-accent" : "text-foreground group-hover:text-accent/80"
                          }`}
                        >
                          {g.title}
                        </span>
                        <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                          {g.lead}
                        </span>
                      </span>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="grid gap-x-6 gap-y-2 pb-7 pl-9 sm:grid-cols-2">
                        {g.items.map((item) => (
                          <li
                            key={item}
                            className="group/i flex items-start gap-3 text-sm text-foreground/80"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent/60 transition-colors group-hover/i:bg-accent"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Live UI-state demo */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <UiStateDemo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const states = ["idle", "loading", "empty", "error", "success"] as const;
type UiState = (typeof states)[number];

const copy: Record<UiState, { title: string; body: string }> = {
  idle: { title: "Idle", body: "Nothing requested yet — the interface waits without looking broken." },
  loading: { title: "Loading", body: "Request in flight. Skeletons hold layout so nothing jumps." },
  empty: { title: "Empty", body: "Request succeeded with no data. The user is told what to do next." },
  error: { title: "Error", body: "Request failed. The reason is shown with a way to retry." },
  success: { title: "Success", body: "Data arrived and rendered into the real component." },
};

function UiStateDemo() {
  const [state, setState] = useState<UiState>("loading");

  return (
    <div className="noise relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-8">
      <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-baseline justify-between">
          <p className="label text-accent">UI states</p>
          <p className="font-mono text-[10px] text-muted-foreground">interactive</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {states.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setState(s)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors ${
                state === s
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-6 min-h-[10.5rem] rounded-lg border border-border bg-background/70 p-4">
          {state === "loading" ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-4 rounded bg-border"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.15 }}
                  style={{ width: `${90 - i * 18}%` }}
                />
              ))}
            </div>
          ) : state === "success" ? (
            <ul className="space-y-2">
              {["Session created", "Balance synced", "Assets loaded"].map((r, i) => (
                <motion.li
                  key={r}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between border-b border-border pb-2 text-sm text-foreground/85"
                >
                  {r}
                  <span className="font-mono text-[10px] text-accent">ok</span>
                </motion.li>
              ))}
            </ul>
          ) : state === "error" ? (
            <div className="flex h-full flex-col justify-center gap-3">
              <p className="font-mono text-[11px] tracking-[0.14em] text-destructive uppercase">
                request failed
              </p>
              <p className="text-sm text-foreground/80">
                The call did not complete. Retry, or check the service status.
              </p>
              <button
                type="button"
                onClick={() => setState("loading")}
                className="w-fit rounded-full border border-border-strong px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-foreground uppercase transition-colors hover:border-accent hover:text-accent"
              >
                Retry
              </button>
            </div>
          ) : state === "empty" ? (
            <div className="flex h-full flex-col items-start justify-center gap-2">
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                no results
              </p>
              <p className="text-sm text-foreground/80">
                Nothing here yet — the empty state explains the next action.
              </p>
            </div>
          ) : (
            <div className="flex h-full items-center">
              <p className="text-sm text-muted-foreground">
                Pick a state above to see how the same component behaves.
              </p>
            </div>
          )}
        </div>

        <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-foreground/85">
          <span className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
            {copy[state].title}
          </span>
          <span className="mt-2 block">{copy[state].body}</span>
        </p>
      </div>
    </div>
  );
}
