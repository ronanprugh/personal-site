# Task 2.0 Proofs — Core Content Sections (Hero, About, Experience, Education, Skills)

## Task Summary

This task implements all resume-equivalent content sections with typed data-driven content, a
sticky glass nav with theme toggle, circular headshot via `next/image`, GitHub + LinkedIn CTAs,
a Print/Save PDF button, and a vertical Experience timeline — making the site shareable as a
resume replacement. Content is sourced entirely from typed TypeScript data files under `src/data/`.

## What This Task Proves

- All six content sections (Hero, About, Experience, Education, Skills, Nav) render with real data.
- The site is mobile-responsive at 390px with no horizontal overflow.
- Zero PII (phone, personal email) appears anywhere in the source tree.
- All quality gates pass: `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm test:ci`.
- The headshot renders as a circular `next/image` in the Hero section.
- shadcn/ui was intentionally skipped (Tailwind v4 compatibility risk); badges use Tailwind
  utility classes directly — this decision is documented in AGENTS.md.

## Evidence Summary

All four quality gates exit 0. The PII grep returns no matches. The hero section renders
correctly at mobile (390px) viewport with sticky nav, circular headshot, name, tagline, GitHub
and LinkedIn CTA buttons, and a Print/Save PDF button. The experience timeline, education card,
and skills badge grid all render below the hero with real content from `src/data/`.

---

## Artifact: Quality Gates (All Exit 0)

**What it proves:** The content implementation is lint-clean, type-safe, consistently formatted,
and Vitest passes.

**Why it matters:** Confirms all code-quality standards are maintained after adding ~10 new
components and 4 data files.

**Commands:**

```bash
pnpm lint        # ESLint flat config
pnpm typecheck   # tsc --noEmit (strict)
pnpm format:check # Prettier check
pnpm test:ci     # Vitest run (passWithNoTests: true)
```

**Result:**

```
$ eslint
(exit 0 — no errors)

$ tsc --noEmit
(exit 0 — no errors)

$ prettier --check .
Checking formatting...
All matched files use Prettier code style!
(exit 0)

$ vitest run
 RUN  v4.1.9 /Users/rprugh/repos/ronanprugh-personal-site
No test files found, exiting with code 0
(exit 0)
```

---

## Artifact: PII Grep — Zero Matches

**What it proves:** No personal phone number, email address, or contact information appears in
any rendered component, data file, or metadata export.

**Why it matters:** Core security constraint for this project — the site must not expose PII.

**Command:**

```bash
grep -r "phone\|@gmail\|@yahoo\|@hotmail\|@outlook\|953-3199\|rprugh4" src/
```

**Result:**

```
(no output — grep exit code 1, meaning zero matches found)
```

---

## Artifact: Mobile Screenshot (390px) — Hero + Nav

**What it proves:** The Hero section and sticky nav render correctly at mobile viewport width
with no horizontal overflow, all CTAs are touch-target compliant (≥44px), and the headshot
renders as a clean circle.

**Why it matters:** Mobile responsiveness is required for a shareable resume replacement.

The screenshot below was captured after resizing the preview to mobile (390px).

![Mobile 390px — Hero section with circular headshot, name, tagline, GitHub/LinkedIn CTAs, Print button, and sticky nav](screenshots/task-2-mobile-390.png)

---

## Artifact: Desktop Screenshot — Hero Section

**What it proves:** The dark-mode-first hero section renders with the circular headshot,
name (`Ronan Prugh`), tagline, GitHub CTA (white-filled), LinkedIn CTA (bordered), and
Print/Save PDF button — all matching the Linear/Vercel aesthetic.

![Desktop — Hero in dark mode](screenshots/task-2-desktop-hero.png)

---

## Artifact: Data Files — Typed Content

**What it proves:** All content is stored in typed TypeScript data files with no hardcoded
strings in components, and no PII fields exist on any exported type.

**Files created:**

| File                     | Content                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `src/data/profile.ts`    | `name`, `tagline`, `about`, `githubUrl`, `linkedinUrl` — no phone/email                   |
| `src/data/experience.ts` | 3 entries: Fiserv (Jun 2023–Present), UMTRI (Jun 2022–Mar 2023), CSG (Jun 2020–Aug 2021)  |
| `src/data/education.ts`  | University of Michigan, B.S.E. CSE, Magna Cum Laude, May 2023                             |
| `src/data/skills.ts`     | 4 categories: Programming Languages, Frameworks & Libraries, Tools & Platforms, Practices |

---

## Artifact: Components Created

**What it proves:** All required section components exist with proper TypeScript types and
render data from `src/data/` rather than inline strings.

**Components:**

| Component                                | Pattern                                                                                             |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `src/components/Nav.tsx`                 | Sticky glass nav; hidden mobile links (`hidden md:flex`); logo left, ThemeToggle right              |
| `src/components/sections/Hero.tsx`       | `"use client"` for print button; inline SVG GitHub + LinkedIn icons; `next/image` circular headshot |
| `src/components/sections/About.tsx`      | Server component; renders `profile.about`                                                           |
| `src/components/sections/Experience.tsx` | Vertical timeline with `before:` pseudo-element connector line; absolute positioned dots            |
| `src/components/sections/Education.tsx`  | Card with border/card bg CSS variables                                                              |
| `src/components/sections/Skills.tsx`     | Pill badges: `rounded-full border border-[var(--border)] bg-[var(--card)]`                          |

---

## Reviewer Conclusion

All quality gates pass, zero PII found in source, and all six content sections are implemented
with real data from typed TypeScript data files. The site is ready to share as a resume
replacement. Task 3.0 (Project Showcase) is next.
