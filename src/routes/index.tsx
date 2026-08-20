import { createFileRoute } from "@tanstack/react-router";

import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FrontendCore } from "@/components/FrontendCore";
import { SystemBridge } from "@/components/SystemBridge";
import { CloudProduction } from "@/components/CloudProduction";
import { LuvisCase } from "@/components/LuvisCase";
import { FullFlow } from "@/components/FullFlow";
import { TechStack } from "@/components/TechStack";
import { SkillConstellation } from "@/components/SkillConstellation";
import { SkillMatrix } from "@/components/SkillMatrix";
import { Mindset } from "@/components/Mindset";
import { Experience } from "@/components/Experience";
import { Lab } from "@/components/Lab";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const title = "Mahesh Jillela — Frontend Developer | Production-Aware Engineering";
const description =
  "Frontend developer building interactive production interfaces, with hands-on experience across REST APIs, Node.js, Redis, databases, payments, notifications, AWS, Linux servers and deployment.";

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
    <div className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <FrontendCore />
        <SystemBridge />
        <CloudProduction />
        <LuvisCase />
        <FullFlow />
        <TechStack />
        <SkillConstellation />
        <SkillMatrix />
        <Mindset />
        <Experience />
        <Lab />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
