import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight text-[var(--foreground)]">
        Skills
      </h2>

      <div className="space-y-6">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-sm text-[var(--foreground)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
