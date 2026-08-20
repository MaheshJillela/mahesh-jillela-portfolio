import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { ChipChain, FlowChain } from "@/components/visuals/FlowChain";
import { cloudPipeline, cloudSkills, serverManagement, serverPanels } from "@/data/resume";

function ServerUnit() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);
  const panel = serverPanels.find((p) => p.id === open) ?? null;

  return (
    <div className="noise relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-8">
      <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-baseline justify-between">
          <p className="label text-accent">Server</p>
          <p className="font-mono text-[10px] text-muted-foreground">click a bay</p>
        </div>

        {/* rack */}
        <div className="mt-6 space-y-2 rounded-lg border border-border-strong bg-background/70 p-3">
          {serverPanels.map((p, i) => {
            const isOpen = open === p.id;
            return (
              <button
                key={p.id}
                type="button"
                data-cursor="OPEN"
                onClick={() => setOpen(isOpen ? null : p.id)}
                aria-expanded={isOpen}
                className={`flex w-full items-center gap-3 rounded-md border px-3 py-3 text-left transition-colors ${
                  isOpen ? "border-accent bg-accent/10" : "border-border hover:border-border-strong"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${isOpen ? "bg-accent" : "bg-accent/40"}`}
                />
                <span
                  className={`flex-1 font-mono text-[10px] tracking-[0.16em] uppercase sm:text-[11px] ${
                    isOpen ? "text-accent" : "text-foreground/80"
                  }`}
                >
                  {p.label}
                </span>
                <span aria-hidden="true" className="flex gap-[3px]">
                  {[0, 1, 2, 3, 4].map((b) => (
                    <motion.span
                      key={b}
                      className="block h-3 w-[3px] rounded-full bg-accent/40"
                      animate={reduce ? { opacity: 0.6 } : { opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: (i + b) * 0.12 }}
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-5 min-h-[3.5rem] border-t border-border pt-4 text-sm leading-relaxed text-foreground/85">
          {panel ? (
            <>
              <span className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
                {panel.label}
              </span>
              <span className="mt-2 block">{panel.body}</span>
            </>
          ) : (
            "Open a bay to see what I actually check on a running server."
          )}
        </p>
      </div>
    </div>
  );
}

export function CloudProduction() {
  return (
    <section id="cloud" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Cloud · Server · Deployment"
          title="I can take it from code to production."
          lead="Building the interface is half the job."
          points={["Host", "Deploy", "Keep the process alive", "Debug in production"]}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <div className="rounded-xl border border-border bg-surface/60 p-6 sm:p-8">
              <p className="label text-accent">Deployment pipeline</p>
              <div className="mt-6">
                <FlowChain steps={cloudPipeline} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ServerUnit />
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <ul className="mt-10 flex flex-wrap gap-2">
            {cloudSkills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-foreground/75 uppercase transition-colors hover:border-accent/60 hover:text-accent"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Server management */}
        <div className="mt-24 border-t border-border pt-16 sm:mt-32">
          <Reveal>
            <h3 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
              Comfortable Beyond the Browser
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Practical Linux and process work: SSH into the box, read the logs, check the process,
              fix the configuration, put a new build in place safely. {serverManagement.note}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-12">
            <Reveal delay={0.04}>
              <p className="label text-muted-foreground">Linux &amp; environment</p>
              <ul className="mt-4 space-y-2.5">
                {serverManagement.linux.map((l) => (
                  <li key={l} className="flex items-center gap-3 border-b border-border pb-2.5 text-sm text-foreground/85">
                    <span aria-hidden="true" className="font-mono text-[10px] text-accent">$</span>
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="label text-muted-foreground">Process management</p>
              <div className="mt-4 rounded-xl border border-border bg-surface/60 p-5">
                <FlowChain steps={serverManagement.processChain} compact />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="label text-muted-foreground">What I can do on a live server</p>
              <ul className="mt-4 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
                {serverManagement.actions.map((a) => (
                  <li key={a} className="bg-background px-4 py-3 text-sm text-foreground/85">
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <div className="mt-10">
              <ChipChain steps={["Local", "Build", "Server", "Process", "Domain", "Users"]} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
