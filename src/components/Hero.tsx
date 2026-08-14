import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Mail } from "lucide-react";
import { ParticleField } from "@/components/pixi/ParticleField";
import { profile } from "@/data/resume";

const headline = ["I BUILD", "INTERACTIVE", "DIGITAL", "EXPERIENCES."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative isolate flex min-h-screen items-center overflow-hidden">
      <ParticleField className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.45_0.09_200/0.28),transparent_70%)]" />
      <div className="grid-texture absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-20">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.32em] text-accent uppercase"
        >
          {profile.title}
        </motion.p>

        <h1 className="mt-6 text-[clamp(2.4rem,9vw,6.5rem)] leading-[0.94] font-semibold tracking-[-0.03em] text-foreground">
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={reduce ? false : { y: 0 }}
                transition={{ duration: 0.85, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 1 ? (
                  <span className="bg-gradient-to-r from-[oklch(0.9_0.09_180)] via-[oklch(0.8_0.13_195)] to-[oklch(0.66_0.13_265)] bg-clip-text text-transparent">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? false : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end"
        >
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.name} — building interactive casino game interfaces with PixiJS and React at
            TZeSSt Technologies, and full-stack applications end to end. Based in{" "}
            {profile.location}.
          </p>

          <div className="flex flex-col gap-5">
            <ul className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase lg:justify-end">
              {profile.heroTech.map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span>{t}</span>
                  <span className="text-accent/50 last:hidden">•</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href="#projects"
                data-cursor="VIEW"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-6 font-mono text-xs tracking-[0.18em] text-background uppercase transition-transform hover:-translate-y-0.5"
              >
                Explore my work
                <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                data-cursor="OPEN"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card/40 px-6 font-mono text-xs tracking-[0.18em] text-foreground uppercase backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Mail className="size-4" />
                Contact me
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground/70 uppercase">
        Scroll
      </div>
    </section>
  );
}
