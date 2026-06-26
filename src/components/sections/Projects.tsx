import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="projects-section mx-auto max-w-4xl px-6 py-16">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-[var(--foreground)]">Projects</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
