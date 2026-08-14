import { Reveal, SectionHeading } from "@/components/Reveal";
import { education, profile, traits } from "@/data/resume";

export function About() {
  return (
    <section id="about" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading eyebrow="Who I am" title="Engineering interfaces that respond." />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground/90">{profile.summary}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="grid grid-cols-2 gap-4 border-t border-border/60 pt-6 text-sm">
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Education
                  </dt>
                  <dd className="mt-1 text-foreground">{education.degree}</dd>
                  <dd className="text-muted-foreground">
                    {education.school} · {education.period}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    CGPA
                  </dt>
                  <dd className="mt-1 text-foreground">{education.cgpa}</dd>
                  <dt className="mt-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Based in
                  </dt>
                  <dd className="mt-1 text-foreground">{profile.location}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {traits.map((t, i) => (
              <Reveal
                as="li"
                key={t.label}
                delay={i * 0.06}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-accent/40"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                  0{i + 1}
                </p>
                <h3 className="mt-3 text-base font-medium text-foreground">{t.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
