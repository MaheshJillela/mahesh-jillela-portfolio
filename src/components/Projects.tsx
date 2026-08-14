import { useState } from "react";
import { SectionHeading } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudy } from "@/components/CaseStudy";
import { StorefrontMock } from "@/components/visuals/StorefrontMock";
import { SensorPlot } from "@/components/visuals/SensorPlot";
import { projects } from "@/data/resume";

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="work" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="Two projects, owned end to end."
          lead="A live e-commerce storefront and a sensor-driven control system — both owned end to end."
        />

        <div className="mt-20 space-y-28 sm:mt-24 sm:space-y-36">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpen={setOpenId}
              visual={
                p.id === "luvis" ? (
                  <StorefrontMock />
                ) : (
                  <SensorPlot />
                )
              }
            />
          ))}
        </div>
      </div>

      <CaseStudy project={active} onClose={() => setOpenId(null)} />
    </section>
  );
}
