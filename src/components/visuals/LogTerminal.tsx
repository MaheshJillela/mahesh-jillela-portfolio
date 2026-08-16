import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { demoLogs, logFilters } from "@/data/resume";

function stamp(i: number) {
  const base = new Date(Date.UTC(2026, 0, 1, 9, 12, 0));
  base.setUTCSeconds(base.getUTCSeconds() + i * 3);
  return base.toISOString().slice(11, 19);
}

export function LogTerminal() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("ALL");
  const [count, setCount] = useState(reduce ? demoLogs.length : 1);
  const bodyRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(
    () => (filter === "ALL" ? demoLogs : demoLogs.filter((l) => l.tag === filter)),
    [filter],
  );

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setCount((c) => (c >= demoLogs.length ? 1 : c + 1));
    }, 900);
    return () => clearInterval(t);
  }, [reduce]);

  const visible = rows.slice(0, filter === "ALL" ? count : rows.length);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[oklch(0.16_0.01_200)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <span className="font-mono text-[10px] tracking-[0.14em] text-accent uppercase">
          logs — demo
        </span>
        <span className="ml-auto flex flex-wrap gap-1.5">
          {logFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] uppercase transition-colors ${
                filter === f
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </span>
      </div>

      <div ref={bodyRef} className="max-h-[19rem] overflow-auto p-4 font-mono text-[11px] leading-relaxed">
        {visible.length === 0 ? (
          <p className="text-muted-foreground">no entries for this filter</p>
        ) : (
          <ul className="space-y-1.5">
            {visible.map((l, i) => (
              <li key={`${l.msg}-${i}`} className="flex flex-wrap gap-x-3">
                <span className="text-muted-foreground/60">{stamp(i)}</span>
                <span className={l.level === "ERROR" ? "text-destructive" : "text-accent"}>
                  [{l.level}]
                </span>
                <span className="text-muted-foreground/80">{l.tag.toLowerCase()}</span>
                <span className="text-foreground/85">{l.msg}</span>
              </li>
            ))}
            {!reduce ? <li className="text-accent">▍</li> : null}
          </ul>
        )}
      </div>

      <p className="border-t border-border px-4 py-3 font-mono text-[9px] tracking-[0.14em] text-muted-foreground/70 uppercase">
        Illustrative log lines for demonstration — not actual production logs.
      </p>
    </div>
  );
}
