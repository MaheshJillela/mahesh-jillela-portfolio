import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Reveal, LineReveal } from "@/components/Reveal";
import { WaveField } from "@/components/pixi/WaveField";
import { profile } from "@/data/resume";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: "GitHub", value: "MaheshJillela", href: profile.github, Icon: Github },
  { label: "LinkedIn", value: "mahesh-jillela", href: profile.linkedin, Icon: Linkedin },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, Icon: Phone },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <WaveField className="absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label text-accent">Contact</span>
            <span aria-hidden="true" className="rule-x flex-1" />
          </div>
        </Reveal>

        <h2 className="mt-10 max-w-4xl font-display text-[10vw] leading-[0.95] font-medium tracking-[-0.03em] text-foreground sm:text-[5.5rem]">
          <LineReveal text="LET'S BUILD SOMETHING INTERACTIVE." />
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal delay={0.08}>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Open to interactive frontend and full-stack work — canvas and PixiJS interfaces,
              React applications, and end-to-end product builds. Based in {profile.location}.
            </p>
            <a
              data-cursor="OPEN"
              href={`mailto:${profile.email}`}
              className="group mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 font-mono text-[11px] tracking-[0.18em] text-accent-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              {profile.email}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          <ul className="border-t border-border">
            {channels.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.05} className="border-b border-border">
                <a
                  data-cursor="OPEN"
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="group flex items-center gap-5 py-5"
                >
                  <c.Icon className="size-4 text-accent" aria-hidden="true" />
                  <span className="label w-24 shrink-0 text-muted-foreground">{c.label}</span>
                  <span className="flex-1 truncate text-sm text-foreground transition-transform duration-300 group-hover:translate-x-1">
                    {c.value}
                  </span>
                  <ArrowUpRight
                    className="size-4 text-muted-foreground transition-colors group-hover:text-accent"
                    aria-hidden="true"
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
