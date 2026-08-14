import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated architecture visual for a full-stack application:
 * Frontend → REST API → Backend → Database, with a packet travelling the chain.
 */
export function StackFlow({
  layers,
  compact = false,
}: {
  layers: string[];
  compact?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="noise relative flex h-full w-full flex-col justify-center gap-2 bg-surface p-5 sm:gap-3 sm:p-8">
      <div className="grid-texture absolute inset-0 opacity-70" aria-hidden="true" />
      {layers.map((layer, i) => (
        <div key={layer} className="relative">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.09 }}
            className="relative flex items-center justify-between gap-3 rounded-md border border-border bg-background/70 px-3 py-2 sm:px-4 sm:py-3"
          >
            <span
              className={`truncate font-mono text-[10px] tracking-[0.14em] uppercase sm:text-[11px] ${
                i === 0 ? "text-accent" : "text-foreground/80"
              }`}
            >
              {layer}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              L{i + 1}
            </span>
            {!reduce ? (
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px bg-accent"
                animate={{ opacity: [0.15, 1, 0.15] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
              />
            ) : null}
          </motion.div>
          {i < layers.length - 1 ? (
            <div
              aria-hidden="true"
              className={`mx-auto ${compact ? "h-2" : "h-3 sm:h-4"} w-px bg-border-strong`}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
