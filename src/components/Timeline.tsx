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

  return (
    <section className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Career timeline"
          title="From Computer Science to production game interfaces."
        />

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-12">
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-border sm:left-[15px]" />
          <motion.div
            className="absolute top-2 left-[7px] w-px bg-gradient-to-b from-accent to-accent/10 sm:left-[15px]"
            style={reduce ? { height: "100%" } : { height }}
          />

          <ol className="space-y-10">
            {timeline.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.05} className="relative">
                <span className="absolute top-1.5 -left-8 flex size-4 items-center justify-center sm:-left-12">
                  <span className="size-2 rounded-full bg-accent shadow-[0_0_14px_oklch(0.85_0.13_180/0.8)]" />
                </span>
                <p className="font-mono text-xs tracking-[0.24em] text-accent uppercase">
                  {item.year}
                </p>
                <h3 className="mt-2 text-xl font-medium text-foreground sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
