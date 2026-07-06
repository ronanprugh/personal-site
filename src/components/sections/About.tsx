import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 pt-16 pb-8">
      <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight text-[var(--foreground)]">
        About
      </h2>
      <p className="text-base leading-relaxed text-[var(--muted)] md:text-lg">{profile.about}</p>
    </section>
  );
}
