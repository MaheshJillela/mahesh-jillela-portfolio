import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { ParticleField } from "@/components/pixi/ParticleField";
import { InteractiveGrid } from "@/components/pixi/InteractiveGrid";
import { SpriteOrbit } from "@/components/pixi/SpriteOrbit";

function LabCard({
  id,
  title,
  note,
  children,
  span,
}: {
  id: string;
  title: string;
  note: string;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <Reveal as="li" className={span ? "sm:col-span-2" : ""}>

      <figure
        data-cursor="EXPLORE"
        className="group h-full overflow-hidden rounded-3xl border border-border/70 bg-card/40 transition-colors hover:border-accent/40"
      >
        <div className="relative h-56 overflow-hidden border-b border-border/60 sm:h-64">
          {children}
        </div>
        <figcaption className="p-5">
          <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
            Experiment {id}
          </p>
          <h3 className="mt-2 text-base font-medium text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

function CursorStates() {
  const [state, setState] = useState<string>("idle");
  const targets = [
    { key: "project", label: "Project", cursor: "VIEW" },
    { key: "experiment", label: "Experiment", cursor: "EXPLORE" },
    { key: "link", label: "Link", cursor: "OPEN" },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(60%_60%_at_50%_40%,oklch(0.45_0.08_200/0.18),transparent_70%)]">
      <div className="flex flex-wrap justify-center gap-2">
        {targets.map((t) => (
          <button
            key={t.key}
            type="button"
            data-cursor={t.cursor}
            onPointerEnter={() => setState(t.cursor)}
            onPointerLeave={() => setState("idle")}
            onFocus={() => setState(t.cursor)}
            onBlur={() => setState("idle")}
            className="min-h-11 rounded-full border border-border/70 bg-secondary/40 px-4 font-mono text-[11px] tracking-[0.16em] text-foreground/85 uppercase transition-colors hover:border-accent/50 hover:text-accent"
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="font-mono text-xs tracking-[0.24em] text-accent uppercase" aria-live="polite">
        cursor → {state}
      </p>
    </div>
  );
}

function ParallaxLayers() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [p, setP] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setP({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const layers = [
    { depth: 8, size: "size-40", color: "oklch(0.55 0.12 265 / 0.35)" },
    { depth: 18, size: "size-28", color: "oklch(0.7 0.13 195 / 0.35)" },
    { depth: 34, size: "size-16", color: "oklch(0.88 0.11 180 / 0.5)" },
  ];

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setP({ x: 0, y: 0 })}
      className="relative h-full overflow-hidden"
    >
      <div className="grid-texture absolute inset-0" />
      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(-50%, -50%) translate3d(${p.x * l.depth * -3}px, ${p.y * l.depth * -3}px, 0)`,
          }}
        >
          <div
            className={`${l.size} rounded-3xl border border-border/60`}
            style={{ backgroundColor: l.color }}
          />
        </div>
      ))}
    </div>
  );
}

export function Lab() {
  return (
    <section id="lab" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Interactive lab"
          title="Small experiments, real rendering."
          lead="Each experiment runs on PixiJS or plain pointer maths, pauses when it scrolls off-screen, and falls back to a static frame when reduced motion is requested."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          <LabCard
            id="01"
            title="Particle system"
            note="A PixiJS particle field where nodes drift, link to nearby nodes and lean toward the cursor."
          >
            <ParticleField className="absolute inset-0" density={0.00016} linkDistance={110} />
          </LabCard>

          <LabCard
            id="02"
            title="Interactive cursor"
            note="Cursor state changes with the element under the pointer — VIEW, EXPLORE, OPEN."
          >
            <CursorStates />
          </LabCard>

          <LabCard
            id="03"
            title="Parallax layers"
            note="Layered elements translate at different rates based on pointer position and depth."
          >
            <ParallaxLayers />
          </LabCard>

          <LabCard
            id="04"
            title="Sprite animation"
            note="A procedural PixiJS sprite orbiting with a fading trail and a secondary body."
          >
            <SpriteOrbit className="absolute inset-0" />
          </LabCard>

          <LabCard
            id="05"
            title="Interactive grid"
            note="A dot grid that displaces and brightens around the pointer, redrawn each frame."
            span
          >
            <InteractiveGrid className="absolute inset-0" />
          </LabCard>
        </ul>
      </div>
    </section>
  );
}
