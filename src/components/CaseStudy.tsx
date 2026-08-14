import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import type { Project } from "@/data/resume";

const steps = ["Idea", "Architecture", "Development", "Testing", "Deployment"];

export function CaseStudy({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-background/80 p-0 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
        >
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 -z-10 cursor-default"
            onClick={onClose}
          />
          <motion.article
            initial={{ opacity: 0, y: 24, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-0 w-full max-w-4xl rounded-none border border-border/70 bg-card/95 sm:my-6 sm:rounded-3xl"
          >
            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-none border-b border-border/60 bg-card/90 px-6 py-5 backdrop-blur-xl sm:rounded-t-3xl sm:px-10">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                  {project.kind}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                  {project.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent/50 hover:text-accent"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="space-y-10 px-6 py-8 sm:px-10 sm:py-10">
              <Block title="Project overview">
                <p>{project.overview}</p>
              </Block>

              <Block title="Problem / purpose">
                <p>{project.purpose}</p>
              </Block>

              <Block title="My contribution">
                <ul className="space-y-3">
                  {project.contribution.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Technology">
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 font-mono text-[11px] text-foreground/85"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Architecture">
                <ol className="grid gap-2">
                  {project.architecture.map((layer, i) => (
                    <li key={layer} className="flex flex-col gap-2">
                      <span className="rounded-2xl border border-border/70 bg-secondary/30 px-4 py-3 font-mono text-xs tracking-[0.06em] text-foreground/90">
                        {layer}
                      </span>
                      {i < project.architecture.length - 1 ? (
                        <span aria-hidden="true" className="pl-4 text-accent/70">
                          ↓
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </Block>

              <Block title="Key features">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="rounded-2xl border border-border/60 bg-secondary/20 p-4 text-sm"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Development process">
                <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase">
                  {steps.map((s, i) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="rounded-full border border-border/70 px-3 py-1.5 text-foreground/85">
                        {s}
                      </span>
                      {i < steps.length - 1 ? (
                        <ArrowRight aria-hidden="true" className="size-3.5 text-accent/70" />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </Block>

              <Block title="Results / outcome">
                <p>{project.outcome}</p>
              </Block>

              <Block title="My role">
                <p>{project.role}</p>
              </Block>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
        {title}
      </h3>
      <div className="mt-4 text-sm leading-relaxed text-foreground/85">{children}</div>
    </section>
  );
}
