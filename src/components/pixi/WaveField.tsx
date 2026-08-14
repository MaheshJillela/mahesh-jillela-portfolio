import { Graphics } from "pixi.js";
import { usePixiScene, prefersReducedMotion } from "@/lib/pixi";

/**
 * WebGL line-wave field. Horizontal wave lines distort around the pointer,
 * rendered each frame through a single Pixi Graphics object.
 */
export function WaveField({ className }: { className?: string }) {
  const hostRef = usePixiScene((app, host) => {
    const reduce = prefersReducedMotion();
    const g = new Graphics();
    app.stage.addChild(g);

    const pointer = { x: -9999, y: -9999, active: false };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    let time = 0;

    const draw = () => {
      const w = app.screen.width;
      const h = app.screen.height;
      const rows = Math.max(8, Math.min(18, Math.round(h / 16)));
      const stepX = Math.max(10, w / 46);
      g.clear();

      for (let r = 0; r < rows; r++) {
        const baseY = ((r + 1) / (rows + 1)) * h;
        let first = true;
        for (let x = 0; x <= w; x += stepX) {
          let y = baseY + Math.sin(x * 0.018 + time + r * 0.35) * 5;

          if (pointer.active) {
            const dx = x - pointer.x;
            const dy = baseY - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 130) {
              const push = (1 - dist / 130) ** 2 * 34;
              y -= (dy / (dist || 1)) * -push;
            }
          }

          if (first) {
            g.moveTo(x, y);
            first = false;
          } else {
            g.lineTo(x, y);
          }
        }
        const alpha = 0.1 + (r / rows) * 0.22;
        g.stroke({ color: 0x5eead4, alpha, width: 1 });
      }
    };

    if (reduce) {
      draw();
      app.ticker.stop();
      return () => {
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
      };
    }

    app.ticker.maxFPS = 40;
    app.ticker.add((ticker) => {
      time += 0.018 * Math.min(ticker.deltaTime, 2);
      draw();
    });

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  });

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
