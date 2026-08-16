import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { FlowChain } from "@/components/visuals/FlowChain";
import { LuvisArchitecture } from "@/components/visuals/LuvisArchitecture";
import { AdminMock } from "@/components/visuals/AdminMock";
import { LogTerminal } from "@/components/visuals/LogTerminal";
import { luvis } from "@/data/resume";

function Block({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="mt-24 border-t border-border pt-14 sm:mt-32">
      <Reveal>
        <p className="label text-accent">{eyebrow}</p>
        <h3 className="mt-4 max-w-3xl font-display text-2xl font-medium text-foreground sm:text-4xl">
          {title}
        </h3>
        {lead ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{lead}</p>
        ) : null}
      </Reveal>
      <div className="mt-10">{children}</div>
    </div>
  );
}

function Bullets({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-px overflow-hidden rounded-xl border border-border bg-border ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((i) => (
        <li
          key={i}
          className="bg-background px-4 py-3.5 text-sm text-foreground/85 transition-colors hover:bg-surface hover:text-foreground"
        >
          {i}
        </li>
      ))}
    </ul>
  );
}

function RedisFlow() {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-6">
      <FlowChain steps={["Request", "Backend", "Redis"]} compact packet={false} />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border border-accent/50 bg-accent/10 p-4"
        >
          <p className="font-mono text-[10px] tracking-[0.14em] text-accent uppercase">Cache hit</p>
          <p className="mt-2 text-sm text-foreground/85">Response returned immediately from Redis.</p>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border border-border bg-background/60 p-4"
        >
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            Cache miss
          </p>
          <p className="mt-2 text-sm text-foreground/85">
            Database → value written back to Redis → response.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function LuvisCase() {
  return (
    <section id="luvis" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Case study — the only project"
          title="Luvis"
          lead={luvis.lead}
        />

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-accent/50 bg-accent/10 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
              {luvis.subtitle}
            </span>
            <a
              data-cursor="OPEN"
              href={luvis.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-[10px] tracking-[0.16em] text-accent-foreground uppercase transition-transform hover:-translate-y-0.5"
            >
              Visit {luvis.urlLabel}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        {/* Ecosystem */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {luvis.subsystems.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.03} className="group bg-background p-5">
              <p className="font-mono text-[10px] text-accent/70">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-display text-base leading-snug font-medium text-foreground">
                {s.label}
              </p>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted-foreground">{s.note}</p>
            </Reveal>
          ))}
        </div>

        {/* My role */}
        <Block
          eyebrow="What I worked on"
          title="Frontend was my core contribution — Luvis gave me the rest of the stack."
        >
          <div className="grid gap-6 lg:grid-cols-4">
            {luvis.role.map((r, i) => (
              <Reveal key={r.group} delay={i * 0.05}>
                <div
                  className={`h-full rounded-xl border p-5 ${
                    r.primary ? "border-accent/50 bg-accent/5" : "border-border bg-surface/50"
                  }`}
                >
                  <p
                    className={`font-mono text-[10px] tracking-[0.16em] uppercase ${
                      r.primary ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {r.group}
                    {r.primary ? " · core" : ""}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {r.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <span
                          aria-hidden="true"
                          className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent/60"
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        {/* Architecture */}
        <Block
          eyebrow="Architecture"
          title="How the pieces actually connect."
          lead="Interfaces and admin talk to the same API. Node.js coordinates cache, database, payments and notifications, all running on the server with logging behind it."
        >
          <LuvisArchitecture />
        </Block>

        {/* Admin */}
        <Block
          eyebrow="Admin panel"
          title="An application ecosystem, not a frontend website."
          lead="The admin side gives an operational view over the same systems the player-facing app uses. Modules shown are conceptual placeholders."
        >
          <AdminMock />
        </Block>

        {/* Notifications */}
        <Block
          eyebrow="Push notifications"
          title="From a system event to a device."
          lead="Provider not named — to confirm before publishing."
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="rounded-xl border border-border bg-surface/60 p-6">
                <FlowChain steps={luvis.notificationFlow} compact />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <Bullets items={luvis.notificationWork} />
            </Reveal>
          </div>
        </Block>

        {/* Payments */}
        <Block
          eyebrow="Payment system"
          title="Money moves through more layers than a button."
          lead="Gateway name intentionally not stated — to confirm before publishing."
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="rounded-xl border border-border bg-surface/60 p-6">
                <FlowChain steps={luvis.paymentFlow} compact />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <Bullets items={luvis.paymentWork} />
            </Reveal>
          </div>
        </Block>

        {/* Redis */}
        <Block
          eyebrow="Redis"
          title="Making frequently accessed data faster."
          lead="Caching exists so the same data is not fetched from the database over and over. The cache is checked first; a miss falls through to the database and warms the cache."
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <RedisFlow />
            </Reveal>
            <Reveal delay={0.06}>
              <Bullets items={luvis.redisWork} columns={1} />
            </Reveal>
          </div>
        </Block>

        {/* Database */}
        <Block
          eyebrow="Database"
          title="Data behind the application."
          lead="Engine name to confirm before publishing."
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="rounded-xl border border-border bg-surface/60 p-6">
                <FlowChain steps={["Frontend", "API", "Node.js", "Database"]} compact />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <Bullets items={luvis.databaseWork} />
            </Reveal>
          </div>
        </Block>

        {/* Mailing */}
        <Block
          eyebrow="Mailing"
          title="Server-side mailing."
          lead="Mail provider / SMTP details to confirm before publishing."
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="rounded-xl border border-border bg-surface/60 p-6">
                <FlowChain steps={luvis.mailFlow} compact />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <Bullets items={luvis.mailWork} />
            </Reveal>
          </div>
        </Block>

        {/* Logging */}
        <Block
          eyebrow="Logging"
          title="Logs are how I find out what really happened."
        >
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <LogTerminal />
            </Reveal>
            <Reveal delay={0.06}>
              <Bullets items={luvis.loggingWork} columns={1} />
            </Reveal>
          </div>
        </Block>

        {/* Deployment */}
        <Block
          eyebrow="Production deployment"
          title="From localhost to production."
          lead="The part that makes it real: a build, a server, a live process and a domain users can reach."
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="rounded-xl border border-border bg-surface/60 p-6">
                <FlowChain steps={luvis.deployFlow} compact />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <Bullets items={luvis.deployWork} />
            </Reveal>
          </div>
        </Block>

        {/* Placeholders to confirm */}
        <Reveal delay={0.05}>
          <div className="mt-16 rounded-xl border border-dashed border-border-strong p-5">
            <p className="label text-muted-foreground">To confirm before publishing</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {luvis.placeholders.map((p) => (
                <li key={p.k} className="rounded-lg border border-border bg-surface/50 px-4 py-3">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {p.k}
                  </p>
                  <p className="mt-1 text-sm text-foreground/70">{p.v}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
