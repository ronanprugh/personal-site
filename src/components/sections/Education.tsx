import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight text-[var(--foreground)]">
        Education
      </h2>

      <div className="space-y-6">
        {education.map((edu) => (
          <div
            key={`${edu.institution}-${edu.graduationDate}`}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">{edu.institution}</h3>
                <p className="text-sm text-[var(--accent)]">
                  {edu.degree} {edu.field}
                  {edu.honors && <span className="ml-2 text-[var(--muted)]">· {edu.honors}</span>}
                </p>
              </div>
              <span className="shrink-0 text-sm text-[var(--muted)]">
                {edu.graduationDate} · {edu.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
