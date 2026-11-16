import { useEffect, useRef } from "react";
import { Container, Graphics, Sprite, Texture, BlurFilter } from "pixi.js";
import { usePixiScene, prefersReducedMotion } from "@/lib/pixi";

export type MachineEvent = { phase: string; remaining: number | null; complete: boolean };
type Props = {
  feature: number;
  request: number;
  onEvent: (event: MachineEvent) => void;
  onError: () => void;
};

// Original symbol artwork, drawn once into textures rather than redrawn each frame.
function symbolTexture(kind: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 192;
  const c = canvas.getContext("2d")!;
  const palette = [
    ["#9df9ff", "#137ea2", "#042d55"],
    ["#e1b6ff", "#8b43d4", "#311466"],
    ["#ffb5bf", "#d82f5c", "#640b32"],
    ["#adffd6", "#16a276", "#044632"],
  ];
  const gold = kind >= 4;
  const colors = gold ? ["#fff0b4", "#dca44b", "#704014"] : palette[kind]!;
  c.shadowColor = gold ? "#e8b45699" : colors[1]!;
  c.shadowBlur = 20;
  const gradient = c.createLinearGradient(30, 20, 155, 168);
  gradient.addColorStop(0, colors[0]!);
  gradient.addColorStop(0.45, colors[1]!);
  gradient.addColorStop(1, colors[2]!);
  if (!gold) {
    c.shadowColor = "#000a";
    c.shadowBlur = 12;
    c.shadowOffsetY = 7;
    if (kind === 0) {
      c.beginPath();
      c.arc(96, 96, 62, 0, Math.PI * 2);
      c.fillStyle = "#243447";
      c.fill();
      c.strokeStyle = "#c3a065";
      c.lineWidth = 5;
      c.stroke();
      c.shadowBlur = 0;
      c.shadowOffsetY = 0;
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4 - Math.PI / 2;
        const r = i % 2 === 0 ? 53 : 32;
        c.beginPath();
        c.moveTo(96 + Math.cos(a) * r, 96 + Math.sin(a) * r);
        c.lineTo(96 + Math.cos(a + 0.4) * 14, 96 + Math.sin(a + 0.4) * 14);
        c.lineTo(96, 96);
        c.fillStyle = i % 2 === 0 ? "#f0dbac" : "#7998a2";
        c.fill();
      }
      c.beginPath();
      c.arc(96, 96, 7, 0, Math.PI * 2);
      c.fillStyle = "#e7bc6f";
      c.fill();
    } else if (kind === 1) {
      const wood = c.createLinearGradient(40, 60, 150, 150);
      wood.addColorStop(0, "#b17543");
      wood.addColorStop(0.4, "#6b3521");
      wood.addColorStop(1, "#28171c");
      c.fillStyle = wood;
      c.beginPath();
      c.roundRect(33, 78, 126, 75, 9);
      c.fill();
      c.beginPath();
      c.roundRect(33, 44, 126, 61, [30, 30, 5, 5]);
      c.fill();
      c.strokeStyle = "#e8be72";
      c.lineWidth = 5;
      c.stroke();
      c.shadowBlur = 0;
      c.shadowOffsetY = 0;
      c.strokeRect(35, 88, 122, 62);
      c.fillStyle = "#b68b47";
      c.fillRect(49, 47, 12, 104);
      c.fillRect(131, 47, 12, 104);
      c.fillStyle = "#ffe1a0";
      c.fillRect(84, 86, 25, 30);
      c.fillStyle = "#30201b";
      c.beginPath();
      c.arc(96, 99, 4, 0, 7);
      c.fill();
      c.fillRect(94, 99, 4, 9);
      c.strokeStyle = "#ad7441";
      c.lineWidth = 1;
      for (let y = 112; y < 150; y += 12) {
        c.beginPath();
        c.moveTo(63, y);
        c.lineTo(129, y);
        c.stroke();
      }
    } else if (kind === 2) {
      const bone = c.createLinearGradient(45, 30, 140, 155);
      bone.addColorStop(0, "#fff1ce");
      bone.addColorStop(1, "#a99d86");
      c.fillStyle = bone;
      c.beginPath();
      c.ellipse(96, 79, 51, 53, 0, 0, 7);
      c.fill();
      c.beginPath();
      c.roundRect(67, 103, 58, 49, 10);
      c.fill();
      c.shadowBlur = 0;
      c.shadowOffsetY = 0;
      c.fillStyle = "#18202a";
      c.beginPath();
      c.ellipse(75, 82, 15, 18, -0.25, 0, 7);
      c.ellipse(117, 82, 15, 18, 0.25, 0, 7);
      c.fill();
      c.beginPath();
      c.moveTo(96, 103);
      c.lineTo(88, 116);
      c.lineTo(104, 116);
      c.closePath();
      c.fill();
      c.strokeStyle = "#514c48";
      c.lineWidth = 2;
      for (let x = 78; x < 125; x += 12) {
        c.beginPath();
        c.moveTo(x, 132);
        c.lineTo(x, 149);
        c.stroke();
      }
      c.strokeStyle = "#d8bb83";
      c.lineWidth = 8;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(38, 153);
      c.lineTo(150, 42);
      c.moveTo(42, 43);
      c.lineTo(153, 153);
      c.stroke();
    } else {
      c.strokeStyle = "#d8b16c";
      c.lineWidth = 11;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(96, 52);
      c.lineTo(96, 151);
      c.moveTo(67, 84);
      c.lineTo(125, 84);
      c.moveTo(43, 116);
      c.quadraticCurveTo(55, 155, 96, 160);
      c.quadraticCurveTo(137, 155, 149, 116);
      c.stroke();
      c.beginPath();
      c.arc(96, 38, 16, 0, 7);
      c.stroke();
      c.shadowBlur = 0;
      c.shadowOffsetY = 0;
      c.strokeStyle = "#ffe6ac";
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(93, 58);
      c.lineTo(93, 146);
      c.stroke();
      c.fillStyle = "#e3c182";
      c.beginPath();
      c.moveTo(35, 109);
      c.lineTo(65, 113);
      c.lineTo(43, 134);
      c.closePath();
      c.moveTo(157, 109);
      c.lineTo(127, 113);
      c.lineTo(149, 134);
      c.closePath();
      c.fill();
    }
  } else {
    c.beginPath();
    c.arc(96, 96, 70, 0, Math.PI * 2);
    c.fillStyle = gradient;
    c.fill();
    c.shadowBlur = 0;
    c.strokeStyle = "#ffe3a0";
    c.lineWidth = 3;
    c.stroke();
    c.beginPath();
    c.arc(96, 96, 59, 0, Math.PI * 2);
    c.fillStyle = "#251b28";
    c.fill();
    c.strokeStyle = "#af7c35";
    c.lineWidth = 2;
    c.stroke();
    c.fillStyle = "#fce3a2";
    c.textAlign = "center";
    c.textBaseline = "middle";
    if (kind === 4) {
      c.font = "bold 25px Georgia";
      c.fillText("SCATTER", 96, 98);
      c.font = "15px Georgia";
      c.fillText("✦", 96, 63);
      c.fillText("✦", 96, 131);
    }
    if (kind === 5) {
      c.font = "bold 37px Georgia";
      c.fillText("W", 96, 98);
      c.font = "12px sans-serif";
      c.fillText("W I L D", 96, 133);
    }
    if (kind === 6) {
      c.font = "bold 37px Georgia";
      c.fillText("5", 96, 94);
      c.font = "12px sans-serif";
      c.fillText("C O I N", 96, 127);
    }
  }
  return Texture.from(canvas);
}

const WIDTH = 760,
  HEIGHT = 650,
  CELL = 112,
  COL = 128,
  LEFT = 60;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function SlotMachine({ feature, request, onEvent, onError }: Props) {
  const props = useRef({ feature, request, onEvent });
  props.current = { feature, request, onEvent };
  const control = useRef<{ start: () => void } | null>(null);
  const active = useRef(false);
  useEffect(() => {
    control.current?.start();
  }, [feature, request]);
  const host = usePixiScene(
    (app) => {
      control.current = { start: () => app.ticker.start() };
      const textures = Array.from({ length: 7 }, (_, i) => symbolTexture(i));
      const world = new Container();
      app.stage.addChild(world);
      const backdrop = new Graphics();
      world.addChild(backdrop);
      const windowMask = new Graphics();
      world.addChild(windowMask);
      const field = new Container();
      world.addChild(field);
      field.mask = windowMask;
      const reels = Array.from({ length: 5 }, (_, col) => {
        const container = new Container();
        field.addChild(container);
        container.x = LEFT + col * COL;
        const sprites = Array.from({ length: 8 }, (_, i) => {
          const sprite = new Sprite(textures[(i * 3 + col) % 4]!);
          sprite.anchor.set(0.5);
          sprite.width = sprite.height = 98;
          sprite.x = COL / 2;
          container.addChild(sprite);
          return sprite;
        });
        const blur = new BlurFilter({ strengthX: 0, strengthY: 0, quality: 2 });
        container.filters = null;
        return { container, sprites, blur };
      });
      const lockLayer = new Container();
      world.addChild(lockLayer);
      const locks = Array.from({ length: 25 }, (_, i) => {
        const box = new Container();
        const bg = new Graphics()
          .roundRect(4, 4, COL - 8, CELL - 8, 12)
          .fill(0x17152b)
          .stroke({ color: 0xf0c77d, width: 2 });
        box.addChild(bg);
        const symbol = new Sprite(textures[6]!);
        symbol.anchor.set(0.5);
        symbol.width = symbol.height = 96;
        symbol.position.set(COL / 2, CELL / 2);
        box.addChild(symbol);
        lockLayer.addChild(box);
        return box;
      });
      const light = new Graphics();
      world.addChild(light);
      let oldFeature = -1,
        oldRequest = 0,
        elapsed = 0,
        phaseTime = 0,
        round = 0,
        stage = "idle",
        expansion = 0;
      let held = new Set<number>();
      let previousEvent = "";
      let spinning = false;
      let idleRendered = false,
        lastWidth = 0,
        lastHeight = 0;
      const event = (phase: string, remaining: number | null = null, complete = false) => {
        const key = `${phase}/${remaining}/${complete}`;
        if (key !== previousEvent) {
          previousEvent = key;
          props.current.onEvent({ phase, remaining, complete });
        }
      };
      const beginSpin = () => {
        active.current = true;
        stage = "spin";
        phaseTime = 0;
        spinning = true;
        event(
          round === 0 ? "Reels spinning" : "Feature round spinning",
          round === 0
            ? null
            : props.current.feature === 4
              ? round <= 2
                ? 3
                : 6 - round
              : props.current.feature === 3 || props.current.feature === 5
                ? 4 - round
                : null,
        );
      };
      const outcome = (col: number, row: number) => {
        const f = props.current.feature;
        if (round === 0 && (f === 3 || f === 5) && row === 1 && col % 2 === 0) return 4;
        if (row === 1 && (f === 0 || round > 0)) return col === 2 ? 5 : 1;
        return (col * 3 + row + round) % 4;
      };
      app.ticker.add((ticker) => {
        const p = props.current;
        const reduced = prefersReducedMotion();
        const dt = Math.min(ticker.deltaMS, 50);
        elapsed += dt;
        phaseTime += dt;
        const speed = reduced ? 5 : 1;
        if (p.feature !== oldFeature) {
          idleRendered = false;
          oldFeature = p.feature;
          stage = "idle";
          phaseTime = 0;
          round = 0;
          held.clear();
          expansion = 0;
          spinning = false;
          event("Ready to spin");
        }
        if (p.request !== oldRequest) {
          idleRendered = false;
          oldRequest = p.request;
          round = 0;
          held.clear();
          expansion = 0;
          if (p.feature === 5) {
            round = 1;
            beginSpin();
          } else beginSpin();
        }
        const resting = stage === "idle" || stage === "done";
        if (
          resting &&
          idleRendered &&
          lastWidth === app.screen.width &&
          lastHeight === app.screen.height
        )
          return;
        idleRendered = resting;
        lastWidth = app.screen.width;
        lastHeight = app.screen.height;
        const rows = p.feature === 1 && round > 0 ? 5 : 3;
        const targetExpansion = rows === 5 ? 1 : 0;
        expansion += (targetExpansion - expansion) * Math.min(1, dt / (reduced ? 1 : 170));
        const visibleHeight = CELL * (3 + 2 * expansion);
        const top = (HEIGHT - visibleHeight) / 2;
        world.scale.set(Math.min(app.screen.width / WIDTH, app.screen.height / HEIGHT));
        world.position.set(
          (app.screen.width - WIDTH * world.scale.x) / 2,
          (app.screen.height - HEIGHT * world.scale.y) / 2,
        );
        backdrop
          .clear()
          .roundRect(LEFT - 8, top - 8, COL * 5 + 16, visibleHeight + 16, 18)
          .fill(0x080b19)
          .stroke({ color: 0xa98048, alpha: 0.7, width: 2 });
        for (let col = 1; col < 5; col++)
          backdrop
            .moveTo(LEFT + col * COL, top + 4)
            .lineTo(LEFT + col * COL, top + visibleHeight - 4)
            .stroke({ color: 0xc5ad7b, alpha: 0.1, width: 1 });
        windowMask
          .clear()
          .roundRect(LEFT, top, COL * 5, visibleHeight, 12)
          .fill(0xffffff);
        let allStopped = true;
        reels.forEach((reel, col) => {
          const duration = (1550 + col * 180) / speed;
          const t = Math.min(1, phaseTime / duration);
          let position = 0;
          if (spinning) {
            const distance = (8 + col) * CELL;
            position = reduced ? distance : distance * ease(t);
            if (t < 1) allStopped = false;
            else position = distance;
          }
          const offset = spinning ? position % CELL : 0;
          reel.container.filters = spinning && !reduced && t < 1 ? [reel.blur] : null;
          reel.blur.strengthY = spinning && !reduced ? Math.sin(Math.PI * t) * 7 : 0;
          reel.container.y = top;
          reel.sprites.forEach((sprite, i) => {
            const row = i - 1;
            let kind = outcome(col, Math.max(0, row));
            if (spinning)
              kind = outcome(
                col,
                (((row - Math.floor(position / CELL) + (8 + col)) % rows) + rows) % rows,
              );
            sprite.texture = textures[kind]!;
            sprite.y = (row + 0.5) * CELL + offset;
            sprite.alpha = 1;
            sprite.scale.set(98 / 192);
            if (!reduced && stage === "win" && row === 1) {
              sprite.scale.set((98 + Math.sin(elapsed / 180) * 3) / 192);
            }
          });
        });
        locks.forEach((box, i) => {
          const col = i % 5,
            row = Math.floor(i / 5);
          box.visible = held.has(i);
          box.position.set(LEFT + col * COL, top + row * CELL);
          box.alpha = stage === "collect" ? 0.65 + 0.35 * Math.sin(elapsed / 180) : 1;
        });
        light.clear();
        if (stage === "win" || stage === "collect") {
          light
            .roundRect(LEFT + 4, top + CELL + 4, COL * 5 - 8, CELL - 8, 12)
            .stroke({ color: 0xf8d691, alpha: 0.55 + 0.2 * Math.sin(elapsed / 240), width: 2 });
          for (let i = 0; !reduced && i < 18; i++) {
            const x = LEFT + ((i * 83 + elapsed * 0.03) % (COL * 5));
            const y = top + visibleHeight - ((elapsed * 0.055 + i * 29) % visibleHeight);
            light.circle(x, y, 1.5 + (i % 2)).fill({ color: 0xffda8c, alpha: 0.55 });
          }
        }
        if (stage === "spin" && allStopped) {
          spinning = false;
          stage = "landed";
          phaseTime = 0;
          if ((p.feature === 2 || p.feature === 4) && round === 2) held.add(9);
          event(
            p.feature === 4 && round === 2
              ? "New coin landed · respins reset to 3"
              : "Reels settled",
            p.feature === 4 && round > 0 ? (round === 2 ? 3 : round === 1 ? 2 : 5 - round) : null,
          );
        }
        if (stage === "landed" && phaseTime > 650 / speed) {
          if (round === 0 && p.feature !== 0) {
            stage = "trigger";
            phaseTime = 0;
            if (p.feature === 1) event("Expanding to five rows");
            if (p.feature === 2 || p.feature === 4) {
              held = new Set([1, 7, 13]);
              event(
                p.feature === 4
                  ? "Hold & Spin · symbols locked"
                  : "Symbols locked · respin unlocked positions",
                3,
              );
            }
            if (p.feature === 3 || p.feature === 5) event("Free spins awarded", 3);
          } else {
            stage = "win";
            phaseTime = 0;
            event(
              "Win presentation",
              p.feature === 4
                ? round === 2
                  ? 3
                  : round === 1
                    ? 2
                    : Math.max(0, 5 - round)
                : p.feature === 3 || p.feature === 5
                  ? Math.max(0, 3 - round)
                  : null,
            );
          }
        }
        if (stage === "trigger" && phaseTime > 1100 / speed) {
          round = 1;
          beginSpin();
        }
        if (stage === "win" && phaseTime > 1050 / speed) {
          const rounds =
            p.feature === 4 ? 5 : p.feature === 3 || p.feature === 5 ? 3 : p.feature === 2 ? 2 : 1;
          if (p.feature !== 0 && round < rounds) {
            round++;
            beginSpin();
          } else {
            stage = "collect";
            phaseTime = 0;
            event("Feature complete · collecting presentation");
          }
        }
        if (stage === "collect" && phaseTime > 1000 / speed) {
          stage = "restore";
          phaseTime = 0;
          round = 0;
          held.clear();
          event("Returning to base game");
        }
        if (stage === "restore" && phaseTime > 900 / speed) {
          expansion = 0;
          stage = "done";
          active.current = false;
          event("Sequence complete · ready to replay", null, true);
        }
      });
      return () => {
        control.current = null;
        textures.forEach((texture) => texture.destroy(true));
      };
    },
    () => active.current,
    onError,
  );
  return <div ref={host} className="aspect-[760/650] w-full" aria-hidden="true" />;
}
