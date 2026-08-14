import { Container, Graphics } from "pixi.js";
import { usePixiScene, prefersReducedMotion } from "@/lib/pixi";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number;
  g: Graphics;
};

type Props = {
  density?: number;
  linkDistance?: number;
  follow?: boolean;
  className?: string;
};

/**
 * Interactive particle / node field.
 * Particles drift, react to the pointer, and nearby nodes are linked.
 */
export function ParticleField({
  density = 0.00008,
  linkDistance = 130,
  follow = true,
  className,
}: Props) {
  const hostRef = usePixiScene((app, host) => {
    const reduce = prefersReducedMotion();
    const layer = new Container();
    const links = new Graphics();
    layer.addChild(links);
    app.stage.addChild(layer);

    const area = () => app.screen.width * app.screen.height;
    const target = Math.round(
      Math.min(140, Math.max(28, area() * density * (window.innerWidth < 768 ? 0.55 : 1))),
    );

    const particles: Particle[] = [];
    for (let i = 0; i < target; i++) {
      const r = 1 + Math.random() * 2.2;
      const depth = 0.3 + Math.random() * 0.7;
      const g = new Graphics().circle(0, 0, r).fill({
        color: Math.random() > 0.82 ? 0x5eead4 : 0xdbeafe,
        alpha: 0.22 + depth * 0.5,
      });
      g.x = Math.random() * app.screen.width;
      g.y = Math.random() * app.screen.height;
      layer.addChild(g);
      particles.push({
        x: g.x,
        y: g.y,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r,
        depth,
        g,
      });
    }

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const draw = () => {
      links.clear();
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]!;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistance * linkDistance) {
            const alpha = (1 - Math.sqrt(d2) / linkDistance) * 0.16;
            links.moveTo(a.x, a.y).lineTo(b.x, b.y).stroke({ color: 0x7dd3fc, alpha, width: 1 });
          }
        }
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

    app.ticker.maxFPS = 60;
    app.ticker.add((ticker) => {
      const dt = Math.min(ticker.deltaTime, 2);
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 190 && dist > 0.001) {
            const force = (1 - dist / 190) * (follow ? 0.06 : -0.05) * p.depth;
            p.x += dx * force * dt;
            p.y += dy * force * dt;
          }
        }

        if (p.x < -20) p.x = app.screen.width + 20;
        if (p.x > app.screen.width + 20) p.x = -20;
        if (p.y < -20) p.y = app.screen.height + 20;
        if (p.y > app.screen.height + 20) p.y = -20;

        p.g.x = p.x;
        p.g.y = p.y;
      }

      // parallax on the whole layer
      if (pointer.active) {
        layer.x += ((pointer.x - app.screen.width / 2) * -0.02 - layer.x) * 0.05;
        layer.y += ((pointer.y - app.screen.height / 2) * -0.02 - layer.y) * 0.05;
      } else {
        layer.x += -layer.x * 0.05;
        layer.y += -layer.y * 0.05;
      }

      draw();
    });

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  });

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
