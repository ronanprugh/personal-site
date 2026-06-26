import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--accent)]"
    >
      <h3 className="mb-2 font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
        {project.name}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {project.shortDescription}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-[var(--border)] bg-[var(--background)] px-2.5 py-0.5 text-xs text-[var(--muted)]"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 5 && (
          <span className="rounded-full border border-[var(--border)] bg-[var(--background)] px-2.5 py-0.5 text-xs text-[var(--muted)]">
            +{project.techStack.length - 5} more
          </span>
        )}
      </div>
    </Link>
  );
}
