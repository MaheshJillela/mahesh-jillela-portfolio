import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Mail, MapPin } from "lucide-react";
import { ParticleField } from "@/components/pixi/ParticleField";
import { profile } from "@/data/resume";

const headline = ["INTERACTIVE", "GAME", "INTERFACES"];

const facts = [
  { k: "Now", v: "Assoc. Software Engineer" },
  { k: "Studio", v: "TZeSSt Technologies" },
  { k: "Craft", v: "PixiJS · WebGL · React" },
  { k: "Since", v: "Jun 2025" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden"
    >
      <ParticleField className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.45_0.09_200/0.3),transparent_70%)]" />
      <div className="grid-texture absolute inset-0 -z-10" />

      <motion.div
        style={reduce ? {} : { y, opacity: fade }}
        className="mx-auto w-full max-w-6xl px-5 pt-32 pb-24"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-[0.24em] text-accent uppercase">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent" />
              <span className="size-1.5 rounded-full bg-accent" />
            </span>
            Shipping production game UI
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
            <MapPin className="size-3" />
            {profile.location}
          </span>
        </motion.div>

        <h1 className="mt-8 text-[clamp(2.6rem,10vw,7rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-foreground">
          <span className="block overflow-hidden">
            <motion.span
              className="block font-mono text-[clamp(0.7rem,1.6vw,0.95rem)] font-normal tracking-[0.34em] text-muted-foreground uppercase"
              initial={reduce ? false : { y: "110%" }}
              animate={reduce ? false : { y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {profile.name}
            </motion.span>
          </span>
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={reduce ? false : { y: 0 }}
                transition={{ duration: 0.9, delay: 0.12 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 1 ? (
                  <span className="bg-gradient-to-r from-[oklch(0.92_0.09_180)] via-[oklch(0.8_0.13_195)] to-[oklch(0.66_0.13_265)] bg-clip-text text-transparent">
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
          className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-end"
        >
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
              Slot and crash game interfaces built with PixiJS and React — gameplay flows, canvas
              animation, sound integration and responsive layouts, served worldwide through AWS.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Full-stack when it matters: Python, Flask, Node.js, REST APIs and MySQL, from
              architecture through deployment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/40">
            {facts.map((f, i) => (
              <motion.div
                key={f.k}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={reduce ? false : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
                className="bg-card/50 p-5 transition-colors hover:bg-card/80"
              >
                <dt className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
                  {f.k}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-foreground">{f.v}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden border-t border-border/50 bg-background/40 py-3">
        <motion.div
          className="flex w-max gap-10 font-mono text-[11px] tracking-[0.3em] text-muted-foreground/80 uppercase"
          animate={reduce ? false : { x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-10">
              {[...profile.heroTech, "React Native", "Spine", "AWS S3", "CloudFront"].map((t) => (
                <span key={t} className="flex items-center gap-10">
                  {t}
                  <span className="text-accent/60">/</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
