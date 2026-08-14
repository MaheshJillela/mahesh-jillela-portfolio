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
          <h3 className="mt-5 font-display text-[8vw] leading-[1.02] font-medium tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
            {project.name}
          </h3>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {project.blurb}
          </p>

          <div className="mt-7 border-t border-border pt-5">
            <p className="label text-muted-foreground">My contribution</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/85">
              {project.role}
            </p>
          </div>

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

          <button
            type="button"
            data-cursor="VIEW"
            onClick={() => onOpen(project.id)}
            className="group mt-8 inline-flex min-h-11 items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-accent uppercase"
          >
            View case study
            <span className="h-px w-10 bg-accent transition-all duration-300 group-hover:w-16" />
          </button>
        </div>
      </div>
    </Reveal>
  );
}
