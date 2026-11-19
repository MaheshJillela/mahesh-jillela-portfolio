import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Vector = [number, number, number];
type Shape = "sphere" | "diamond" | "hex";
type Face = { vertices: number[]; normal: Vector };
type Mesh = { points: Vector[]; faces: Face[] };

const TAU = Math.PI * 2;
const lightDirection: Vector = [-0.48, 0.65, 0.59];
const dot = (a: Vector, b: Vector) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function makeMesh(sides: number, rings: [number, number, number][]): Mesh {
  const points = rings.flatMap(([radius, height, twist]) =>
    Array.from({ length: sides }, (_, index): Vector => {
      const angle = (index / sides) * TAU + twist;
      return [Math.cos(angle) * radius, height, Math.sin(angle) * radius];
    }),
  );
  const faces: Face[] = [];
  for (let ring = 0; ring < rings.length - 1; ring++) {
    for (let index = 0; index < sides; index++) {
      const a = ring * sides + index;
      const b = ring * sides + ((index + 1) % sides);
      const vertices = [a, b, b + sides, a + sides];
      const origin = points[a]!;
      const next = points[b]!;
      const lower = points[b + sides]!;
      const u = next.map((value, axis) => value - origin[axis]!) as Vector;
      const v = lower.map((value, axis) => value - origin[axis]!) as Vector;
      const normal: Vector = [
        u[1] * v[2] - u[2] * v[1],
        u[2] * v[0] - u[0] * v[2],
        u[0] * v[1] - u[1] * v[0],
      ];
      const length = Math.hypot(...normal);
      if (length < 1e-8) continue;
      const outward = dot(normal, origin) < 0 ? -1 : 1;
      faces.push({ vertices, normal: normal.map((value) => (value * outward) / length) as Vector });
    }
  }
  return { points, faces };
}

const meshes: Record<Exclude<Shape, "sphere">, Mesh> = {
  diamond: makeMesh(5, [
    [0.01, 1.16, 0],
    [0.76, 0.36, 0],
    [0.94, 0.04, 0],
    [0.65, -0.42, 0],
    [0.01, -1.12, 0],
  ]),
  hex: makeMesh(6, [
    [0.01, 1.02, 0],
    [0.75, 0.72, 0],
    [0.92, 0.38, 0],
    [0.92, -0.4, 0],
    [0.66, -0.78, 0],
    [0.01, -1.05, 0],
  ]),
};

const orbit: Vector[] = Array.from({ length: 73 }, (_, index) => {
  const angle = (index * TAU) / 72;
  return [Math.cos(angle) * 1.52, Math.cos(angle) * -0.36, Math.sin(angle) * 1.38];
});

// Sample the visible hemisphere once. Lighting stays in camera space while
// the surface pattern rotates in model space.
const sphereSize = 144;
const sphereSamples = Array.from({ length: sphereSize ** 2 }, (_, index) => {
  const x = ((index % sphereSize) + 0.5) / (sphereSize / 2) - 1;
  const y = 1 - (Math.floor(index / sphereSize) + 0.5) / (sphereSize / 2);
  const radial = x * x + y * y;
  if (radial > 1) return null;
  const z = Math.sqrt(1 - radial);
  const diffuse = Math.max(0, dot([x, y, z], lightDirection));
  const reflection = Math.max(0, dot([x, y, z], [-0.29, 0.34, 0.89])) ** 32;
  return { x, y, z, diffuse, reflection, rim: (1 - z) ** 4 };
});
const sphereBuffers = new WeakMap<
  CanvasRenderingContext2D,
  {
    surface: CanvasRenderingContext2D;
    image: ImageData;
  }
>();

function drawSphere(
  context: CanvasRenderingContext2D,
  tint: Vector,
  yaw: number,
  pitch: number,
  radius: number,
) {
  let buffer = sphereBuffers.get(context);
  if (!buffer) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = sphereSize;
    const surface = canvas.getContext("2d");
    if (!surface) return;
    buffer = { surface, image: surface.createImageData(sphereSize, sphereSize) };
    sphereBuffers.set(context, buffer);
  }

  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const { surface, image } = buffer;

  for (let index = 0; index < sphereSamples.length; index++) {
    const sample = sphereSamples[index];
    if (!sample) continue;
    const { x, y, z, diffuse, reflection, rim } = sample;
    const depth = z * cp - y * sp;
    const localX = x * c - depth * s;
    const localY = y * cp + z * sp;
    const localZ = x * s + depth * c;
    const swirl = Math.sin(localY * 18 + 2.2 * Math.sin(localX * 4 + localZ * 5));
    const haze = Math.sin(localZ * 11 + localX * 5) * Math.sin(localY * 13 - localX * 7);
    const veins = Math.max(0, swirl) ** 7 * 0.12;
    const shade = 0.14 + diffuse * 0.67 + rim * 0.24 + swirl * 0.065 + haze * 0.09 + veins;
    const glint = reflection * 123;
    const offset = index * 4;
    image.data[offset] = 12 + tint[0] * shade + glint;
    image.data[offset + 1] = 15 + tint[1] * shade + glint;
    image.data[offset + 2] = 23 + tint[2] * shade + glint;
    image.data[offset + 3] = Math.min(255, z * 1800);
  }

  surface.putImageData(image, 0, 0);
  const { width, height } = context.canvas;
  context.drawImage(
    surface.canvas,
    width / 2 - radius,
    height * 0.49 - radius,
    radius * 2,
    radius * 2,
  );
}

function drawArtifact(
  context: CanvasRenderingContext2D,
  shape: Shape,
  tint: Vector,
  yaw: number,
  pitch: number,
) {
  const { width, height } = context.canvas;
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const lens = height * 0.34;

  function rotate([x, y, z]: Vector): Vector {
    const depth = z * c - x * s;
    return [x * c + z * s, y * cp - depth * sp, y * sp + depth * cp];
  }

  function project([x, y, z]: Vector): [number, number] {
    const scale = lens / (1 - z * 0.16);
    return [width / 2 + x * scale, height * 0.49 - y * scale];
  }

  context.clearRect(0, 0, width, height);
  const trail = orbit.map(rotate);
  function drawOrbit(front: boolean) {
    context.beginPath();
    for (let index = 1; index < trail.length; index++) {
      const from = trail[index - 1]!;
      const to = trail[index]!;
      if (from[2] + to[2] > 0 !== front) continue;
      context.moveTo(...project(from));
      context.lineTo(...project(to));
    }
    context.lineWidth = front ? 2 : 1.5;
    context.strokeStyle = `rgba(${tint.join(",")}, ${front ? 0.56 : 0.25})`;
    context.stroke();
  }

  drawOrbit(false);
  if (shape === "sphere") {
    drawSphere(context, tint, yaw, pitch, lens * 0.94);
    drawOrbit(true);
    return;
  }
  const mesh = meshes[shape];
  const rotated = mesh.points.map(rotate);
  const projected = rotated.map(project);
  const faces = mesh.faces
    .map((face) => ({
      ...face,
      rotatedNormal: rotate(face.normal),
      depth:
        face.vertices.reduce((sum, vertex) => sum + rotated[vertex]![2], 0) / face.vertices.length,
    }))
    .filter(({ rotatedNormal, vertices }) => {
      const point = rotated[vertices[0]!]!;
      return dot(rotatedNormal, [-point[0], -point[1], 6.25 - point[2]]) > 0;
    })
    .sort((a, b) => a.depth - b.depth);

  for (const { vertices, rotatedNormal } of faces) {
    const diffuse = Math.max(0, dot(rotatedNormal, lightDirection));
    const specular = Math.max(0, dot(rotatedNormal, [-0.27, 0.37, 0.89])) ** 18;
    const rim = (1 - Math.max(0, rotatedNormal[2])) ** 3;
    const [x, y, z] = mesh.points[vertices[0]!]!;
    const grain = Math.sin(x * 22 + y * 31 + z * 8) * Math.sin(z * 26 - y * 15) * 0.035;
    const band = 0.04 * Math.sin(y * 12);
    const shade = 0.19 + diffuse * 0.66 + rim * 0.29 + grain + band;
    const color = (reflection: number) => {
      const rgb = tint.map((channel) =>
        Math.round(Math.min(255, 13 + channel * shade * reflection + specular * 117)),
      );
      return `rgb(${rgb.join(",")})`;
    };
    const top = projected[vertices[0]!]!;
    const bottom = projected[vertices[2]!]!;
    const reflection = context.createLinearGradient(...top, ...bottom);
    reflection.addColorStop(0, color(1.2));
    reflection.addColorStop(0.45, color(1));
    reflection.addColorStop(1, color(0.68));
    context.beginPath();
    context.moveTo(...projected[vertices[0]!]!);
    for (const vertex of vertices.slice(1)) context.lineTo(...projected[vertex]!);
    context.closePath();
    context.fillStyle = reflection;
    context.fill();
    context.lineWidth = 1.25;
    context.strokeStyle = `rgba(${tint.join(",")}, 0.29)`;
    context.stroke();
  }

  drawOrbit(true);
}

export function GameArtifact({ shape, color }: { shape: Shape; color: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    const trigger = element?.closest("button");
    if (!element || !trigger || !context) return;

    const tint = color.split(" ").map(Number) as Vector;
    const stop = trigger.closest("li");
    let frame = 0;
    let previousTime = 0;
    let lastRender = 0;
    let yaw = 0.52;
    let lean = 0;
    let pitch = 0.28;
    let targetLean = 0;
    let targetPitch = 0.28;

    function tick(time: number) {
      const dt = previousTime ? Math.min(time - previousTime, 40) : 0;
      previousTime = time;
      yaw += dt * 0.00046;
      lean += (targetLean - lean) * 0.09;
      pitch += (targetPitch - pitch) * 0.09;
      if (time - lastRender >= 30 && stop?.getAttribute("data-visible") !== "false") {
        drawArtifact(context!, shape, tint, yaw + lean, pitch);
        lastRender = time;
      }
      frame = requestAnimationFrame(tick);
    }

    function point(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const rect = trigger!.getBoundingClientRect();
      targetLean = ((event.clientX - rect.left) / rect.width - 0.5) * 1.5;
      targetPitch = 0.28 + ((event.clientY - rect.top) / rect.height - 0.5) * 0.75;
    }

    function reset() {
      targetLean = 0;
      targetPitch = 0.28;
    }

    drawArtifact(context, shape, tint, yaw, pitch);
    element.setAttribute("data-ready", "true");
    if (reduceMotion) return;

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (entry?.isIntersecting) frame = requestAnimationFrame(tick);
    });
    observer.observe(element);
    trigger.addEventListener("pointermove", point);
    trigger.addEventListener("pointerleave", reset);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      trigger.removeEventListener("pointermove", point);
      trigger.removeEventListener("pointerleave", reset);
    };
  }, [color, shape, reduceMotion]);

  return <canvas ref={canvas} width={520} height={410} className="game-orbit__model" />;
}
