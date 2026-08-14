import { Graphics } from "pixi.js";
import { usePixiScene, prefersReducedMotion } from "@/lib/pixi";

/** A dot grid that swells and brightens around the pointer. */
export function InteractiveGrid({ className }: { className?: string }) {
  const hostRef = usePixiScene((app, host) => {
    const reduce = prefersReducedMotion();
    const g = new Graphics();
    app.stage.addChild(g);

    const step = window.innerWidth < 768 ? 26 : 22;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const draw = () => {
      g.clear();
      const radius = 110;
      for (let x = step / 2; x < app.screen.width; x += step) {
        for (let y = step / 2; y < app.screen.height; y += step) {
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          const t = Math.max(0, 1 - d / radius);
          const size = 1 + t * 3.4;
          const dx = d > 0.01 ? ((x - pointer.x) / d) * t * 6 : 0;
          const dy = d > 0.01 ? ((y - pointer.y) / d) * t * 6 : 0;
          g.circle(x + dx, y + dy, size).fill({
            color: t > 0.35 ? 0x5eead4 : 0x94a3b8,
            alpha: 0.2 + t * 0.7,
          });
        }
      }
    };

    if (reduce) {
      draw();
      app.ticker.stop();
    } else {
      app.ticker.add(() => {
        pointer.x += (pointer.tx - pointer.x) * 0.16;
        pointer.y += (pointer.ty - pointer.y) * 0.16;
        draw();
      });
    }

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  });

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
