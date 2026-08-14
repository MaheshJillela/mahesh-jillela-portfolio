import { Reveal, SectionHeading } from "@/components/Reveal";
import { process } from "@/data/resume";

export function Process() {
  return (
    <section className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Engineering approach"
          title="How a build moves from idea to deployment."
        />

        <ol className="mt-14 grid gap-3 md:grid-cols-3">
          {process.map((step, i) => (
            <Reveal
              as="li"
              key={step.stage}
              delay={i * 0.06}
              className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/40 p-6 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.24em] text-accent uppercase">
                  Stage 0{i + 1}
                </span>
                <span aria-hidden="true" className="text-accent/50">
                  ↓
                </span>
              </div>
              <h3 className="mt-4 text-xl font-medium tracking-tight text-foreground">
                {step.stage}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:max-h-0 md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-40 md:group-focus-within:max-h-40 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-muted-foreground/80 uppercase">
          Hover a stage for detail — full text stays available on smaller screens.
        </p>
      </div>
    </section>
  );
}
