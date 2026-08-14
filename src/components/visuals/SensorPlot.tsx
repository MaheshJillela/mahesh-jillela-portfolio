import { motion, useReducedMotion } from "framer-motion";

const points = [26, 40, 33, 52, 44, 62, 55, 71, 63, 78, 68, 84];
const W = 320;
const H = 140;

function path(vals: number[]) {
  const step = W / (vals.length - 1);
  return vals
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)} ${(H - (v / 100) * H).toFixed(1)}`)
    .join(" ");
}

/** Sensor-driven dashboard visual: a plotted oxygen curve with a threshold band. */
export function SensorPlot() {
  const reduce = useReducedMotion();
  const d = path(points);

  return (
    <div className="noise relative flex h-full w-full flex-col justify-between bg-surface p-5 sm:p-7">
      <div className="grid-texture absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative flex items-baseline justify-between">
        <span className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
          Dissolved oxygen · estimated
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">Random Forest</span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative mt-4 w-full"
        role="img"
        aria-label="Line chart showing estimated dissolved oxygen levels rising over time"
      >
        <rect x="0" y={H * 0.18} width={W} height={H * 0.3} fill="var(--color-accent)" opacity="0.07" />
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1="0"
            x2={W}
            y1={H * f}
            y2={H * f}
            stroke="var(--color-border-strong)"
            strokeWidth="0.6"
          />
        ))}
        <motion.path
          d={d}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        {points.map((v, i) => (
          <circle
            key={i}
            cx={(i * W) / (points.length - 1)}
            cy={H - (v / 100) * H}
            r="1.8"
            fill="var(--color-accent)"
            opacity="0.75"
          />
        ))}
      </svg>

      <div className="relative mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="font-mono text-[10px] text-muted-foreground">Sensors → MySQL</span>
        <span className="font-mono text-[10px] text-muted-foreground">Automated aeration</span>
      </div>
    </div>
  );
}
