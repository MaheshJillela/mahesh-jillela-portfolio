import type Lenis from "lenis";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import {
  Activity,
  Anchor,
  Aperture,
  Bird,
  Boxes,
  CircleDollarSign,
  ChevronLeft,
  ChevronRight,
  Expand,
  Footprints,
  Gem,
  Gift,
  Layers,
  LockKeyhole,
  MoveUpRight,
  Repeat2,
  Radar,
  Rocket,
  ShoppingBag,
  Target,
  Waves,
  X,
} from "lucide-react";
import { GameArtifact } from "./GameArtifact";
import { gameWork } from "@/data/gameWork";
import "./game-orbit.css";

type Game = (typeof gameWork)[number];
type Family = Game["family"];
type Mechanic = Game["mechanics"][number];

const gameVisuals = {
  seariches: { color: "63 235 223", shape: "sphere", icon: Waves },
  eyeofthereels: { color: "173 136 255", shape: "diamond", icon: Aperture },
  piratesawakening: { color: "255 148 104", shape: "hex", icon: Anchor },
  skyx: { color: "96 178 255", shape: "hex", icon: Rocket },
  "sky-sniffer": { color: "238 129 255", shape: "sphere", icon: Radar },
  chickenluck: { color: "255 204 103", shape: "hex", icon: Bird },
  nflkick: { color: "129 243 170", shape: "sphere", icon: Footprints },
} satisfies Record<
  Game["id"],
  { color: string; shape: "sphere" | "diamond" | "hex"; icon: typeof Gem }
>;

const mechanicDetails = {
  "Core reels": {
    icon: Boxes,
    steps: ["Spin", "Stop", "Reveal"],
    text: "Clips moving symbols to the reel window and lands each column in sequence before revealing the result.",
  },
  "Reel expansion": {
    icon: Expand,
    steps: ["Trigger", "Expand", "Settle"],
    text: "Expands the visible reel area while keeping symbol positions and the reveal aligned.",
  },
  "Lock & respins": {
    icon: LockKeyhole,
    steps: ["Lock", "Respin", "Resolve"],
    text: "Holds the marked positions in place while the remaining positions spin again.",
  },
  "Free spins": {
    icon: Gift,
    steps: ["Enter", "Count down", "Return"],
    text: "Switches into the bonus round, tracks the remaining spins, and returns the player to the base game.",
  },
  "Hold & Spin": {
    icon: Layers,
    steps: ["Hold", "Refill", "Collect"],
    text: "Keeps collected symbols visible while open positions respin, then presents the collected result.",
  },
  "Buy feature": {
    icon: ShoppingBag,
    steps: ["Select", "Confirm", "Enter"],
    text: "Connects the feature selection and confirmation interface to the bonus round’s opening animation.",
  },
  "Ladder presentation": {
    icon: MoveUpRight,
    steps: ["Start", "Climb", "Reveal"],
    text: "Highlights successive ladder levels as the feature advances toward its final reveal.",
  },
  "Round lifecycle": {
    icon: Activity,
    steps: ["Prepare", "Run", "Complete"],
    text: "Coordinates the round start, live animation, result, and reset so the interface reflects the current state.",
  },
  "Multiplier curve": {
    icon: MoveUpRight,
    steps: ["Start", "Rise", "Stop"],
    text: "Draws the rising multiplier against elapsed time and holds the curve at the round endpoint.",
  },
  "Bet / cashout": {
    icon: CircleDollarSign,
    steps: ["Place", "Acknowledge", "Settle"],
    text: "Updates the available actions and feedback as the client receives bet and cashout states.",
  },
  Autoplay: {
    icon: Repeat2,
    steps: ["Configure", "Repeat", "Stop"],
    text: "Applies the selected autoplay settings across eligible rounds and keeps the stop control available.",
  },
  "Step progression": {
    icon: Footprints,
    steps: ["Select", "Advance", "Resolve"],
    text: "Tracks the current step and updates the scene as the round advances.",
  },
  "Jump animation": {
    icon: Bird,
    steps: ["Launch", "Arc", "Land"],
    text: "Connects each step change to a jump and landing so the character’s movement shows progress.",
  },
  "Kick interaction": {
    icon: Target,
    steps: ["Input", "Kick", "Reveal"],
    text: "Turns the player’s kick input into an animation sequence and presents the resulting state.",
  },
  "Result reveal": {
    icon: Aperture,
    steps: ["Resolve", "Present", "Reset"],
    text: "Synchronizes the visible result with the end of the action animation and prepares the next round.",
  },
  "GA4 events": {
    icon: Radar,
    steps: ["Action", "Client event", "GA4"],
    text: "Maps supported player interactions to analytics events emitted by the game client.",
  },
} satisfies Record<Mechanic, { icon: typeof Gem; steps: string[]; text: string }>;

function GameScreen({
  game,
  id,
  demo,
  onDemo,
  onClose,
}: {
  game: Game;
  id: string;
  demo: Family | null;
  onDemo: (family: Family | null) => void;
  onClose: () => void;
}) {
  const [preview, setPreview] = useState<{ mechanic: Mechanic; top: number } | null>(null);
  const mechanic = preview?.mechanic;
  const screen = useRef<HTMLElement>(null);
  const detail = mechanic && mechanicDetails[mechanic];
  const mechanicTrigger = useRef<HTMLButtonElement | null>(null);

  function closeMechanic() {
    mechanicTrigger.current?.focus();
    setPreview(null);
  }

  function openMechanic(item: Mechanic, trigger: HTMLButtonElement) {
    if (!screen.current) return;
    mechanicTrigger.current = trigger;
    const top = trigger.getBoundingClientRect().top - screen.current.getBoundingClientRect().top;
    setPreview({ mechanic: item, top });
  }

  return (
    <section
      ref={screen}
      data-lenis-prevent
      className="game-orbit__screen"
      id={id}
      aria-labelledby={`${id}-title`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && mechanic) {
          event.stopPropagation();
          closeMechanic();
        }
      }}
    >
      <span className="game-orbit__glass" aria-hidden="true" />
      <header className="game-orbit__screen-heading">
        <div>
          <p>{game.family}</p>
          <h3 id={`${id}-title`}>{game.name}</h3>
        </div>
        <button type="button" aria-label="Close game details" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>
      </header>
      <ul className="game-orbit__mechanics" aria-label={`${game.name} mechanics`}>
        {game.mechanics.map((item) => {
          const Icon = mechanicDetails[item].icon;
          return (
            <li key={item}>
              <button
                type="button"
                aria-expanded={mechanic === item}
                aria-controls={mechanic === item ? `${id}-mechanic` : undefined}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") openMechanic(item, event.currentTarget);
                }}
                onClick={(event) => openMechanic(item, event.currentTarget)}
              >
                <span className="game-orbit__mechanic-object" aria-hidden="true">
                  <Icon size={23} />
                </span>
                <span>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {detail && preview && (
        <section
          key={mechanic}
          className="game-orbit__projection"
          style={{ "--projection-top": `${preview.top}px` } as CSSProperties}
          id={`${id}-mechanic`}
          aria-labelledby={`${id}-mechanic-title`}
        >
          <span className="game-orbit__glass" aria-hidden="true" />
          <div className="game-orbit__projection-heading">
            <h4 id={`${id}-mechanic-title`}>{mechanic}</h4>
            <button type="button" aria-label="Close mechanic preview" onClick={closeMechanic}>
              <X size={17} aria-hidden="true" />
            </button>
          </div>
          <ol aria-label="Mechanic sequence">
            {detail.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>{detail.text}</p>
        </section>
      )}
      <footer>
        <button
          type="button"
          className="game-orbit__demo"
          aria-expanded={demo === game.family}
          onClick={() => {
            if (demo === game.family) {
              onDemo(null);
              return;
            }
            onDemo(game.family);
            requestAnimationFrame(() => document.getElementById("game-study")?.focus());
          }}
        >
          {demo === game.family ? "Hide family demo" : "Open family demo"}
        </button>
      </footer>
    </section>
  );
}

// Each stop crosses the foreground at the same point on the projected track.
const foreground = 0.57;
const spacing = 0.16;
const track =
  "M 93 10 C 70 1 58 13 68 27 C 84 39 88 49 69 60 C 54 71 38 79 23 70 C 7 62 7 43 21 34 C 29 29 36 28 41 24";

export function GameOrbit({
  demo,
  onDemo,
}: {
  demo: Family | null;
  onDemo: (family: Family | null) => void;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const curve = useRef<SVGPathElement>(null);
  const stops = useRef<(HTMLLIElement | null)[]>([]);
  const nearest = useRef(0);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const prefix = useId();
  const game = gameWork[current]!;
  const screenId = `${prefix}-screen`;
  const last = gameWork.length - 1;

  useEffect(() => {
    if (!rail.current || !stage.current || !curve.current) return;
    const runway = rail.current;
    const camera = stage.current;
    const path = curve.current;
    const length = path.getTotalLength();
    // Sampling once keeps path geometry out of the scroll loop.
    const samples = Array.from({ length: 401 }, (_, index) =>
      path.getPointAtLength((index / 400) * length),
    );
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    function draw() {
      frame = 0;
      const top = parseFloat(getComputedStyle(camera).top) || 0;
      const distance = Math.max(1, runway.offsetHeight - camera.offsetHeight);
      const progress = Math.min(
        last,
        Math.max(0, ((top - runway.getBoundingClientRect().top) / distance) * last),
      );
      const index = Math.round(progress);
      if (nearest.current !== index) {
        nearest.current = index;
        setCurrent(index);
        setOpen(false);
        setPinned(false);
      }

      stops.current.forEach((stop, order) => {
        if (!stop) return;
        const position = foreground + ((reduced.matches ? index : progress) - order) * spacing;
        const fraction = Math.min(1, Math.max(0, position));
        const point = samples[Math.round(fraction * 400)]!;
        const depth = Math.max(0, 1 - Math.abs(foreground - fraction) / 0.57);
        const edgeFade = Math.max(
          0,
          Math.min(1, (position + 0.015) / 0.12, (1.02 - position) / 0.12),
        );
        stop.style.setProperty("--x", `${point.x}%`);
        stop.style.setProperty("--y", `${point.y}%`);
        stop.style.setProperty("--depth-scale", `${0.2 + 0.8 * depth ** 2}`);
        stop.style.setProperty("--depth-opacity", `${edgeFade * (0.24 + 0.76 * depth)}`);
        stop.style.zIndex = `${Math.round(depth * 100)}`;
        stop.dataset["visible"] = `${edgeFade > 0.3}`;
      });
    }

    function queueDraw() {
      if (!frame) frame = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("scroll", queueDraw, { passive: true });
    window.addEventListener("resize", queueDraw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueDraw);
      window.removeEventListener("resize", queueDraw);
    };
  }, [last]);

  function goTo(index: number) {
    if (!rail.current || !stage.current) return;
    const runway = rail.current;
    const camera = stage.current;
    const top = parseFloat(getComputedStyle(camera).top) || 0;
    const distance = runway.offsetHeight - camera.offsetHeight;
    const target =
      window.scrollY + runway.getBoundingClientRect().top - top + distance * (index / last);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { force: true, immediate: reduced, duration: 0.65 });
    } else {
      window.scrollTo({ top: target, behavior: reduced ? "instant" : "smooth" });
    }
  }

  function close() {
    setPinned(false);
    setOpen(false);
    stops.current[current]?.querySelector("button")?.focus({ preventScroll: true });
  }

  return (
    <div className="game-orbit" ref={rail}>
      <div
        className="game-orbit__stage"
        ref={stage}
        data-inspecting={open}
        style={{ "--orbit-rgb": gameVisuals[game.id].color } as CSSProperties}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) close();
        }}
      >
        <header className="game-orbit__heading">
          <div>
            <p className="label text-accent">Game craft</p>
            <h2 className="font-display">Inside the games I build.</h2>
          </div>
          <p>Scroll along the track. Select a game to explore its mechanics.</p>
        </header>
        <div className="game-orbit__camera">
          <svg
            className="game-orbit__geometry"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`${prefix}-trail`} x1="100%" y1="0%" x2="5%" y2="78%">
                <stop stopColor="#9b91fa" stopOpacity=".34" />
                <stop offset=".37" stopColor="#9faeff" />
                <stop offset=".68" stopColor="#a1f5e5" />
                <stop offset="1" stopColor="#7cade6" stopOpacity=".76" />
              </linearGradient>
            </defs>
            <path className="game-orbit__track-halo" d={track} vectorEffect="non-scaling-stroke" />
            <path
              ref={curve}
              className="game-orbit__track-line"
              d={track}
              stroke={`url(#${prefix}-trail)`}
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="game-orbit__track-sweep"
              d={track}
              pathLength="100"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol className="game-orbit__path" aria-label="Games along the track">
            {gameWork.map((item, index) => {
              const { color, shape, icon: Icon } = gameVisuals[item.id];
              const foregroundGame = current === index;
              return (
                <li
                  key={item.id}
                  ref={(element) => {
                    stops.current[index] = element;
                  }}
                  className="game-orbit__stop"
                  data-current={foregroundGame}
                  style={{ "--orbit-rgb": color } as CSSProperties}
                >
                  <button
                    type="button"
                    className="game-orbit__trigger"
                    tabIndex={foregroundGame ? 0 : -1}
                    aria-expanded={foregroundGame && open}
                    aria-controls={foregroundGame && open ? screenId : undefined}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse" && foregroundGame && !pinned) setOpen(true);
                    }}
                    onClick={() => {
                      if (!foregroundGame) {
                        goTo(index);
                      } else if (pinned) {
                        close();
                      } else {
                        setOpen(true);
                        setPinned(true);
                      }
                    }}
                  >
                    <span className="game-orbit__artifact" data-shape={shape} aria-hidden="true">
                      <span className="game-orbit__fallback" />
                      <GameArtifact shape={shape} color={color} />
                    </span>
                    <span className="game-orbit__game-name">
                      <Icon size={17} aria-hidden="true" />
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        {open && (
          <GameScreen
            key={game.id}
            id={screenId}
            game={game}
            demo={demo}
            onDemo={onDemo}
            onClose={close}
          />
        )}
        <nav className="game-orbit__controls" aria-label="Game showcase navigation">
          <button
            type="button"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
            aria-label="Previous game"
          >
            <ChevronLeft size={21} aria-hidden="true" />
          </button>
          <div>
            <span className="game-orbit__position" aria-live="polite">
              {game.name}
            </span>
            <div className="game-orbit__progress" aria-hidden="true">
              {gameWork.map((item, index) => (
                <i key={item.id} data-current={index === current} />
              ))}
            </div>
          </div>
          <button
            type="button"
            disabled={current === last}
            onClick={() => goTo(current + 1)}
            aria-label="Next game"
          >
            <ChevronRight size={21} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}
