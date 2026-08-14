import { Trophy } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { achievement } from "@/data/resume";

export function Achievement() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/40 p-8 backdrop-blur-sm sm:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_20%,oklch(0.75_0.12_95/0.14),transparent_70%)]" />
            <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              <motion.span
                className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10"
                animate={reduce ? false : { scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="absolute inset-0 rounded-full border border-accent/20" />
                <Trophy aria-hidden="true" className="size-10 text-accent" />
              </motion.span>
              <div>
                <p className="font-mono text-xs tracking-[0.28em] text-accent uppercase">
                  Awards & achievements
                </p>
                <h2 className="mt-4 text-2xl leading-tight font-semibold text-foreground sm:text-4xl">
                  {achievement.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">{achievement.org}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
