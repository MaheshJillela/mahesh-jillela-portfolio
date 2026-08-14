import { Gauge } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { performanceFocus } from "@/data/resume";

export function Performance() {
  return (
    <section className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Performance focused"
          title="Rendering cost is a design constraint."
          lead="Concepts drawn from production work — no invented benchmark numbers."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {performanceFocus.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 0.05}
              className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm"
            >
              <Gauge
                aria-hidden="true"
                className="size-5 text-accent transition-transform duration-300 group-hover:rotate-12"
              />
              <h3 className="mt-4 text-base font-medium text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent/70 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
