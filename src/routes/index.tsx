import { createFileRoute } from "@tanstack/react-router";

import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Lab } from "@/components/Lab";
import { Skills } from "@/components/Skills";
import { Performance } from "@/components/Performance";
import { Process } from "@/components/Process";
import { Achievement } from "@/components/Achievement";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const title = "Mahesh Jillela — Frontend Engineer | Interactive & PixiJS";
const description =
  "Mahesh Jillela builds interactive digital experiences — React, JavaScript, PixiJS, WebGL and TypeScript, plus full-stack work with Python, Flask and MySQL.";

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
          jobTitle: "Frontend Engineer",
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
    <div className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Lab />
        <Skills />
        <Performance />
        <Process />
        <Achievement />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
