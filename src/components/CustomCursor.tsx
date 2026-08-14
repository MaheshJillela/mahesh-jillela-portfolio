import { useEffect, useState } from "react";

/**
 * Desktop-only custom cursor. Elements opt in with data-cursor="VIEW" etc.
 * Disabled for touch/coarse pointers and for reduced-motion users.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);

    let raf = 0;
    let next = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      next = { x: e.clientX, y: e.clientY };
      setVisible(true);
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          setPos(next);
        });
      }
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const attr = el?.getAttribute("data-cursor") ?? null;
      setLabel((prev) => (prev === attr ? prev : attr));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 200ms ease",
      }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70 bg-accent/15 backdrop-blur-[2px] transition-all duration-200 ease-out"
        style={
          label
            ? { width: 68, height: 68 }
            : { width: 12, height: 12, backgroundColor: "oklch(0.85 0.13 180 / 0.9)" }
        }
      >
        {label ? (
          <span className="flex h-full w-full items-center justify-center font-mono text-[10px] tracking-[0.18em] text-accent">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
