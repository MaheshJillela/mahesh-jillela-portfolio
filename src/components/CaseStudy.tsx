import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/data/resume";
import { StackFlow } from "@/components/visuals/StackFlow";
import { buildSteps } from "@/data/resume";

const EASE = [0.22, 1, 0.36, 1] as const;

function Block({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-border py-10 sm:grid-cols-[10rem_1fr] sm:gap-10">
      <div className="flex items-baseline gap-3 sm:flex-col sm:gap-2">
        <span className="font-mono text-[11px] text-accent">{index}</span>
        <h3 className="label text-muted-foreground">{title}</h3>
      </div>
      <div className="max-w-2xl">{children}</div>
    </section>
  );
}

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
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="case"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-background"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
        >
          <div className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
              <span className="label text-muted-foreground">Case study</span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 font-mono text-[11px] tracking-[0.16em] text-foreground uppercase transition-colors hover:border-accent hover:text-accent"
              >
                Close <X className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mx-auto w-full max-w-5xl px-5 pt-12 pb-24"
          >
            <p className="label text-accent">{project.kind}</p>
            <h2 className="mt-5 font-display text-[9vw] leading-[1.02] font-medium tracking-[-0.02em] text-foreground sm:text-5xl">
              {project.name}
            </h2>

            <div className="mt-12">
              <Block index="01" title="Project overview">
                <p className="text-base leading-relaxed text-foreground/85">{project.overview}</p>
              </Block>

              <Block index="02" title="The problem / purpose">
                <p className="text-base leading-relaxed text-foreground/85">{project.purpose}</p>
              </Block>

              <Block index="03" title="My contribution">
                <ul className="space-y-4">
                  {project.contribution.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                      <span className="text-sm leading-relaxed text-foreground/85">{c}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block index="04" title="Technology">
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-foreground/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block index="05" title="Key features">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="rounded-md border border-border bg-surface px-4 py-3 text-sm leading-snug text-foreground/85"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block index="06" title="Architecture">
                <div className="h-72 overflow-hidden rounded-lg border border-border">
                  <StackFlow layers={project.architecture} compact />
                </div>
              </Block>

              <Block index="07" title="Development process">
                <ol className="space-y-5">
                  {buildSteps.map((s) => (
                    <li key={s.id} className="flex gap-4">
                      <span className="font-mono text-[11px] text-accent">{s.id}</span>
                      <div>
                        <p className="font-display text-base text-foreground">{s.stage}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Block>

              <Block index="08" title="Outcome">
                <p className="text-base leading-relaxed text-foreground/85">{project.outcome}</p>
              </Block>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
