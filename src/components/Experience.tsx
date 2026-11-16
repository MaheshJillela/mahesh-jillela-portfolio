import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, RotateCcw } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { education, achievement, experience, pixoma, luvis } from "@/data/resume";

const job = experience[0]!;
const checkpoints = [
  {
    year: "2021–2025",
    label: "Learning",
    title: education.degree,
    source: education.school,
    skills: ["Computer science", "Frontend", "Interactive graphics"],
    detail: "Computer science foundation alongside self-directed frontend and graphics work.",
    x: 70,
    y: 330,
  },
  {
    year: "2024",
    label: "Build under pressure",
    title: achievement.title,
    source: achievement.org,
    skills: ["Working prototype", "Problem solving", "Team delivery"],
    detail: "Recognised for building a working solution under time constraints.",
    x: 260,
    y: 310,
  },
  {
    year: "Jun 2025",
    label: "Game engineering",
    title: job.role,
    source: job.company,
    skills: ["PixiJS", "Spine", "TypeScript"],
    detail: job.points[0],
    x: 450,
    y: 260,
  },
  {
    year: "2025",
    label: "Tools + systems",
    title: "Pixoma + Luvis",
    source: "Developer tooling / application integration",
    skills: ["Asset previews", "React", "APIs"],
    detail:
      "Pixoma brings asset inspection and animation preview into one workflow. Luvis connects game interfaces with application services.",
    x: 640,
    y: 175,
  },
  {
    year: "Present",
    label: "Production",
    title: "From first frame to live gameplay",
    source: job.company,
    skills: ["Partner lobby launches", "GA4 analytics", "Performance"],
    detail: job.production,
    x: 830,
    y: 65,
  },
];
const curve = "M70 330 C145 330 200 325 260 310 S390 290 450 260 S580 215 640 175 S770 105 830 65";

export function Experience() {
  const [active, setActive] = useState(4);
  const [replay, setReplay] = useState(0);
  const reduce = useReducedMotion();
  const point = checkpoints[active]!;
  return (
    <section id="experience" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-36">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex items-center gap-5">
          <span className="label text-accent">05 / Experience</span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-[10px] text-muted-foreground">{job.period}</span>
        </div>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-editorial text-5xl leading-[.95] sm:text-7xl">
            Learning becomes
            <br />
            <em className="text-accent">live gameplay.</em>
          </h2>
          <button
            type="button"
            onClick={() => {
              setActive(4);
              setReplay((value) => value + 1);
            }}
            className="inline-flex min-h-12 items-center gap-3 rounded-full border border-accent/50 px-5 text-xs text-accent"
          >
            <Play className="size-4" aria-hidden="true" />
            Replay the climb
          </button>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface/40">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 font-mono text-[10px] tracking-wider">
            <span className="text-accent">CAREER TRAJECTORY</span>
            <span className="text-muted-foreground">SELECT A POINT OR SCRUB THE JOURNEY</span>
          </div>
          <div className="relative px-2 pt-6 sm:px-8">
            <svg
              viewBox="0 0 900 400"
              className="block w-full"
              role="group"
              aria-label={`Career progression from learning to production. Selected milestone: ${point.label}.`}
            >
              <defs>
                <clipPath id="career-progress">
                  <motion.rect
                    key={replay}
                    x="0"
                    y="0"
                    height="400"
                    initial={reduce ? false : { width: 70 }}
                    animate={{ width: point.x }}
                    transition={{ duration: reduce ? 0 : 1.5, ease: "easeInOut" }}
                  />
                </clipPath>
                <linearGradient id="career-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="var(--accent)" stopOpacity=".18" />
                  <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[80, 160, 240, 320].map((y) => (
                <line
                  key={y}
                  x1="50"
                  x2="860"
                  y1={y}
                  y2={y}
                  stroke="var(--border)"
                  strokeDasharray="3 8"
                />
              ))}
              <path d={`${curve} L830 355 L70 355 Z`} fill="url(#career-fill)" />
              <path d={curve} fill="none" stroke="var(--border-strong)" strokeWidth="3" />
              <path
                d={curve}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="4"
                clipPath="url(#career-progress)"
              />
              {checkpoints.map((item, i) => (
                <g key={item.label}>
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r={i === active ? 13 : 6}
                    fill={i <= active ? "var(--accent)" : "var(--surface)"}
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                  <foreignObject x={item.x - 22} y={item.y - 22} width="44" height="44">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Select ${item.label} milestone`}
                      aria-pressed={active === i}
                      className="h-full w-full cursor-pointer rounded-full"
                    />
                  </foreignObject>
                  <text
                    x={item.x}
                    y="382"
                    textAnchor="middle"
                    fill="var(--muted-foreground)"
                    fontSize="14"
                    className="hidden sm:block"
                    fontFamily="var(--font-mono)"
                  >
                    {item.year}
                  </text>
                </g>
              ))}
              <motion.g
                key={replay}
                initial={reduce ? false : { x: 70, y: 330 }}
                style={{ pointerEvents: "none" }}
                animate={{ x: point.x, y: point.y }}
                transition={{ duration: reduce ? 0 : 1.5, ease: "easeInOut" }}
              >
                <path d="M-9 -20 L17 -20 L0 -34 Z" fill="var(--accent)" />
                <text
                  x="0"
                  y="-46"
                  textAnchor="middle"
                  fill="var(--accent)"
                  fontSize="13"
                  fontFamily="var(--font-mono)"
                >
                  MJ
                </text>
              </motion.g>
            </svg>
          </div>
          <div className="px-5 pb-5 sm:px-10">
            <label className="sr-only" htmlFor="career-position">
              Career milestone
            </label>
            <input
              id="career-position"
              type="range"
              min="0"
              max="4"
              step="1"
              value={active}
              aria-valuetext={`${point.year}, ${point.label}`}
              onChange={(event) => setActive(Number(event.target.value))}
              className="h-11 w-full cursor-pointer accent-accent"
            />
            <div
              className="grid grid-cols-2 gap-2 sm:grid-cols-5"
              role="group"
              aria-label="Career milestones"
            >
              {checkpoints.map((item, i) => (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`min-h-14 rounded-xl border px-3 py-3 text-left text-xs transition-colors ${active === i ? "border-accent/50 bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground"}`}
                >
                  <span className="mb-1 block font-mono text-[10px] opacity-70">{item.year}</span>
                  {item.label}
                </button>
              ))}
            </div>
            <div
              className="mt-6 grid gap-6 border-t border-border pt-6 sm:grid-cols-[1fr_1fr]"
              aria-live="polite"
            >
              <div>
                <p className="font-mono text-[10px] text-accent">{point.year}</p>
                <h3 className="mt-2 text-xl">{point.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{point.source}</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {point.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs"
                    >
                      <span className="size-1.5 rounded-full bg-accent" />
                      {skill}
                    </span>
                  ))}
                </div>
                <details className="mt-3 text-xs text-muted-foreground">
                  <summary className="cursor-pointer py-3">View work behind this stage</summary>
                  <p className="max-w-lg leading-relaxed">{point.detail}</p>
                  {active === 3 && (
                    <div className="mt-3 flex gap-5">
                      <a
                        href={pixoma.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent"
                      >
                        Pixoma ↗
                      </a>
                      <a
                        href={luvis.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent"
                      >
                        Luvis ↗
                      </a>
                    </div>
                  )}
                </details>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4 text-[10px] text-muted-foreground">
              <span>Conceptual scope of work · curve height illustrates growth</span>
              <button
                type="button"
                onClick={() => setActive(0)}
                className="inline-flex min-h-11 items-center gap-2 text-accent"
              >
                <RotateCcw className="size-3" />
                Back to learning <ArrowRight className="size-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
