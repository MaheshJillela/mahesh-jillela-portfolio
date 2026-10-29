import { useEffect, useRef } from "react";
import { Application } from "pixi.js";

export type PixiSetup = (app: Application, host: HTMLDivElement) => (() => void) | void;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Mounts a PixiJS application into a host div.
 * - caps resolution (lower on small screens) to keep the GPU cost down
 * - pauses the ticker whenever the canvas is off-screen
 * - fully destroys the app on unmount
 */
export function usePixiScene(setup: PixiSetup, keepRunning?: () => boolean) {
  const activityRef = useRef(keepRunning);
  activityRef.current = keepRunning;
  const hostRef = useRef<HTMLDivElement>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let app: Application | null = null;
    let cleanup: (() => void) | void;
    let observer: IntersectionObserver | null = null;
    let disposed = false;

    const dprCap = window.innerWidth < 768 ? 1.25 : 2;

    void (async () => {
      const instance = new Application();
      try {
        await instance.init({
          resizeTo: host,
          backgroundAlpha: 0,
          antialias: true,
          resolution: Math.min(window.devicePixelRatio || 1, dprCap),
          autoDensity: true,
        });
      } catch {
        return;
      }
      if (disposed) {
        instance.destroy(true);
        return;
      }
      app = instance;
      instance.canvas.style.width = "100%";
      instance.canvas.style.height = "100%";
      instance.canvas.style.display = "block";
      host.appendChild(instance.canvas);
      cleanup = setupRef.current(instance, host) ?? undefined;

      observer = new IntersectionObserver(
        (entries) => {
          if (!app) return;
          if (entries[0]?.isIntersecting || activityRef.current?.()) app.ticker.start();
          else app.ticker.stop();
        },
        { threshold: 0 },
      );
      observer.observe(host);
    })();

    return () => {
      disposed = true;
      observer?.disconnect();
      cleanup?.();
      app?.destroy(true, { children: true, texture: true });
      app = null;
    };
  }, []);

  return hostRef;
}
