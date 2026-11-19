import { createFileRoute } from "@tanstack/react-router";

import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GameShowcase } from "@/components/GameShowcase";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const title = "Mahesh Jillela — PixiJS Game & Frontend Developer";
const description =
  "Frontend developer building 2D slot, crash and arcade games with PixiJS, plus React and TypeScript interfaces. From scratch to production, localized control panels and release environments.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mahesh Jillela",
          jobTitle: "Frontend Developer",
          email: "mailto:maheshjillela6@gmail.com",
          address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
          sameAs: [
            "https://github.com/MaheshJillela",
            "https://www.linkedin.com/in/mahesh-jillela",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div aria-hidden="true" className="aurora-wash pointer-events-none fixed inset-0 z-0" />
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <GameShowcase />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
