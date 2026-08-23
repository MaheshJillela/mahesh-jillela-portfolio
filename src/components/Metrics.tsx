import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { metrics } from "@/data/resume";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Metrics() {
  return (
    <section id="metrics" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="flex items-center gap-5">
          <span className="font-mono text-[10px] text-accent">08</span>
          <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
            By the numbers
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 0.04} className="group bg-background p-7">
              <p className="font-editorial text-5xl leading-none text-accent sm:text-6xl">
                <Counter value={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-4 font-display text-sm text-foreground">{m.label}</p>
              <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                {m.note}
              </p>
              <span
                aria-hidden="true"
                className="mt-5 block h-px w-10 bg-accent/40 transition-all duration-500 group-hover:w-24 group-hover:bg-accent"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
