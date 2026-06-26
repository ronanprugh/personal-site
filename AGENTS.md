# Repo Conventions

These conventions are authoritative for any agent or human working in this repo. They are referenced from the SDD specs under `docs/specs/`.

## Stack & Layout

- **Framework:** Next.js 16, App Router only. Server components by default; mark client components explicitly with `"use client"`.
- **Language:** TypeScript with `strict` enabled. No `any`. No `@ts-ignore` / `@ts-expect-error` without a tracked TODO.
- **Styling:** Tailwind CSS v4. Mobile-first: default utility classes target small screens; `sm:`, `md:`, `lg:` modifiers only layer adjustments for larger viewports. No `tailwind.config.ts` — config is CSS-first in `globals.css`.
- **Dark mode:** Class-based via `@variant dark (&:where(.dark, .dark *))` in `globals.css`. ThemeProvider sets `dark`/`light` class on `<html>`.
- **Full-height layouts:** Use `min-h-dvh` (not `min-h-screen`); respect safe-area insets via `env(safe-area-inset-*)`.
- **Touch targets:** Primary interactive elements meet ≥44×44 px (`min-h-11 min-w-11` in Tailwind since `h-11` = 2.75rem ≈ 44px).
- **Package manager:** pnpm. All install/run instructions use `pnpm`.

## File Organization

```
src/
  app/                  # Next.js App Router routes and layouts
  components/           # Shared UI components
    sections/           # Full-page section components (Hero, About, etc.)
  data/                 # Typed content data files (no inline hardcoded content in components)
public/                 # Static assets (headshot, og-image, project screenshots)
docs/specs/             # SDD specs, task lists, audits, proofs
.github/workflows/      # CI
```

## Quality Gates

- ESLint — run via `pnpm lint`.
- Prettier — `pnpm format` to write, `pnpm format:check` to verify.
- TypeScript — `pnpm typecheck` must pass.
- Vitest + React Testing Library — colocated tests (`Foo.tsx` next to `Foo.test.tsx`). Run `pnpm test:ci` in CI.
- All of the above run on every PR via `.github/workflows/ci.yml`.

## Commit Conventions

- **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `ci:`). Enforced via `commitlint` in CI.
- Reference the relevant SDD task and spec in the commit body, e.g. `Related to T1.5 in Spec 01-spec-personal-portfolio-site`.

## SDD Workflow

- Specs, tasks, audits, and proofs live in `docs/specs/[NN]-spec-[name]/`.
- Don't pull future-spec scope into earlier specs.

## Security

- No phone numbers, personal email addresses, or home addresses in any component, metadata, or Open Graph tag.
- No API keys or secrets in the repo. The site is entirely static; no environment variables needed for v1.
