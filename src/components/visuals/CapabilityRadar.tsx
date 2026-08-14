import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { pillars } from "@/data/resume";

const SIZE = 320;
const C = SIZE / 2;
const R = 118;

/** Relative emphasis per capability, derived from how prominent each is in the resume. */
const weight: Record<string, number> = {
  "Interactive Experiences": 1,
  "PixiJS & Canvas": 0.96,
  "React Architecture": 0.92,
  Animation: 0.88,
  Performance: 0.84,
  "Full-Stack Development": 0.78,
};

function point(i: number, total: number, r: number) {
  const a = (Math.PI * 2 * i) / total - Math.PI / 2;
  return [C + Math.cos(a) * r, C + Math.sin(a) * r] as const;
}

export function CapabilityRadar() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = pillars.length;

  const shape = pillars
    .map((p, i) => point(i, total, R * (weight[p.label] ?? 0.85)).join(","))
    .join(" ");

  return (
    <div className="grid gap-10 sm:grid-cols-[minmax(0,320px)_1fr] sm:items-center sm:gap-12">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Capability map derived from resume experience"
        className="w-full max-w-[320px]"
      >
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon
            key={s}
            points={pillars.map((_, i) => point(i, total, R * s).join(",")).join(" ")}
            className="fill-none stroke-border"
            strokeWidth="1"
          />
        ))}
        {pillars.map((p, i) => {
          const [x, y] = point(i, total, R);
          return <line key={p.label} x1={C} y1={C} x2={x} y2={y} className="stroke-border" />;
        })}

        <motion.polygon
          points={shape}
          className="fill-accent/12 stroke-accent"
          strokeWidth="1.5"
          initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${C}px ${C}px` }}
        />

        {pillars.map((p, i) => {
          const [x, y] = point(i, total, R * (weight[p.label] ?? 0.85));
          const isOn = active === i;
          return (
            <g key={p.label}>
              <circle
                cx={x}
                cy={y}
                r={isOn ? 6 : 3.5}
                className={isOn ? "fill-accent" : "fill-accent/60"}
                style={{ transition: "r 200ms" }}
              />
              <circle
                cx={x}
                cy={y}
                r={16}
                className="cursor-pointer fill-transparent"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                aria-label={p.label}
              />
            </g>
          );
        })}
      </svg>

      <ul className="space-y-1">
        {pillars.map((p, i) => {
          const isOn = active === i;
          return (
            <li key={p.label}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="w-full border-b border-border py-3 text-left"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-base font-medium transition-colors sm:text-lg ${
                      isOn ? "text-accent" : "text-foreground/70"
                    }`}
                  >
                    {p.label}
                  </span>
                </span>
                <span
                  className={`mt-1 block pl-7 text-xs leading-relaxed transition-opacity duration-300 ${
                    isOn ? "text-muted-foreground opacity-100" : "text-muted-foreground/0 opacity-0 sm:h-0 sm:overflow-hidden"
                  }`}
                >
                  {p.note}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
