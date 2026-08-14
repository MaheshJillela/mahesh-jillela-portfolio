import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { buildSteps } from "@/data/resume";

export function Process() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="process" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading index="07" eyebrow="How I build" title="Five stages, every project." />

        <ul className="mt-16 border-t border-border">
          {buildSteps.map((step, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={step.id} delay={i * 0.04} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  onMouseEnter={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-5 py-7 text-left sm:gap-10"
                >
                  <span
                    className={`font-mono text-[11px] transition-colors ${
                      isOpen ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {step.id}
                  </span>
                  <span
                    className={`font-display text-[9vw] leading-none font-medium tracking-[-0.02em] uppercase transition-colors duration-300 sm:text-5xl ${
                      isOpen ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/80"
                    }`}
                  >
                    {step.stage}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto hidden h-px flex-1 origin-right bg-accent transition-transform duration-500 sm:block ${
                      isOpen ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={
                    reduce
                      ? { height: "auto", opacity: 1 }
                      : { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }
                  }
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 sm:pl-[4.5rem]">
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {step.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-foreground/75"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
