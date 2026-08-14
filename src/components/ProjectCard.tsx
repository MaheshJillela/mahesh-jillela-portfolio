import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/resume";
import { Reveal } from "@/components/Reveal";

/**
 * Editorial project presentation: full-width row with a live canvas-style
 * visual, cursor parallax, 3D tilt and hover technology reveal.
 * All content stays visible without hover for touch and reduced motion.
 */
export function ProjectCard({
  project,
  index,
  onOpen,
  visual,
}: {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
  visual: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, px: 0, py: 0 });
  const [hover, setHover] = useState(false);
  const flip = index % 2 === 1;

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -y * 5, ry: x * 7, px: x * 22, py: y * 16 });
  };
  const reset = () => setT({ rx: 0, ry: 0, px: 0, py: 0 });

  return (
    <Reveal as="article" className="relative">
      <div
        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Visual */}
        <div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={() => {
            reset();
            setHover(false);
          }}
          onPointerEnter={() => setHover(true)}
          className="relative"
          style={{ perspective: "1100px" }}
        >
          <button
            type="button"
            data-cursor="VIEW"
            onClick={() => onOpen(project.id)}
            aria-label={`Open case study: ${project.name}`}
            className="block w-full text-left"
          >
            <motion.div
              animate={{ rotateX: t.rx, rotateY: t.ry }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-border bg-surface"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0" style={{ transform: `translate3d(${t.px * -0.4}px, ${t.py * -0.4}px, 0) scale(1.08)` }}>
                {visual}
              </div>

              {/* hover lighting */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 transition-opacity duration-500"
                style={{
                  opacity: hover ? 1 : 0,
                  background: `radial-gradient(40% 40% at ${50 + t.px}% ${50 + t.py}%, oklch(0.855 0.148 178 / 0.14), transparent 70%)`,
                }}
              />

              <motion.span
                animate={{ opacity: hover && !reduce ? 1 : 0, y: hover && !reduce ? 0 : 8 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-[11px] tracking-[0.16em] text-accent-foreground uppercase"
              >
                View case study <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </motion.span>
            </motion.div>
          </button>
        </div>

        {/* Copy */}
        <div className={flip ? "lg:pr-6" : "lg:pl-6"}>
          <p className="label flex items-center gap-3 text-accent">
            <span className="text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
            {project.kind}
          </p>

          <h3 className="mt-5 font-display text-[9vw] leading-[1.02] font-medium tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
            {project.name}
          </h3>

          <p className="mt-4 font-display text-xl leading-snug text-foreground/90 sm:text-2xl">
            {project.tagline}
          </p>

          {/* Visual fact tiles — scannable instead of a paragraph */}
          <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {project.highlights.map((h, i) => (
              <motion.div
                key={h.k}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group/tile relative bg-surface p-4 transition-colors hover:bg-accent/5"
              >
                <dt className="label text-muted-foreground">{h.k}</dt>
                <dd className="mt-2 font-display text-sm leading-tight text-foreground sm:text-base">
                  {h.v}
                </dd>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover/tile:w-full"
                />
              </motion.div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <motion.li
                key={tech}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-foreground/75"
              >
                {tech}
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.url ? (
              <a
                data-cursor="OPEN"
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 font-mono text-[11px] tracking-[0.16em] text-accent-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
              >
                Visit {project.urlLabel}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : null}
            <button
              type="button"
              data-cursor="VIEW"
              onClick={() => onOpen(project.id)}
              className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-border px-5 font-mono text-[11px] tracking-[0.18em] text-foreground uppercase transition-colors hover:border-accent hover:text-accent"
            >
              Case study
              <span className="h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
