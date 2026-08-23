import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "frontend", label: "Craft" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "gaming", label: "Gaming" },
  { id: "projects", label: "Projects" },
  { id: "philosophy", label: "Philosophy" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 sm:px-8"
        >
          <button
            type="button"
            onClick={() => go("top")}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="size-2 rounded-full bg-accent transition-transform group-hover:scale-125" />
            <span className="font-mono text-xs tracking-[0.2em] text-foreground uppercase">
              MJ<span className="text-muted-foreground">/</span>dev
            </span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.slice(1).map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => go(l.id)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`label relative px-3 py-2 transition-colors ${
                    active === l.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  {active === l.id ? (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                    />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="size-4" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-background md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="grid-texture absolute inset-0 opacity-60" />
            <div className="relative flex h-16 items-center justify-between px-5">
              <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground"
                aria-label="Close menu"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <ul className="relative mt-6 px-5">
              {links.slice(1).map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                  className="border-b border-border"
                >
                  <button
                    type="button"
                    onClick={() => go(l.id)}
                    className="flex w-full items-baseline justify-between py-5 text-left"
                  >
                    <span className="font-display text-2xl text-foreground">{l.label}</span>
                    <span className="font-mono text-[11px] text-accent">
                      0{i + 1}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
