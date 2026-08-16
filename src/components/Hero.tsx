import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { ParticleField } from "@/components/pixi/ParticleField";
import { luvis, profile } from "@/data/resume";

const EASE = [0.22, 1, 0.36, 1] as const;

const lines = ["I BUILD", "INTERFACES THAT", "DON'T STOP AT THE BROWSER."];

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
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-fade absolute inset-0" />
        <ParticleField className="absolute inset-0" density={0.00014} linkDistance={118} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          <span className="label text-foreground">{profile.name}</span>
          <span aria-hidden="true" className="hidden h-px w-16 bg-border-strong sm:block" />
          <span className="label text-accent">{profile.title}</span>
          <span className="label ml-auto hidden text-muted-foreground lg:block">
            {profile.location}
          </span>
        </motion.div>

        <h1 className="mt-10 font-display text-[11.5vw] leading-[0.9] font-medium tracking-[-0.03em] text-foreground sm:mt-14 sm:text-[8.4vw] lg:text-[6.1vw]">
          <span className="sr-only">
            Mahesh Jillela — Frontend Developer. {profile.headline}
          </span>
          {lines.map((line, i) => (
            <span
              key={line}
              aria-hidden="true"
              className="block overflow-hidden"
              style={{ marginLeft: i === 1 ? "5%" : i === 2 ? "2%" : 0 }}
            >
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "104%" }}
                animate={reduce ? false : { y: 0 }}
                transition={{ duration: 0.95, delay: 0.12 + i * 0.11, ease: EASE }}
              >
                {i === 2 ? (
                  <>
                    <span className="text-muted-foreground/45">DON'T STOP AT </span>
                    <span>THE BROWSER.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Design → Code → API → Server → Production */}
        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? false : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          {profile.chain.map((c, i) => (
            <li key={c} className="flex items-center gap-3">
              <span
                className={`font-mono text-[10px] tracking-[0.2em] uppercase sm:text-[11px] ${
                  i === 1 ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {c}
              </span>
              {i < profile.chain.length - 1 ? (
                <span aria-hidden="true" className="font-mono text-[10px] text-accent/50">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </motion.ul>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="border-l border-accent/50 pl-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <span className="text-foreground">Frontend-focused developer</span> with hands-on
              experience building production applications and working across APIs, Node.js, cloud
              infrastructure, servers, payments, caching, notifications and deployment.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                data-cursor="VIEW"
                onClick={() => scrollTo("frontend")}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 font-mono text-[11px] tracking-[0.18em] text-accent-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore my work
                <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
              <button
                type="button"
                data-cursor="OPEN"
                onClick={() => scrollTo("luvis")}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-accent/50 px-6 font-mono text-[11px] tracking-[0.18em] text-accent uppercase transition-colors duration-300 hover:bg-accent/10"
              >
                Explore {luvis.name}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            Frontend first · production aware
          </span>
        </div>
      </div>
    </section>
  );
}
