import { Reveal, SectionHeading } from "@/components/Reveal";
import { skills } from "@/data/resume";

const dots: Record<string, number> = {
  "Production Experience": 5,
  Advanced: 4,
  "Working Knowledge": 3,
};

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Skills"
          title="Grouped by what it's actually used for."
          lead="Levels describe how the technology has been used — production work, advanced use, or working knowledge — instead of arbitrary percentages."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => (
            <Reveal
              as="li"
              key={group.group}
              delay={gi * 0.06}
              className="rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-accent/40"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-medium text-foreground">{group.group}</h3>
                <span aria-hidden="true" className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={
                        i < (dots[group.level] ?? 3)
                          ? "size-1.5 rounded-full bg-accent"
                          : "size-1.5 rounded-full bg-border"
                      }
                    />
                  ))}
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {group.level}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs text-foreground/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
