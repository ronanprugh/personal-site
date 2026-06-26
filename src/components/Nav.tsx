import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
        >
          RP
        </a>

        <div className="flex items-center gap-2 md:gap-6">
          {/* Nav links — hidden on mobile, shown on md+ */}
          <div className="hidden items-center gap-6 text-sm md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
