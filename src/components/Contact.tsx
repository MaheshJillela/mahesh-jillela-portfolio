import { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, Send, Trophy } from "lucide-react";
import { Reveal, LineReveal } from "@/components/Reveal";
import { WaveField } from "@/components/pixi/WaveField";
import { achievement, profile } from "@/data/resume";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: "GitHub", value: "MaheshJillela", href: profile.github, Icon: Github },
  { label: "LinkedIn", value: "mahesh-jillela", href: profile.linkedin, Icon: Linkedin },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, Icon: Phone },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry — ${name || "Hello"}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

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

        <h2 className="mt-8 max-w-4xl font-display text-[12vw] leading-[0.95] font-medium tracking-[-0.03em] text-foreground sm:mt-10 sm:text-[5.5rem]">
          <LineReveal text="LET'S BUILD SOMETHING INTERACTIVE." />
        </h2>


        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal delay={0.08}>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Open to interactive frontend and full-stack work — canvas and PixiJS interfaces,
                React applications, and end-to-end product builds. Based in {profile.location}.
              </p>
              <a
                data-cursor="OPEN"
                href={`mailto:${profile.email}`}
                className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 font-mono text-[11px] tracking-[0.18em] text-accent-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
              >
                {profile.email}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 flex items-center gap-4 rounded-xl border border-accent/30 bg-accent/5 p-5">
                <Trophy className="size-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-display text-sm font-medium text-foreground">
                    {achievement.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    {achievement.org}
                  </p>
                </div>
              </div>
            </Reveal>

            <ul className="mt-10 border-t border-border">
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

          {/* Message form — composes an email, no backend required */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="noise relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-8"
            >
              <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="relative">
                <p className="label text-accent">Send a message</p>

                <div className="mt-6 space-y-5">
                  <label className="block">
                    <span className="label text-muted-foreground">Name</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm text-foreground outline-none transition-colors focus:border-accent"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <span className="label text-muted-foreground">Email</span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm text-foreground outline-none transition-colors focus:border-accent"
                      placeholder="you@company.com"
                    />
                  </label>

                  <label className="block">
                    <span className="label text-muted-foreground">Message</span>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-2 w-full resize-none border-b border-border bg-transparent pb-2 text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent"
                      placeholder="What are you building?"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  data-cursor="SEND"
                  className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-accent px-6 font-mono text-[11px] tracking-[0.18em] text-accent uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Send message
                  <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
