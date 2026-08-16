import { Reveal, SectionHeading } from "@/components/Reveal";
import { FlowChain } from "@/components/visuals/FlowChain";
import { mindset, principles } from "@/data/resume";

export function Mindset() {
  return (
    <section id="mindset" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="09"
          eyebrow="Engineering mindset"
          title="I think beyond the screen."
          lead={mindset.statement}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div className="h-full rounded-xl border border-border bg-surface/40 p-6 sm:p-8">
              <p className="label text-muted-foreground">Typical frontend thinking</p>
              <div className="mt-6 opacity-70">
                <FlowChain steps={mindset.typical} compact packet={false} />
              </div>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                The request leaves the browser and stops being anyone's problem.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="noise relative h-full overflow-hidden rounded-xl border border-accent/40 bg-accent/5 p-6 sm:p-8">
              <div className="grid-texture absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative">
                <p className="label text-accent">My production approach</p>
                <div className="mt-6">
                  <FlowChain steps={mindset.mine} compact />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Principles */}
        <div className="mt-24 border-t border-border pt-14 sm:mt-32">
          <Reveal>
            <p className="label text-accent">Engineering principles</p>
          </Reveal>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.04} className="group bg-background p-6">
                <p className="font-mono text-[10px] text-accent/70">{p.id}</p>
                <p className="mt-4 font-display text-lg leading-snug font-medium text-foreground transition-colors group-hover:text-accent">
                  {p.title}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
