import { useState } from "react";
import { SectionHeading } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudy } from "@/components/CaseStudy";
import { projects } from "@/data/resume";

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projects" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Featured projects"
          title="Built end to end, from architecture to deployment."
          lead="Two projects owned personally — a full-stack web application and a sensor-driven dashboard with an automated control loop."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setOpenId} />
          ))}
        </div>
      </div>

      <CaseStudy project={active} onClose={() => setOpenId(null)} />
    </section>
  );
}
