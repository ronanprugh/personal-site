import { ArrowRight } from "lucide-react";
import { experience } from "@/data/experience";

function BriefcaseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

export function CurrentRole() {
  const role = experience.find((job) => job.endDate === "Present") ?? experience[0];

  return (
    <section id="current-role" className="mx-auto max-w-4xl px-6 pt-2 pb-16">
      <a
        href="#experience"
        className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--accent)]"
      >
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
          style={{ background: "var(--tint-amber-bg)", color: "var(--tint-amber-fg)" }}
        >
          <BriefcaseIcon size={20} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[var(--foreground)]">
            {role.title} · {role.company}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {role.startDate} – {role.endDate} · {role.location}
          </p>
        </div>

        <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-[var(--accent)]">
          <span className="hidden sm:inline">Full experience</span>
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>
    </section>
  );
}
