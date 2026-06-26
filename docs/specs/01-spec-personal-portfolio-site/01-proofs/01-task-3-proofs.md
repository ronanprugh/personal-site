# Task 3.0 Proofs — Project Showcase (Grid & Detail Pages)

## Task Summary

This task adds a data-driven Projects section to the homepage and two statically-generated
`/projects/[slug]` detail pages for `score-mate` and `espn-fantasy-stats`. Project descriptions
and tech stacks are sourced from the sibling repos' README files. Adding a new project in the
future requires only a single entry in `src/data/projects.ts`.

## What This Task Proves

- The Projects section renders two clickable cards with names, descriptions, and tech stack badges.
- `/projects/score-mate` and `/projects/espn-fantasy-stats` are prerendered as static HTML via `generateStaticParams`.
- `pnpm build` completes successfully and lists both slugs as `● (SSG)` routes.
- All quality gates pass: `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm test:ci`.

## Evidence Summary

`pnpm build` outputs both project slugs under `● /projects/[slug]` with `(SSG)` — confirming
`generateStaticParams` is wired correctly. The Projects section screenshot shows both cards
rendering with descriptions and tech-stack pill badges. The detail route handles an unknown slug
with `notFound()` and renders per-project `generateMetadata`.

---

## Artifact: Build Output — Static Params

**What it proves:** Both project slugs are prerendered at build time as static HTML, confirming
`generateStaticParams` returns the correct paths.

**Why it matters:** Static generation is required for the production deploy to work correctly
without a Node.js runtime per-request.

**Command:**

```bash
pnpm build
```

**Result:**

```
Route (app)
┌ ○ /
├ ○ /_not-found
└ ● /projects/[slug]
  ├ /projects/score-mate
  └ /projects/espn-fantasy-stats

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)
```

---

## Artifact: Quality Gates (All Exit 0)

**What it proves:** The Project Showcase implementation is lint-clean, type-safe, and
consistently formatted.

**Commands:**

```bash
pnpm lint && pnpm typecheck && pnpm format:check && pnpm test:ci
```

**Result:** All exit 0 — no errors.

---

## Artifact: Projects Section Screenshot

**What it proves:** Both ProjectCard components render with project name, short description,
and tech stack badges (max 5 shown + overflow count). Cards are link-wrapped with hover
accent border transition.

**Why it matters:** This is the primary homepage artifact demonstrating the project showcase
feature is visible to visitors.

![Projects section showing ScoreMate and ESPN Fantasy Stats cards with tech stack badges](screenshots/task-3-projects-section.png)

---

## Artifact: Data File — `src/data/projects.ts`

**What it proves:** All project content is in a single typed TypeScript data file. No
hardcoded strings in components. Adding a third project requires one new object in the array.

**Interface:**

```typescript
interface Project {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  imagePath: string;
}
```

**Projects exported:** `score-mate`, `espn-fantasy-stats`

---

## Artifact: Detail Route — `/projects/[slug]/page.tsx`

**What it proves:** Each project gets its own statically-generated page with:

- `generateMetadata` for per-project SEO title + description
- `generateStaticParams` for static generation
- `notFound()` for unknown slugs
- Project image, full description, tech stack badges, GitHub link, optional demo link

**Key behaviors:**

- Unknown slug → `notFound()` (renders Next.js 404)
- `espn-fantasy-stats` → "Live Demo" button (has `demoUrl`)
- `score-mate` → GitHub-only (no `demoUrl`)

---

## Reviewer Conclusion

Both project slugs are statically prerendered at build time, the homepage Projects section
renders two fully-featured cards, and the detail pages handle per-project metadata and optional
demo links. Task 4.0 (SEO, OG image, print CSS, custom domain) is next.
