import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STAGES = [
  "Interface",
  "API layer",
  "Cache",
  "Server",
  "Production",
] as const;

/**
 * Boot overlay inspired by game-studio preloaders: a percentage counter,
 * rotating geometric mark and a staged pipeline readout. Runs once per session.
 */
export function BootSequence() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mj-booted") === "1") return;
    sessionStorage.setItem("mj-booted", "1");
    setVisible(true);
    document.documentElement.style.overflow = "hidden";

    const total = reduce ? 500 : 1900;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 320);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = "";
  }, [visible]);

  const stage = Math.min(STAGES.length - 1, Math.floor((pct / 100) * STAGES.length));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aurora-wash absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="grid-fade absolute inset-0" aria-hidden="true" />

          <div className="relative flex flex-col items-center">
            {/* rotating geometric mark */}
            <svg
              viewBox="0 0 200 200"
              className="size-52 sm:size-72"
              aria-hidden="true"
            >
              {[0, 1, 2].map((i) => (
                <motion.g
                  key={i}
                  style={{ originX: "100px", originY: "100px" }}
                  animate={reduce ? {} : { rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 22 + i * 9, repeat: Infinity, ease: "linear" }}
                >
                  <polygon
                    points={Array.from({ length: 6 + i * 2 }, (_, k) => {
                      const sides = 6 + i * 2;
                      const a = (k / sides) * Math.PI * 2 - Math.PI / 2;
                      const r = 78 - i * 20;
                      return `${100 + Math.cos(a) * r},${100 + Math.sin(a) * r}`;
                    }).join(" ")}
                    fill="none"
                    stroke="var(--accent)"
                    strokeOpacity={0.32 - i * 0.06}
                    strokeWidth="0.8"
                  />
                </motion.g>
              ))}
              <circle cx="100" cy="100" r="3" fill="var(--accent)" />
            </svg>

            <p className="label mt-8 text-accent">Mahesh Jillela</p>
            <p className="mt-2 font-display text-5xl font-medium tabular-nums text-foreground sm:text-6xl">
              {pct}%
            </p>

            {/* progress rail */}
            <div className="mt-6 h-px w-56 overflow-hidden bg-border-strong sm:w-72">
              <div
                className="h-full bg-accent transition-[width] duration-100"
                style={{ width: `${pct}%` }}
              />
            </div>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              {STAGES.map((s, i) => (
                <li
                  key={s}
                  className={`font-mono text-[9px] tracking-[0.18em] uppercase transition-colors sm:text-[10px] ${
                    i <= stage ? "text-accent" : "text-muted-foreground/50"
                  }`}
                >
                  {s}
                  {i < STAGES.length - 1 && <span className="ml-3 opacity-40">/</span>}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
