import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type As = "div" | "li" | "section" | "span" | "article" | "p";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: As;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 20, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      style={{ willChange: "transform, opacity" }}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Line-masked heading reveal. Splits on words, animates them up behind a mask. */
export function LineReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="mr-[0.26em] inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );

}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "wide";
}) {
  return (
    <header className={align === "wide" ? "" : "max-w-3xl"}>
      <Reveal>
        <div className="flex items-center gap-4">
          {index ? <span className="label text-accent">{index}</span> : null}
          <span className="label text-muted-foreground">{eyebrow}</span>
          <span aria-hidden="true" className="rule-x hidden flex-1 sm:block" />
        </div>
      </Reveal>
      <h2 className="mt-6 text-[2rem] leading-[1.02] font-medium text-foreground sm:text-5xl lg:text-6xl">
        <LineReveal text={title} delay={0.05} />
      </h2>
      {lead ? (
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
