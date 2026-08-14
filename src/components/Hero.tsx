import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Mail } from "lucide-react";
import { ParticleField } from "@/components/pixi/ParticleField";
import { profile } from "@/data/resume";

const EASE = [0.22, 1, 0.36, 1] as const;

const lines = ["I BUILD", "INTERACTIVE", "DIGITAL EXPERIENCES."];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="noise relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Canvas layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-fade absolute inset-0" />
        <ParticleField className="absolute inset-0" density={0.00014} linkDistance={118} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        {/* meta row */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          <span className="label text-foreground">{profile.name}</span>
          <span aria-hidden="true" className="hidden h-px w-16 bg-border-strong sm:block" />
          <span className="label text-accent">Frontend Engineer</span>
          <span className="label ml-auto hidden text-muted-foreground lg:block">
            {profile.location}
          </span>
        </motion.div>

        {/* Headline — overlapping, offset lines */}
        <h1 className="mt-10 font-display text-[13vw] leading-[0.88] font-medium tracking-[-0.03em] text-foreground sm:mt-14 sm:text-[10vw] lg:text-[7.4vw]">
          <span className="sr-only">
            Mahesh Jillela — Frontend Engineer. I build interactive digital experiences.
          </span>
          {lines.map((line, i) => (
            <span
              key={line}
              aria-hidden="true"
              className="block overflow-hidden"
              style={{ marginLeft: i === 1 ? "6%" : i === 2 ? "2%" : 0 }}
            >
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "104%" }}
                animate={reduce ? false : { y: 0 }}
                transition={{ duration: 0.95, delay: 0.12 + i * 0.11, ease: EASE }}
              >
                {i === 2 ? (
                  <>
                    <span className="text-muted-foreground/45">DIGITAL </span>
                    <span>EXPERIENCES.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Supporting block overlaps the headline baseline */}
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="max-w-xl"
          >
            <p className="border-l border-accent/50 pl-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Software Engineer building interactive applications — gameplay UI, canvas animation
              and performance work with{" "}
              <span className="text-foreground">React, JavaScript and PixiJS</span>, plus
              full-stack delivery with Python, Flask and MySQL.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                data-cursor="VIEW"
                onClick={() => scrollTo("work")}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 font-mono text-[11px] tracking-[0.18em] text-accent-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore my work
                <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-border-strong px-6 font-mono text-[11px] tracking-[0.18em] text-foreground uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <Mail className="size-4" aria-hidden="true" />
                Contact me
              </button>
            </div>
          </motion.div>

          {/* Tech stack, mono, overlapping the right edge */}
          <motion.ul
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? false : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:flex-col lg:items-end lg:gap-y-3"
          >
            {profile.heroTech.map((t) => (
              <li
                key={t}
                className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-accent"
              >
                <span aria-hidden="true" className="mr-2 text-accent/60">
                  ·
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="label text-muted-foreground">Scroll to begin</span>
          <span className="label text-muted-foreground">
            Available for interactive frontend work
          </span>
        </div>

      </div>
    </section>
  );
}
