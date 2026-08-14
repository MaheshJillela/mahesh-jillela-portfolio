import { Container, Graphics } from "pixi.js";
import { usePixiScene, prefersReducedMotion } from "@/lib/pixi";

/** A small procedural sprite animation: an orbiting body with a fading trail. */
export function SpriteOrbit({ className }: { className?: string }) {
  const hostRef = usePixiScene((app) => {
    const reduce = prefersReducedMotion();
    const root = new Container();
    app.stage.addChild(root);

    const ring = new Graphics();
    root.addChild(ring);

    const trail: Graphics[] = [];
    for (let i = 0; i < 14; i++) {
      const t = new Graphics()
        .circle(0, 0, 5 - i * 0.3)
        .fill({ color: 0x5eead4, alpha: 0.35 * (1 - i / 14) });
      root.addChild(t);
      trail.push(t);
    }

    const sprite = new Container();
    sprite.addChild(new Graphics().circle(0, 0, 13).fill({ color: 0x5eead4, alpha: 0.16 }));
    sprite.addChild(new Graphics().circle(0, 0, 6).fill({ color: 0x99f6e4 }));
    root.addChild(sprite);

    const moon = new Graphics().circle(0, 0, 3).fill({ color: 0xdbeafe, alpha: 0.9 });
    root.addChild(moon);

    let t = 0;
    const layout = () => {
      const cx = app.screen.width / 2;
      const cy = app.screen.height / 2;
      const rx = Math.min(app.screen.width, app.screen.height) * 0.3;
      return { cx, cy, rx };
    };

    const frame = () => {
      const { cx, cy, rx } = layout();
      ring.clear().ellipse(cx, cy, rx, rx * 0.42).stroke({ color: 0x64748b, alpha: 0.35, width: 1 });

      const x = cx + Math.cos(t) * rx;
      const y = cy + Math.sin(t) * rx * 0.42;
      for (let i = trail.length - 1; i > 0; i--) {
        trail[i]!.x = trail[i - 1]!.x;
        trail[i]!.y = trail[i - 1]!.y;
      }
      trail[0]!.x = x;
      trail[0]!.y = y;
      sprite.x = x;
      sprite.y = y;
      sprite.scale.set(0.85 + Math.sin(t * 2) * 0.12);
      moon.x = x + Math.cos(t * 4) * 20;
      moon.y = y + Math.sin(t * 4) * 20;
    };

    if (reduce) {
      t = 0.6;
      frame();
      app.ticker.stop();
      return;
    }

    app.ticker.add((ticker) => {
      t += 0.012 * Math.min(ticker.deltaTime, 2);
      frame();
    });
  });

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
