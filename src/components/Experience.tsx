import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { experience, timeline } from "@/data/resume";

function ScrollLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 bottom-0 left-[7px] w-px bg-border sm:left-[calc(7rem+7px)]"
    >
      <motion.div
        style={reduce ? { scaleY: 1 } : { scaleY }}
        className="h-full w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/10"
      />
    </div>
  );
}

export function Experience() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const entries = [...timeline].reverse();

  return (
    <section id="experience" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="10"
          eyebrow="Experience"
          title="Role, what I built, what it taught me."
        />

        {experience.map((job) => (
          <div key={job.company} className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            {/* Meta column */}
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <p className="label text-accent">{job.period}</p>
              <h3 className="mt-5 font-display text-3xl leading-tight font-medium text-foreground sm:text-4xl">
                {job.role}
              </h3>
              <p className="mt-3 text-base text-foreground/80">{job.company}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.type} · {job.place}
              </p>

              <dl className="mt-8 space-y-4">
                {[
                  { k: "Built", v: job.built },
                  { k: "Learned", v: job.learned },
                  { k: "Production", v: job.production },
                ].map((r) => (
                  <div key={r.k} className="rounded-lg border border-border bg-surface/50 p-4">
                    <dt className="label text-accent">{r.k}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-foreground/80">{r.v}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
                {job.tech.map((t) => (
                  <li key={t} className="font-mono text-[11px] text-muted-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Responsibilities as numbered editorial rows */}
            <ol className="border-t border-border">
              {job.points.map((p, i) => (
                <Reveal as="li" key={p} delay={i * 0.03} className="group border-b border-border">
                  <div className="flex gap-5 py-6 transition-colors sm:gap-8">
                    <span className="font-mono text-[11px] text-accent/70 transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-2xl text-[0.95rem] leading-relaxed text-foreground/85 transition-colors group-hover:text-foreground">
                      {p}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        ))}

        {/* Journey — animated timeline, newest first */}
        <div className="mt-24 sm:mt-32">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="label text-muted-foreground">Journey</span>
              <span aria-hidden="true" className="rule-x flex-1" />
            </div>
          </Reveal>

          <div ref={journeyRef} className="relative mt-10 pl-8 sm:pl-0">
            <ScrollLine containerRef={journeyRef} />

            <ol className="space-y-12">
              {entries.map((e, i) => (
                <Reveal as="li" key={`${e.year}-${e.title}`} delay={i * 0.04}>
                  <div className="relative sm:grid sm:grid-cols-[7rem_1fr] sm:gap-8">
                    <p className="label text-accent sm:pt-1 sm:text-right">{e.year}</p>
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 -left-8 size-[15px] rounded-full border border-accent/50 bg-background sm:left-[calc(7rem)]"
                    >
                      <span className="absolute inset-[3px] rounded-full bg-accent" />
                    </span>
                    <div className="mt-2 sm:mt-0 sm:pl-8">
                      <h4 className="font-display text-lg font-medium text-foreground sm:text-xl">
                        {e.title}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">{e.org}</p>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/70">
                        {e.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
