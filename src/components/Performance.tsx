import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { deliveryChain, performanceFocus } from "@/data/resume";

function DeliveryDiagram() {
  const reduce = useReducedMotion();

  return (
    <div className="noise relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-10">
      <div className="grid-texture absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative flex items-baseline justify-between">
        <p className="label text-accent">Asset delivery</p>
        <p className="font-mono text-[10px] text-muted-foreground">AWS S3 · CloudFront</p>
      </div>

      <ol className="relative mt-8 grid gap-4 sm:grid-cols-4 sm:gap-0">
        {deliveryChain.map((step, i) => (
          <li key={step.node} className="relative sm:pr-6">
            <div className="rounded-lg border border-border bg-background/70 p-4">
              <p className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-sm font-medium text-foreground">{step.node}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.note}</p>
            </div>

            {i < deliveryChain.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-1/2 right-0 hidden h-px w-6 -translate-y-1/2 bg-border-strong sm:block"
              >
                {!reduce ? (
                  <motion.span
                    className="absolute -top-[2px] left-0 size-[5px] rounded-full bg-accent"
                    animate={{ x: [0, 24], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ) : null}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Performance() {
  return (
    <section id="performance" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Performance focused"
          title="Interfaces that stay responsive under load."
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <ul className="border-t border-border">
            {performanceFocus.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.03} className="group border-b border-border">
                <div className="flex gap-5 py-6">
                  <span className="font-mono text-[11px] text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.08} className="lg:pt-6">
            <DeliveryDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
