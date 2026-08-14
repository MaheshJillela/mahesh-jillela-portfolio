import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { timeline } from "@/data/resume";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const raw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const height = useTransform(raw, [0, 1], ["0%", "100%"]);

  // Newest first: the line grows from the bottom (2021) upwards to today.
  const items = [...timeline].reverse();

  return (
    <section className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Career timeline"
          title="Read it bottom-up — from Computer Science to production game interfaces."
          lead="Latest at the top, the starting point at the bottom."
        />

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          <div className="absolute top-2 bottom-2 left-[11px] w-px bg-border sm:left-[19px]" />
          <motion.div
            className="absolute bottom-2 left-[11px] w-px bg-gradient-to-t from-accent/10 via-accent to-accent sm:left-[19px]"
            style={reduce ? { height: "100%" } : { height }}
          />

          <ol className="space-y-12">
            {items.map((item, i) => {
              const isLatest = i === 0;
              return (
                <Reveal as="li" key={item.title} delay={i * 0.05} className="group relative">
                  <span className="absolute top-2 -left-10 flex size-6 items-center justify-center sm:-left-16">
                    <span
                      className={
                        isLatest
                          ? "size-3 rounded-full bg-accent shadow-[0_0_22px_oklch(0.85_0.13_180/0.9)]"
                          : "size-2 rounded-full bg-accent/80 shadow-[0_0_14px_oklch(0.85_0.13_180/0.6)] transition-transform duration-300 group-hover:scale-150"
                      }
                    />
                  </span>

                  <div className="relative overflow-hidden rounded-2xl border border-transparent p-5 transition-colors duration-500 group-hover:border-border/70 group-hover:bg-card/40 sm:p-6">
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/[0.07] to-transparent transition-transform duration-700 group-hover:translate-x-0" />
                    <div className="relative flex flex-wrap items-center gap-3">
                      <p className="font-mono text-xs tracking-[0.24em] text-accent uppercase">
                        {item.year}
                      </p>
                      {isLatest ? (
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                          Latest
                        </span>
                      ) : null}
                      <span className="h-px flex-1 bg-border/70" />
                      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/70">
                        {String(items.length - i).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="relative mt-3 text-xl font-medium text-foreground sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="relative mt-1 text-sm text-muted-foreground">{item.org}</p>
                    <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
