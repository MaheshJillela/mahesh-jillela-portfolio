import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "frontend", label: "Frontend" },
  { id: "systems", label: "Systems" },
  { id: "cloud", label: "Cloud" },
  { id: "luvis", label: "Luvis" },
  { id: "flow", label: "Flow" },
  { id: "stack", label: "Stack" },
  { id: "skills", label: "Skills" },
  { id: "mindset", label: "Mindset" },
  { id: "experience", label: "Work" },
  { id: "lab", label: "Lab" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Fixed HUD rails, in the spirit of a game UI overlay: a tick-mark telemetry
 * column on the left and a section tracker on the right.
 */
export function HudRails() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const [pct, setPct] = useState(0);
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const unsub = smooth.on("change", (v) => setPct(Math.round(v * 100)));
    return () => unsub();
  }, [smooth]);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const ticks = 26;
  const filled = Math.round((pct / 100) * ticks);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 z-40 hidden w-full lg:block">
      {/* left telemetry rail */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <div className="flex flex-col items-center gap-[5px]">
          {Array.from({ length: ticks }, (_, i) => {
            const on = i < filled;
            const wide = i % 5 === 0;
            return (
              <span
                key={i}
                className={`block h-px rounded-full transition-colors duration-300 ${
                  wide ? "w-5" : "w-3"
                } ${on ? "bg-accent" : "bg-border-strong"}`}
              />
            );
          })}
        </div>
        <p className="mt-4 rotate-180 font-mono text-[9px] tracking-[0.28em] text-muted-foreground [writing-mode:vertical-rl]">
          SCROLL {String(pct).padStart(3, "0")}
        </p>
      </div>

      {/* right section tracker */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <ul className="pointer-events-auto flex flex-col items-end gap-2.5">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-center justify-end gap-2"
                  data-cursor="GO"
                >
                  <span
                    className={`font-mono text-[9px] tracking-[0.18em] uppercase transition-all duration-300 ${
                      isActive
                        ? "text-accent opacity-100"
                        : "text-muted-foreground opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {s.label}
                  </span>
                  <motion.span
                    animate={{ width: isActive ? 22 : 10 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.3 }}
                    className={`block h-px ${isActive ? "bg-accent" : "bg-border-strong group-hover:bg-accent/60"}`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
