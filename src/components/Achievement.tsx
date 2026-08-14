import { Trophy } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { achievement } from "@/data/resume";

export function Achievement() {
  return (
    <section id="achievement" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-fade absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label text-muted-foreground">Achievement</span>
            <span aria-hidden="true" className="rule-x flex-1" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-14">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/5">
              <Trophy className="size-8 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-[8vw] leading-[1.05] font-medium tracking-[-0.02em] text-foreground sm:text-5xl">
                {achievement.title}
              </h2>
              <p className="mt-4 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                {achievement.org}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
