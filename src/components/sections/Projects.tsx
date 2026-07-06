import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="projects-section mx-auto max-w-4xl px-6 py-16">
      <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--foreground)]">
        Selected projects
      </h2>
      <p className="mt-1 mb-6 text-sm text-[var(--muted)]">
        Live and clickable — visit the site or read the source.
      </p>

      <div className="border-t border-[var(--border)]">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
