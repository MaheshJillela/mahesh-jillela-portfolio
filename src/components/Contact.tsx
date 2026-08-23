import { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, Send } from "lucide-react";
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

        <h2 className="mt-8 max-w-5xl font-editorial text-[15vw] leading-[0.88] font-normal text-foreground sm:mt-10 sm:text-[7rem]">
          <LineReveal text="LET'S BUILD INTERACTIVE EXPERIENCES." />
        </h2>


        <div className="mt-10 grid gap-10 sm:mt-16 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div>
            <Reveal delay={0.08}>
              <p className="max-w-lg font-display text-lg leading-snug text-foreground/90 sm:text-xl">
                Open to front-end game development and interactive UI opportunities.
              </p>
              <a
                data-cursor="OPEN"
                href={`mailto:${profile.email}`}
                 className="group mt-8 inline-flex min-h-12 max-w-full items-center gap-3 border-b border-accent pb-2 font-mono text-[10px] tracking-[0.14em] text-accent uppercase transition-transform duration-300 hover:translate-x-1 sm:text-[11px] sm:tracking-[0.18em]"
              >
                <span className="truncate">{profile.email}</span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>

            <ul className="mt-10 border-t border-border">
              {channels.map((c, i) => (
                <Reveal as="li" key={c.label} delay={i * 0.05} className="border-b border-border">
                  <a
                    data-cursor="OPEN"
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-5 sm:grid-cols-[auto_auto_minmax(0,1fr)_auto] sm:gap-5"
                  >
                    <c.Icon className="col-start-1 row-span-2 row-start-1 size-4 shrink-0 text-accent sm:row-span-1" aria-hidden="true" />
                    <span className="col-start-2 row-start-1 label text-muted-foreground sm:w-24 sm:shrink-0">
                      {c.label}
                    </span>
                    <span className="col-start-2 row-start-2 min-w-0 truncate text-sm text-foreground transition-transform duration-300 group-hover:translate-x-1 sm:col-start-3 sm:row-start-1">
                      {c.value}
                    </span>
                    <ArrowUpRight
                      className="col-start-3 row-span-2 row-start-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent sm:col-start-4 sm:row-span-1"
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
               className="relative border-y border-border py-8"
            >
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
