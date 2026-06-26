import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="mb-10 text-2xl font-bold tracking-tight text-[var(--foreground)]">
        Experience
      </h2>

      <div className="relative space-y-10 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-0.5rem)] before:w-px before:bg-[var(--border)]">
        {experience.map((job) => (
          <div key={`${job.company}-${job.startDate}`} className="relative pl-8">
            {/* Timeline dot */}
            <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--background)]" />

            {/* Header row */}
            <div className="mb-1 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">{job.company}</h3>
                <p className="text-sm text-[var(--accent)]">{job.title}</p>
              </div>
              <span className="shrink-0 text-sm text-[var(--muted)]">
                {job.startDate} – {job.endDate} · {job.location}
              </span>
            </div>

            {/* Responsibilities */}
            <ul className="mt-3 space-y-2">
              {job.responsibilities.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-[var(--muted)]">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
