import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 pt-10 pb-6">
      <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-[var(--foreground)]">
        About
      </h2>
      <p className="text-sm leading-relaxed text-[var(--muted)] md:text-base">{profile.about}</p>
    </section>
  );
}
