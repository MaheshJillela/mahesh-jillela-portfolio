import { Reveal, SectionHeading } from "@/components/Reveal";
import { FlowChain } from "@/components/visuals/FlowChain";
import { apiSkills, nodeWork, requestFlow } from "@/data/resume";

export function SystemBridge() {
  return (
    <section id="systems" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Frontend ↔ Backend"
          title="I don't just build the screen."
          lead="I understand what happens when the screen talks to the system behind it — the request, the service, the data, and the response the interface has to handle."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="noise relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-8">
              <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-baseline justify-between">
                  <p className="label text-accent">Round trip</p>
                  <p className="font-mono text-[10px] text-muted-foreground">user → system → user</p>
                </div>
                <div className="mt-6">
                  <FlowChain steps={requestFlow} />
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.06}>
              <p className="label text-muted-foreground">What I work with</p>
              <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
                {apiSkills.map((s) => (
                  <li
                    key={s}
                    className="bg-background px-4 py-3.5 text-sm text-foreground/85 transition-colors hover:bg-surface hover:text-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Node.js */}
            <Reveal delay={0.12}>
              <div className="mt-14 border-t border-border pt-10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="font-display text-2xl font-medium text-foreground sm:text-3xl">
                    Node.js — Beyond the Frontend
                  </h3>
                  <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    Supporting skill
                  </span>
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {nodeWork.lead}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {nodeWork.items.map((n) => (
                    <li
                      key={n}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-foreground/75 uppercase transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
