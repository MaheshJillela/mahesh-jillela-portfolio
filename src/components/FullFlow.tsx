import { useRef } from "react";
import type { MotionValue } from "framer-motion";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/Reveal";
import { fullFlow } from "@/data/resume";

export function FullFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);
  const top = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="flow" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Full application flow"
          title="One click, the whole system."
          lead="Scroll to follow a single Luvis request as it travels through the frontend, the API, Node.js, the cache, the database, external services and back to the screen."
        />

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          {/* spine */}
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[13px] w-px bg-border sm:left-[27px]">
            <motion.div
              style={reduce ? { height: "100%" } : { height }}
              className="w-px origin-top bg-accent"
            />
            {!reduce ? (
              <motion.span
                style={{ top }}
                className="absolute -left-[4px] size-[9px] -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_3px_color-mix(in_oklab,var(--accent)_50%,transparent)]"
              />
            ) : null}
          </div>

          <ol className="space-y-10 sm:space-y-14">
            {fullFlow.map((f, i) => (
              <FlowStep
                key={f.step}
                step={f.step}
                note={f.note}
                index={i}
                total={fullFlow.length}
                progress={progress}
                reduce={!!reduce}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function FlowStep({
  step,
  note,
  index,
  total,
  progress,
  reduce,
}: {
  step: string;
  note: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = index / total;
  const opacity = useTransform(progress, [start - 0.08, start + 0.02], [0.28, 1]);
  const x = useTransform(progress, [start - 0.08, start + 0.02], [10, 0]);

  return (
    <motion.li style={reduce ? { opacity: 1 } : { opacity, x }} className="relative">
      <span
        aria-hidden="true"
        className="absolute top-2 -left-10 size-[13px] rounded-full border border-accent/60 bg-background sm:-left-16"
      >
        <span className="absolute inset-[3px] rounded-full bg-accent" />
      </span>
      <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-2 font-display text-xl leading-tight font-medium text-foreground sm:text-3xl">
        {step}
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{note}</p>
    </motion.li>
  );
}
