import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--accent)]">
      {/* Title links through to the project detail page */}
      <Link
        href={`/projects/${project.slug}`}
        className="group mb-2 inline-flex items-center gap-1"
      >
        <h3 className="text-lg font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
          {project.name}
        </h3>
        <ArrowUpRight
          size={16}
          className="text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]"
        />
      </Link>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {project.shortDescription}
      </p>

      {/* Tech line — monospace for an editorial, code-forward feel */}
      <p className="mb-5 font-mono text-xs text-[var(--muted)]">
        {project.techStack.slice(0, 4).join(" · ")}
        {project.techStack.length > 4 && ` · +${project.techStack.length - 4}`}
      </p>

      {/* Actions: visit the live site and read the source */}
      <div className="flex flex-wrap gap-2.5">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-10 items-center gap-2 rounded-lg bg-[var(--accent-fill)] px-4 text-sm font-medium text-[var(--accent-on-fill)] transition-opacity hover:opacity-90"
          >
            <ExternalLink size={15} />
            Visit site
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <GitHubIcon size={15} />
          GitHub
        </a>
      </div>
    </article>
  );
}
