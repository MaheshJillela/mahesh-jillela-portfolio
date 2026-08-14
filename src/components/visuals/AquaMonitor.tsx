import { motion, useReducedMotion } from "framer-motion";
import { Activity, Fan, Waves } from "lucide-react";

const series = [30, 38, 34, 46, 41, 55, 49, 62, 58, 70, 66, 76];
const W = 300;
const H = 78;

function line(vals: number[]) {
  const step = W / (vals.length - 1);
  return vals
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)} ${(H - (v / 100) * H).toFixed(1)}`)
    .join(" ");
}

const R = 26;
const C = 2 * Math.PI * R;

/**
 * Aquaculture control-room visual: a dissolved-oxygen gauge, a live trend
 * sparkline and the aeration actuator state. Purely presentational.
 */
export function AquaMonitor({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const pct = 0.72;

  return (
    <div className={`noise relative h-full w-full overflow-hidden bg-surface ${className}`}>
      <div className="grid-texture absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 80% 15%, oklch(0.855 0.148 178 / 0.12), transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.14em] uppercase">
          <span className="flex items-center gap-1.5 text-accent">
            <Waves className="size-3" aria-hidden="true" /> Pond 01 · monitoring
          </span>
          <span className="text-muted-foreground">Random Forest</span>
        </div>

        <div className="mt-3 flex flex-1 items-center gap-4">
          {/* gauge */}
          <div className="relative shrink-0">
            <svg viewBox="0 0 64 64" className="size-[68px]" role="img" aria-label="Dissolved oxygen at 72 percent of target">
              <circle cx="32" cy="32" r={R} fill="none" stroke="var(--color-border-strong)" strokeWidth="5" />
              <motion.circle
                cx="32"
                cy="32"
                r={R}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="5"
                strokeLinecap="round"
                transform="rotate(-90 32 32)"
                strokeDasharray={C}
                initial={reduce ? false : { strokeDashoffset: C }}
                whileInView={{ strokeDashoffset: C * (1 - pct) }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-sm text-foreground">6.4</span>
              <span className="font-mono text-[8px] text-muted-foreground">mg/L</span>
            </span>
          </div>

          {/* trend */}
          <div className="min-w-0 flex-1">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="presentation">
              <rect x="0" y={H * 0.14} width={W} height={H * 0.28} fill="var(--color-accent)" opacity="0.08" />
              {[0.33, 0.66].map((f) => (
                <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="var(--color-border)" strokeWidth="0.8" />
              ))}
              <motion.path
                d={line(series)}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <circle
                cx={W}
                cy={H - (series[series.length - 1]! / 100) * H}
                r="3"
                fill="var(--color-accent)"
              />
            </svg>
            <p className="mt-1 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
              Estimated · last 12 readings
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background/40 px-2.5 py-2">
            <motion.span
              className="text-accent"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <Fan className="size-3.5" />
            </motion.span>
            <span className="font-mono text-[9px] tracking-[0.12em] text-foreground/80 uppercase">
              Aerator on
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background/40 px-2.5 py-2">
            <Activity className="size-3.5 text-accent" aria-hidden="true" />
            <span className="truncate font-mono text-[9px] tracking-[0.12em] text-foreground/80 uppercase">
              Sensors → MySQL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
