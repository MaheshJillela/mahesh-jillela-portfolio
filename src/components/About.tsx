import { Reveal, SectionHeading } from "@/components/Reveal";
import { CapabilityRadar } from "@/components/visuals/CapabilityRadar";
import { education, profile } from "@/data/resume";

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* Left: heading + spec sheet */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading index="01" eyebrow="About" title="Engineer first, interaction always." />

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                {profile.summary}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-10 space-y-5">
                {[
                  { k: "Role", v: profile.title },
                  { k: "Based", v: profile.location },
                  { k: "Degree", v: education.degree },
                  { k: "Institute", v: education.school },
                  { k: "Period", v: `${education.period} · CGPA ${education.cgpa}` },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border pb-4"
                  >
                    <dt className="label text-muted-foreground">{row.k}</dt>
                    <dd className="text-sm leading-snug text-foreground">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: capability map instead of bullet lists */}
          <Reveal delay={0.08}>
            <div className="noise relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-10">
              <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="relative flex items-baseline justify-between">
                <p className="label text-accent">Capability map</p>
                <p className="font-mono text-[10px] text-muted-foreground">Hover a node</p>
              </div>
              <div className="relative mt-8">
                <CapabilityRadar />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
