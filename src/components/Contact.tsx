import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ParticleField } from "@/components/pixi/ParticleField";
import { profile } from "@/data/resume";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-border/60 py-24 sm:py-32"
    >
      <ParticleField className="absolute inset-0 -z-10 opacity-70" density={0.00006} follow={false} />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_100%,oklch(0.5_0.1_200/0.22),transparent_70%)]" />

      <div className="mx-auto w-full max-w-6xl px-5">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">Contact</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,6vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.03em] text-foreground">
            LET&apos;S BUILD SOMETHING INTERACTIVE.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              data-cursor="OPEN"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-6 font-mono text-xs tracking-[0.18em] text-background uppercase transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="OPEN"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card/40 px-6 font-mono text-xs tracking-[0.18em] text-foreground uppercase backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Github className="size-4" /> View GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="OPEN"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card/40 px-6 font-mono text-xs tracking-[0.18em] text-foreground uppercase backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Linkedin className="size-4" /> LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <dl className="mt-14 grid gap-6 border-t border-border/60 pt-8 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 text-accent" />
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm text-foreground underline-offset-4 hover:underline"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 text-accent" />
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-sm text-foreground underline-offset-4 hover:underline"
                  >
                    {profile.phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 text-accent" />
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Location
                </dt>
                <dd className="mt-1 text-sm text-foreground">{profile.location}</dd>
              </div>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
