import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { ParticleField } from "@/components/pixi/ParticleField";
import { InteractiveGrid } from "@/components/pixi/InteractiveGrid";
import { SpriteOrbit } from "@/components/pixi/SpriteOrbit";
import { WaveField } from "@/components/pixi/WaveField";

function Experiment({
  id,
  title,
  note,
  stack,
  wide,
  tall,
  children,
}: {
  id: string;
  title: string;
  note: string;
  stack: string;
  wide?: boolean;
  tall?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal
      as="li"
      className={`${wide ? "lg:col-span-2" : ""} ${tall ? "lg:row-span-2" : ""}`}
    >
      <figure
        data-cursor="EXPLORE"
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-500 hover:border-accent/40"
      >
        <div className={`relative overflow-hidden ${tall ? "flex-1 min-h-64" : "h-52 sm:h-56"}`}>
          {children}
          <span className="pointer-events-none absolute top-4 left-4 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
            {id}
          </span>
        </div>
        <figcaption className="border-t border-border p-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-base font-medium text-foreground">{title}</h3>
            <span className="font-mono text-[10px] text-muted-foreground">{stack}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

function CursorLab() {
  const [state, setState] = useState("idle");
  const targets = [
    { label: "Project", cursor: "VIEW" },
    { label: "Experiment", cursor: "EXPLORE" },
    { label: "Link", cursor: "OPEN" },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 bg-background">
      <div className="grid-texture absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative flex flex-wrap justify-center gap-2">
        {targets.map((t) => (
          <button
            key={t.label}
            type="button"
            data-cursor={t.cursor}
            onPointerEnter={() => setState(t.cursor)}
            onPointerLeave={() => setState("idle")}
            onFocus={() => setState(t.cursor)}
            onBlur={() => setState("idle")}
            className="min-h-11 rounded-full border border-border px-4 font-mono text-[11px] tracking-[0.16em] text-foreground/85 uppercase transition-colors hover:border-accent hover:text-accent"
          >
            {t.label}
          </button>
        ))}
      </div>
      <p
        className="relative font-mono text-xs tracking-[0.24em] text-accent uppercase"
        aria-live="polite"
      >
        cursor → {state}
      </p>
    </div>
  );
}

function ParallaxLab() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [p, setP] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setP({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const layers = [
    { depth: 6, cls: "size-44 rounded-2xl border border-border" },
    { depth: 16, cls: "size-28 rounded-xl border border-accent/25 bg-accent/5" },
    { depth: 32, cls: "size-14 rounded-lg bg-accent/70" },
  ];

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setP({ x: 0, y: 0 })}
      className="relative h-full overflow-hidden bg-background"
    >
      <div className="grid-texture absolute inset-0" aria-hidden="true" />
      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(-50%, -50%) translate3d(${p.x * l.depth * -3}px, ${p.y * l.depth * -3}px, 0)`,
          }}
        >
          <div className={l.cls} />
        </div>
      ))}
    </div>
  );
}

export function Lab() {
  return (
    <section id="lab" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Interactive lab"
          title="Interactive lab — run it, don't read it."
          lead="Five lightweight experiments rendered with PixiJS and pointer maths. Each one pauses when it scrolls off-screen and falls back to a static frame under reduced motion."
        />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Experiment
            id="01 — Particle system"
            title="Particle system"
            note="Nodes drift, link to their neighbours and lean toward the pointer."
            stack="PixiJS"
            tall
          >
            <ParticleField className="absolute inset-0" density={0.00018} linkDistance={104} />
          </Experiment>

          <Experiment
            id="02 — Parallax"
            title="Parallax layers"
            note="Three layers translate at different rates from pointer position and depth."
            stack="CSS / Pointer"
          >
            <ParallaxLab />
          </Experiment>

          <Experiment
            id="03 — Sprite animation"
            title="Sprite animation"
            note="A procedural sprite orbiting with a fading trail and a secondary body."
            stack="PixiJS"
          >
            <SpriteOrbit className="absolute inset-0" />
          </Experiment>

          <Experiment
            id="04 — Interactive grid"
            title="Interactive grid"
            note="A dot grid that displaces and brightens around the pointer, redrawn each frame."
            stack="PixiJS"
          >
            <InteractiveGrid className="absolute inset-0" />
          </Experiment>

          <Experiment
            id="05 — WebGL wave"
            title="WebGL wave field"
            note="Wave lines distorted by pointer proximity, drawn through a single graphics pass."
            stack="PixiJS / WebGL"
          >
            <WaveField className="absolute inset-0" />
          </Experiment>

          <Experiment
            id="06 — Cursor states"
            title="Interactive cursor"
            note="Cursor state changes with the element under the pointer — VIEW, EXPLORE, OPEN."
            stack="React"
          >
            <CursorLab />
          </Experiment>
        </ul>
      </div>
    </section>
  );
}
