import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Gamepad2, Globe } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { gameProjects, luvis, pixoma, webProjects } from "@/data/resume";

const EASE = [0.22, 1, 0.36, 1] as const;

const caseRows = [
  { k: "Problem", v: pixoma.caseStudy.problem },
  { k: "Goal", v: pixoma.caseStudy.goal },
  { k: "Architecture", v: pixoma.caseStudy.architecture },
  { k: "Challenges", v: pixoma.caseStudy.challenges },
  { k: "My role", v: pixoma.caseStudy.role },
  { k: "Results", v: pixoma.caseStudy.results },
  { k: "Learnings", v: pixoma.caseStudy.learnings },
];

function PixomaDashboard() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const panel = pixoma.panels[active];

  return (
    <div className="noise relative overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2 rounded-full bg-accent/70" />
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="ml-3 truncate font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          {pixoma.urlLabel}
        </span>
      </div>

      <div className="grid sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <ul className="max-h-[320px] overflow-y-auto border-b border-border sm:max-h-none sm:border-r sm:border-b-0">
          {pixoma.panels.map((p, i) => (
            <li key={p.label}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`flex w-full items-center gap-3 border-b border-border/60 px-4 py-3 text-left transition-colors ${
                  active === i ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-mono text-[9px] opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase">{p.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="relative min-h-[280px] p-5">
          <div className="grid-texture absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative flex h-full flex-col">
            <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">Preview</p>

            <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border border-border bg-background/70">
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={i} className="border-r border-b border-border/40" />
                ))}
              </div>
              {!reduce ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 w-px bg-accent/70"
                  animate={{ left: ["6%", "94%", "6%"] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="absolute inset-x-4 bottom-4"
                >
                  <p className="font-editorial text-2xl leading-tight text-foreground sm:text-3xl">
                    {panel?.label}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {panel?.note}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {pixoma.caseStudy.technologies.map((t) => (
                <li
                  key={t}
                  className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryHeading({ icon, label }: { icon: "game" | "web"; label: string }) {
  const Icon = icon === "game" ? Gamepad2 : Globe;
  return (
    <div className="flex items-center gap-4">
      <span className="inline-flex size-9 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="font-mono text-[10px] tracking-[0.22em] text-foreground uppercase">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}

function MiniCard({
  title,
  note,
  tech,
  index,
}: {
  title: string;
  note: string;
  tech: string[];
  index: number;
}) {
  return (
    <Reveal as="li" delay={index * 0.04} className="group bg-background p-6">
      <p className="font-mono text-[9px] text-accent">{String(index + 1).padStart(2, "0")}</p>
      <p className="mt-4 font-display text-lg leading-snug text-foreground">{title}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
        {note}
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
        {tech.map((t) => (
          <li key={t} className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
            {t}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function Projects() {
  const [openCase, setOpenCase] = useState(false);

  return (
    <section id="projects" className="relative overflow-hidden py-28 sm:py-40">
      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="flex items-center gap-5">
          <span className="font-mono text-[10px] text-accent">06</span>
          <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
            Projects
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <h2 className="mt-14 max-w-4xl font-editorial text-5xl leading-[0.94] text-foreground sm:text-7xl">
          Games first, <em className="text-accent">then everything else.</em>
        </h2>

        {/* ---------- Game development ---------- */}
        <div className="mt-20">
          <CategoryHeading icon="game" label="Game development" />

          <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {gameProjects.map((p, i) => (
              <MiniCard key={p.title} title={p.title} note={p.note} tech={p.tech} index={i} />
            ))}
          </ul>

          {/* Pixoma — flagship */}
          <div id="pixoma" className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
                Flagship · {pixoma.subtitle}
              </p>
              <h3 className="mt-5 font-editorial text-6xl leading-[0.86] text-foreground sm:text-8xl">
                {pixoma.name}
              </h3>
              <p className="mt-8 max-w-md border-l border-accent pl-5 text-base leading-relaxed text-foreground/85">
                {pixoma.lead}
              </p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                {pixoma.body}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={pixoma.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="OPEN"
                  className="group inline-flex items-center gap-3 border-b border-accent pb-2 font-mono text-[10px] tracking-[0.16em] text-accent uppercase"
                >
                  Visit {pixoma.urlLabel}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setOpenCase((v) => !v)}
                  aria-expanded={openCase}
                  className="inline-flex min-h-11 items-center gap-3 rounded-full border border-border-strong px-5 font-mono text-[10px] tracking-[0.16em] text-foreground uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  {openCase ? "Hide case study" : "Read case study"}
                </button>
              </div>
            </div>

            <Reveal delay={0.06}>
              <PixomaDashboard />
            </Reveal>
          </div>

          <AnimatePresence initial={false}>
            {openCase ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
                  {caseRows.map((row, i) => (
                    <div key={row.k} className="bg-background p-6">
                      <dt className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                        {String(i + 1).padStart(2, "0")} / {row.k}
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Luvis pointer */}
          <div className="mt-14 grid gap-6 rounded-xl border border-border bg-surface p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                {luvis.subtitle}
              </p>
              <p className="mt-3 font-editorial text-3xl text-foreground sm:text-4xl">{luvis.name}</p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Game and application interfaces on a live gaming platform — full case study below.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#luvis"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/50 px-5 font-mono text-[10px] tracking-[0.16em] text-accent uppercase transition-colors hover:bg-accent/10"
              >
                Case study
              </a>
              <a
                href={luvis.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-5 font-mono text-[10px] tracking-[0.16em] text-foreground uppercase transition-colors hover:border-accent hover:text-accent"
              >
                {luvis.urlLabel}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* ---------- Web applications ---------- */}
        <div className="mt-24">
          <CategoryHeading icon="web" label="Web applications" />
          <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {webProjects.map((p, i) => (
              <MiniCard key={p.title} title={p.title} note={p.note} tech={p.tech} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
