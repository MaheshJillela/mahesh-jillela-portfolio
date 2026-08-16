import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { luvisArchitecture } from "@/data/resume";

type Pos = { id: string; x: number; y: number; w?: number };

const layout: Pos[] = [
  { id: "user", x: 50, y: 6 },
  { id: "web", x: 27, y: 22 },
  { id: "admin", x: 73, y: 22 },
  { id: "api", x: 50, y: 38 },
  { id: "node", x: 50, y: 52 },
  { id: "redis", x: 14, y: 68 },
  { id: "db", x: 38, y: 68 },
  { id: "payment", x: 62, y: 68 },
  { id: "notify", x: 87, y: 68 },
  { id: "server", x: 50, y: 84 },
  { id: "logging", x: 50, y: 95 },
];

const edges: [string, string][] = [
  ["user", "web"],
  ["user", "admin"],
  ["web", "api"],
  ["admin", "api"],
  ["api", "node"],
  ["node", "redis"],
  ["node", "db"],
  ["node", "payment"],
  ["node", "notify"],
  ["redis", "server"],
  ["db", "server"],
  ["payment", "server"],
  ["notify", "server"],
  ["server", "logging"],
];

export function LuvisArchitecture() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("node");
  const pos = (id: string) => layout.find((l) => l.id === id)!;
  const node = luvisArchitecture.nodes.find((n) => n.id === active)!;

  return (
    <div className="noise relative overflow-hidden rounded-xl border border-border bg-surface p-4 sm:p-8">
      <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative flex items-baseline justify-between">
        <p className="label text-accent">System architecture</p>
        <p className="font-mono text-[10px] text-muted-foreground">tap a node</p>
      </div>

      <div className="relative mt-6 h-[26rem] w-full sm:h-[32rem]">
        {/* edges */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {edges.map(([a, b], i) => {
            const p = pos(a);
            const q = pos(b);
            const hot = active === a || active === b;
            return (
              <motion.path
                key={`${a}-${b}`}
                d={`M ${p.x} ${p.y} C ${p.x} ${(p.y + q.y) / 2}, ${q.x} ${(p.y + q.y) / 2}, ${q.x} ${q.y}`}
                fill="none"
                stroke={hot ? "var(--accent)" : "var(--border-strong)"}
                strokeWidth={hot ? 0.45 : 0.25}
                vectorEffect="non-scaling-stroke"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.05 * i }}
              />
            );
          })}
        </svg>

        {/* nodes */}
        {luvisArchitecture.nodes.map((n, i) => {
          const p = pos(n.id);
          const isActive = active === n.id;
          return (
            <motion.button
              key={n.id}
              type="button"
              data-cursor="OPEN"
              onClick={() => setActive(n.id)}
              aria-pressed={isActive}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1.5 font-mono text-[9px] tracking-[0.12em] whitespace-nowrap uppercase transition-colors sm:px-3 sm:text-[10px] ${
                isActive
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-background text-foreground/80 hover:border-accent/60 hover:text-accent"
              }`}
            >
              {n.label}
            </motion.button>
          );
        })}
      </div>

      <div className="relative mt-4 border-t border-border pt-4">
        <p className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">{node.label}</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{node.body}</p>
      </div>
    </div>
  );
}
