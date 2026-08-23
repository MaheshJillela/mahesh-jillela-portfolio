import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { experience, timeline } from "@/data/resume";

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 80%", "end 40%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const job = experience[0];
  const entries = [...timeline].reverse();

  if (!job) return null;

  return (
    <section id="experience" className="relative overflow-hidden py-28 sm:py-44">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="flex items-center gap-5">
          <span className="font-mono text-[10px] text-accent">04</span>
          <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">Career ascent</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">{job.period}</p>
            <h2 className="mt-5 font-editorial text-5xl leading-[0.94] text-foreground sm:text-7xl">From code<br /><em className="text-muted-foreground">to live gameplay.</em></h2>
            <div className="mt-10 border-l border-accent/50 pl-5">
              <p className="font-editorial text-2xl text-foreground">{job.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{job.company}</p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/75">{job.built}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {job.tech.map((tech) => <span key={tech} className="font-mono text-[9px] tracking-[0.1em] text-muted-foreground uppercase">{tech}</span>)}
            </div>
          </div>

          <div ref={lineRef} className="relative pl-10 sm:pl-16">
            <div className="absolute top-0 bottom-0 left-[5px] w-px bg-border sm:left-[9px]">
              <motion.div style={reduce ? { scaleY: 1 } : { scaleY }} className="h-full w-px origin-bottom bg-accent" />
            </div>
            <ol className="flex flex-col-reverse gap-20">
              {entries.map((entry, i) => (
                <Reveal as="li" key={`${entry.year}-${entry.title}`} delay={i * 0.04} className="relative">
                  <span className="absolute top-2 -left-[39px] size-3 rounded-full border border-accent bg-background shadow-[0_0_18px_var(--accent)] sm:-left-[62px]" />
                  <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">{entry.year}</p>
                  <h3 className="mt-4 font-editorial text-3xl leading-tight text-foreground sm:text-5xl">{entry.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{entry.org}</p>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/75">{entry.body}</p>
                </Reveal>
              ))}
            </ol>

            <div className="mt-24 border-t border-border pt-10">
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Production evidence</p>
              <ol className="mt-8 divide-y divide-border">
                {job.points.slice(0, 5).map((point, i) => (
                  <li key={point} className="group grid grid-cols-[auto_minmax(0,1fr)] gap-5 py-6">
                    <span className="font-mono text-[9px] text-accent/60">0{i + 1}</span>
                    <span className="text-sm leading-relaxed text-foreground/75 transition-transform duration-500 group-hover:translate-x-2 group-hover:text-foreground">{point}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}