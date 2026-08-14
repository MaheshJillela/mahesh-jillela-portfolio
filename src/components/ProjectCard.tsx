import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/resume";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
};

export function ProjectCard({ project, index, onOpen }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 8, ry: (px - 0.5) * 10 });
    setGlow({ x: px * 100, y: py * 100 });
  };

  const reset = () => {
    setTilt({ rx: 0, ry: 0 });
    setHover(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={reset}
      style={{ perspective: 1200 }}
    >
      <article
        data-cursor="VIEW"
        className="group relative h-full [transform-style:preserve-3d] transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <button
          type="button"
          onClick={() => onOpen(project.id)}
          className="block w-full cursor-pointer overflow-hidden rounded-3xl border border-border/70 bg-card/40 text-left transition-colors duration-300 outline-none group-hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`View case study: ${project.name}`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, oklch(0.8 0.13 190 / 0.14), transparent 65%)`,
            }}
          />

          {/* Abstract visual — no invented screenshots */}
          <div className="relative aspect-video overflow-hidden border-b border-border/60">
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-25", project.accent)} />
            <div className="grid-texture absolute inset-0 opacity-70" />
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
              style={{
                transform: hover && !reduce ? `translate3d(${(glow.x - 50) * 0.16}px, ${(glow.y - 50) * 0.16}px, 40px) scale(1.05)` : "none",
              }}
            >
              <span className="font-mono text-[clamp(1.6rem,5vw,3rem)] tracking-[-0.02em] text-foreground/85">
                {project.name.split(" ")[0]}
              </span>
            </div>
            <span className="absolute top-4 left-5 font-mono text-[11px] tracking-[0.22em] text-foreground/70 uppercase">
              0{index + 1}
            </span>
          </div>

          <div className="relative p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              {project.kind}
            </p>
            <h3 className="mt-3 text-xl leading-snug font-medium text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-2xl">
              {project.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.blurb}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <li
                  key={t}
                  className="translate-y-1 rounded-full border border-border/70 bg-secondary/40 px-2.5 py-1 font-mono text-[10px] text-foreground/80 opacity-70 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {t}
                </li>
              ))}
            </ul>

            <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-foreground uppercase">
              View case study
              <ArrowRight className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </button>
      </article>
    </motion.div>
  );
}
