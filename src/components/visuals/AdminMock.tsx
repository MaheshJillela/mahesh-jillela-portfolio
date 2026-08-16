import { useState } from "react";
import { motion } from "framer-motion";
import { luvis } from "@/data/resume";

export function AdminMock() {
  const [active, setActive] = useState(luvis.adminModules[0]!.label);
  const current = luvis.adminModules.find((m) => m.label === active)!;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      {/* chrome */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-border-strong" />
          ))}
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          admin · illustrative mock
        </span>
      </div>

      <div className="grid sm:grid-cols-[11rem_1fr]">
        {/* sidebar */}
        <ul className="border-b border-border p-2 sm:border-r sm:border-b-0">
          {luvis.adminModules.map((m) => (
            <li key={m.label}>
              <button
                type="button"
                onClick={() => setActive(m.label)}
                className={`w-full rounded-md px-3 py-2 text-left font-mono text-[10px] tracking-[0.12em] uppercase transition-colors ${
                  active === m.label
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
              </button>
            </li>
          ))}
        </ul>

        {/* panel */}
        <div className="min-h-[15rem] p-5">
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-display text-xl font-medium text-foreground">{current.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{current.note}</p>

            <div className="mt-5 space-y-2">
              {[0, 1, 2, 3].map((r) => (
                <div
                  key={r}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-border bg-background/60 px-3 py-2.5"
                >
                  <span className="h-2.5 rounded bg-border" style={{ width: `${70 - r * 12}%` }} />
                  <span className="font-mono text-[10px] text-muted-foreground/70">record</span>
                </div>
              ))}
            </div>

            <p className="mt-5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground/70 uppercase">
              Placeholder data — module names only, no production records shown.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
