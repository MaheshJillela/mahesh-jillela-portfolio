import { motion, useReducedMotion } from "framer-motion";
import {
  Bone,
  Brush,
  Bug,
  Coins,
  Cpu,
  Dice5,
  Download,
  Film,
  Gauge,
  LayoutDashboard,
  Monitor,
  Smartphone,
  Sparkles,
  TrendingUp,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { gamingExperience } from "@/data/resume";

const ICONS: Record<string, LucideIcon> = {
  dice: Dice5,
  trending: TrendingUp,
  zap: Zap,
  layout: LayoutDashboard,
  sparkles: Sparkles,
  coins: Coins,
  smartphone: Smartphone,
  film: Film,
  bone: Bone,
  cpu: Cpu,
  download: Download,
  gauge: Gauge,
  monitor: Monitor,
  workflow: Workflow,
  brush: Brush,
  bug: Bug,
};

export function GamingExperience() {
  const reduce = useReducedMotion();

  return (
    <section id="gaming" className="relative overflow-hidden py-28 sm:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,var(--accent-soft),transparent_45%)]"
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="flex items-center gap-5">
          <span className="font-mono text-[10px] text-accent">05</span>
          <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
            Gaming experience
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <h2 className="font-editorial text-5xl leading-[0.94] text-foreground sm:text-7xl">
            Building interactive
            <br />
            <em className="text-accent">casino experiences.</em>
          </h2>
          <p className="max-w-md border-l border-accent/50 pl-5 text-sm leading-relaxed text-muted-foreground">
            {gamingExperience.lead}
          </p>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {gamingExperience.cards.map((card, i) => {
            const Icon = ICONS[card.icon] ?? Sparkles;
            return (
              <Reveal
                as="li"
                key={card.title}
                delay={(i % 8) * 0.03}
                className="group relative bg-background p-6 transition-colors duration-500 hover:bg-surface"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 20% 0%, var(--accent-soft), transparent 70%)",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <motion.span
                    className="inline-flex size-10 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent"
                    whileHover={reduce ? {} : { rotate: -6, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </motion.span>
                  <span className="font-mono text-[9px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="relative mt-5 font-display text-base leading-snug text-foreground">
                  {card.title}
                </p>
                <p className="relative mt-2 text-[13px] leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground/80">
                  {card.body}
                </p>
                <span
                  aria-hidden="true"
                  className="relative mt-5 block h-px w-8 bg-accent/40 transition-all duration-500 group-hover:w-full group-hover:bg-accent"
                />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
