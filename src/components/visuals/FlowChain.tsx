import { motion, useReducedMotion } from "framer-motion";

type Step = { node: string; note?: string };

/**
 * Vertical animated flow chain. A packet travels down the spine while each
 * node reveals on scroll.
 */
export function FlowChain({
  steps,
  compact = false,
  packet = true,
  className,
}: {
  steps: (Step | string)[];
  compact?: boolean;
  packet?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const items: Step[] = steps.map((s) => (typeof s === "string" ? { node: s } : s));

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* spine */}
      <div
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-[9px] w-px bg-border-strong"
      >
        {packet && !reduce ? (
          <motion.span
            className="absolute -left-[3px] size-[7px] rounded-full bg-accent shadow-[0_0_12px_2px_color-mix(in_oklab,var(--accent)_55%,transparent)]"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: Math.max(3, items.length * 0.55), repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </div>

      <ol className={compact ? "space-y-2.5" : "space-y-4"}>
        {items.map((s, i) => (
          <motion.li
            key={`${s.node}-${i}`}
            initial={reduce ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
            className="relative flex items-start gap-4 pl-7"
          >
            <span
              aria-hidden="true"
              className="absolute top-[7px] left-[5px] size-[9px] rounded-full border border-accent/60 bg-background"
            />
            <div className="min-w-0 flex-1 border-b border-border pb-2.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span
                  className={`font-mono tracking-[0.14em] uppercase ${
                    compact ? "text-[10px]" : "text-[11px]"
                  } ${i === 0 ? "text-accent" : "text-foreground/85"}`}
                >
                  {s.node}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {s.note ? (
                <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">{s.note}</p>
              ) : null}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/** Compact horizontal chip chain, wraps on small screens. */
export function ChipChain({ steps, accentFirst = true }: { steps: string[]; accentFirst?: boolean }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase ${
              accentFirst && i === 0
                ? "border-accent/60 bg-accent/10 text-accent"
                : "border-border text-muted-foreground"
            }`}
          >
            {s}
          </span>
          {i < steps.length - 1 ? (
            <span aria-hidden="true" className="font-mono text-[10px] text-accent/60">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
