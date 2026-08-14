import { motion, useReducedMotion } from "framer-motion";

const tiles = [
  { label: "Earrings", h: "h-[58%]" },
  { label: "Bangles", h: "h-[72%]" },
  { label: "Hair", h: "h-[46%]" },
  { label: "Combos", h: "h-[64%]" },
  { label: "Necklaces", h: "h-[52%]" },
  { label: "New in", h: "h-[68%]" },
];

/**
 * Abstract storefront mock for the Luvis case: browser chrome carrying the
 * live domain plus a catalogue grid that animates in. Purely presentational.
 */
export function StorefrontMock({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`flex h-full w-full flex-col bg-surface ${className}`}>
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-accent/60" />
        </span>
        <span className="ml-2 flex-1 truncate rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
          luvis.site
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-accent uppercase">Live</span>
      </div>

      {/* catalogue grid */}
      <div className="grid flex-1 grid-cols-3 gap-2 p-4">
        {tiles.map((t, i) => (
          <motion.div
            key={t.label}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="flex flex-col justify-end gap-1.5"
          >
            <div
              className={`w-full ${t.h} rounded-md border border-border bg-gradient-to-b from-accent/12 to-transparent`}
            />
            <span className="truncate font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
              {t.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
        <span>Flask · REST APIs</span>
        <span>MySQL</span>
      </div>
    </div>
  );
}
