import { motion, useReducedMotion } from "framer-motion";
import { Heart, ShoppingBag, Sparkles, Star } from "lucide-react";

/**
 * Luvis storefront character piece: a boutique product spotlight for a
 * girls' jewellery store, rendered in the site's graphite + teal system so it
 * blends with the rest of the page. Purely presentational.
 */
export function LuvisShowcase({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`noise relative h-full w-full overflow-hidden bg-surface ${className}`}>
      <div className="grid-texture absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 18% 12%, oklch(0.855 0.148 178 / 0.12), transparent 70%)",
        }}
      />

      {/* floating sparkles */}
      {[
        { x: "16%", y: "24%", d: 0 },
        { x: "76%", y: "18%", d: 0.6 },
        { x: "62%", y: "78%", d: 1.1 },
      ].map((s) => (
        <motion.span
          key={s.x}
          aria-hidden="true"
          className="absolute text-accent"
          style={{ left: s.x, top: s.y }}
          initial={reduce ? false : { opacity: 0.25, scale: 0.85 }}
          {...(reduce
            ? {}
            : {
                animate: { opacity: [0.2, 0.7, 0.2], scale: [0.85, 1.08, 0.85] },
                transition: { duration: 3.2, repeat: Infinity, delay: s.d, ease: "easeInOut" as const },
              })}
        >
          <Sparkles className="size-3.5" />
        </motion.span>
      ))}

      <div className="relative flex h-full flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.14em] uppercase">
          <span className="flex items-center gap-1.5 text-accent">
            <Heart className="size-3 fill-current" aria-hidden="true" /> Luvis · storefront
          </span>
          <span className="text-muted-foreground">Flask · MySQL</span>
        </div>

        <div className="mt-3 grid flex-1 grid-cols-[1.35fr_1fr] gap-3">
          {/* hero product */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-background/40 p-3"
          >
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-accent-foreground uppercase">
                Bestseller
              </span>
              <span className="flex items-center gap-0.5 text-accent" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-2.5 fill-current" />
                ))}
              </span>
            </div>

            {/* abstract earring illustration */}
            <svg viewBox="0 0 120 90" className="mx-auto w-3/4" role="presentation">
              <g stroke="var(--color-accent)" fill="none" strokeWidth="1.4" opacity="0.9">
                <circle cx="42" cy="26" r="9" />
                <path d="M42 35 C 30 52, 34 70, 42 78 C 50 70, 54 52, 42 35 Z" />
                <circle cx="82" cy="26" r="9" />
                <path d="M82 35 C 70 52, 74 70, 82 78 C 90 70, 94 52, 82 35 Z" />
              </g>
              <circle cx="42" cy="60" r="3" fill="var(--color-accent)" />
              <circle cx="82" cy="60" r="3" fill="var(--color-accent)" />
            </svg>

            <div>
              <p className="font-display text-sm leading-tight text-foreground">
                Pearl drop earrings
              </p>
              <div className="mt-1 flex items-center justify-between font-mono text-[10px]">
                <span className="text-accent">₹499</span>
                <span className="text-muted-foreground">In stock</span>
              </div>
            </div>
          </motion.div>

          {/* collections + cart */}
          <div className="flex flex-col gap-2">
            {["Earrings", "Bangles", "Hair clips"].map((c, i) => (
              <motion.div
                key={c}
                initial={reduce ? false : { opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background/40 px-2.5"
              >
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                <span className="truncate font-mono text-[9px] tracking-[0.12em] text-foreground/80 uppercase">
                  {c}
                </span>
              </motion.div>
            ))}

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-accent py-2 font-mono text-[9px] tracking-[0.14em] text-accent-foreground uppercase"
            >
              <ShoppingBag className="size-3" aria-hidden="true" /> Add to bag
            </motion.div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
          <span>luvis.site · live</span>
          <span className="text-accent">Cart · Checkout · Orders</span>
        </div>
      </div>
    </div>
  );
}
