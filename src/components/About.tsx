import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { education, profile, traits } from "@/data/resume";

function ScrollHighlightText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="flex flex-wrap text-lg leading-relaxed font-light text-foreground sm:text-2xl"
    >
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1.6) / words.length]}
          reduce={!!reduce}
        />
      ))}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
  reduce,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="mr-[0.28em] inline-block">
      <motion.span style={reduce ? { opacity: 1 } : { opacity }}>{word}</motion.span>
    </span>
  );
}

export function About() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="pointer-events-none absolute top-1/3 -left-40 size-[28rem] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.13_190/0.12),transparent_65%)] blur-2xl" />
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <SectionHeading eyebrow="Who I am" title="Engineering interfaces that respond." />

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.05fr]">
          {/* Editorial column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ScrollHighlightText text={profile.summary} />

            <div className="mt-10 space-y-px overflow-hidden rounded-2xl border border-border/70 bg-border/40">
              {[
                { k: "Degree", v: education.degree },
                { k: "Institute", v: `${education.school} · ${education.period}` },
                { k: "CGPA", v: education.cgpa },
                { k: "Based in", v: profile.location },
              ].map((row) => (
                <div
                  key={row.k}
                  className="group flex items-baseline gap-4 bg-card/50 px-5 py-4 transition-colors hover:bg-card/90"
                >
                  <span className="w-24 shrink-0 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase group-hover:text-accent">
                    {row.k}
                  </span>
                  <span className="text-sm leading-snug text-foreground">{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive capability rail */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
              What I work on
            </p>
            <ul className="mt-6 border-t border-border/60">
              {traits.map((t, i) => {
                const isActive = active === i;
                return (
                  <Reveal
                    as="li"
                    key={t.label}
                    delay={i * 0.05}
                    className="border-b border-border/60"
                  >
                    <button
                      type="button"
                      data-cursor="READ"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-expanded={isActive}
                      className="group relative flex w-full items-start gap-5 py-5 text-left"
                    >
                      <span
                        className={`absolute inset-y-0 left-0 w-px transition-colors ${
                          isActive ? "bg-accent" : "bg-transparent"
                        }`}
                      />
                      <span
                        className={`mt-1 font-mono text-[11px] tracking-[0.2em] transition-colors ${
                          isActive ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block text-lg font-medium transition-transform duration-500 sm:text-xl ${
                            isActive
                              ? "translate-x-1 text-foreground"
                              : "text-foreground/65 group-hover:text-foreground"
                          }`}
                        >
                          {t.label}
                        </span>
                        <motion.span
                          initial={false}
                          animate={
                            reduce
                              ? { height: "auto", opacity: 1 }
                              : { height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }
                          }
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="block overflow-hidden"
                        >
                          <span className="mt-2 block max-w-md text-sm leading-relaxed text-muted-foreground">
                            {t.detail}
                          </span>
                        </motion.span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-2 h-px flex-1 origin-right bg-gradient-to-r from-transparent to-accent/70 transition-transform duration-500 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </button>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
