import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
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

function ProjectIcon({ icon }: { icon: Project["icon"] }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (icon === "bars") {
    return (
      <svg {...common}>
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-3 border-b border-[var(--border)] py-6 last:border-0 sm:flex-row sm:items-start sm:gap-4">
      <div className="flex min-w-0 flex-1 gap-4">
        {/* Accent-tinted icon square */}
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{
            background: `var(--tint-${project.accent}-bg)`,
            color: `var(--tint-${project.accent}-fg)`,
          }}
        >
          <ProjectIcon icon={project.icon} />
        </span>

        <div className="min-w-0">
          {/* Title links through to the project detail page */}
          <Link href={`/projects/${project.slug}`} className="group inline-flex items-center gap-1">
            <h3 className="font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
              {project.name}
            </h3>
            <ArrowUpRight
              size={15}
              className="text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]"
            />
          </Link>
          <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
            {project.shortDescription}
          </p>
          <p className="mt-2 font-mono text-xs text-[var(--muted)]">
            {project.techStack.slice(0, 3).join(" · ")}
          </p>
        </div>
      </div>

      {/* Actions: visit the live site and read the source */}
      <div className="flex shrink-0 gap-2 pl-14 sm:flex-col sm:pl-0">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-9 items-center justify-center gap-1.5 rounded-md bg-[var(--accent-fill)] px-3.5 text-xs font-medium text-[var(--accent-on-fill)] transition-opacity hover:opacity-90"
          >
            Visit site
            <ArrowRight size={13} />
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-9 items-center justify-center gap-1.5 rounded-md border border-[var(--border)] px-3.5 text-xs font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <GitHubIcon size={13} />
          GitHub
        </a>
      </div>
    </article>
  );
}
