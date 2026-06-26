# 01-tasks-personal-portfolio-site.md

## Relevant Files

| File                                     | Why It Is Relevant                                                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `package.json`                           | Created at init; defines all dependencies and pnpm scripts (`dev`, `build`, `lint`, `typecheck`, `format:check`, `test:ci`). |
| `pnpm-lock.yaml`                         | pnpm lockfile; committed to repo.                                                                                            |
| `tsconfig.json`                          | TypeScript strict mode config (`"strict": true`).                                                                            |
| `next.config.ts`                         | Next.js 16 config (minimal for v1; no server actions or external image domains beyond `/public/`).                           |
| `eslint.config.mjs`                      | ESLint flat config matching `score-mate` pattern: `core-web-vitals` + `typescript` + `prettier`.                             |
| `.prettierrc`                            | Prettier config (matches `score-mate`).                                                                                      |
| `commitlint.config.mjs`                  | Enforces conventional commit format (`feat:`, `fix:`, `chore:`, etc.).                                                       |
| `.github/workflows/ci.yml`               | CI pipeline: runs `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm test:ci` on every push/PR.                       |
| `AGENTS.md`                              | Repo conventions for agents and humans (stack, file layout, quality gates, commit conventions).                              |
| `README.md`                              | Local setup instructions (`pnpm install`, `pnpm dev`).                                                                       |
| `src/app/layout.tsx`                     | Root layout: wraps app in `ThemeProvider`, sets global font, and exports `generateMetadata` for homepage SEO.                |
| `src/app/page.tsx`                       | Homepage: composes Hero, About, Experience, Education, Skills, and Projects sections in order.                               |
| `src/app/globals.css`                    | Tailwind v4 import (`@import "tailwindcss"`), base resets, `@variant dark` class config, `@media print` resume styles.       |
| `src/app/projects/[slug]/page.tsx`       | Dynamic project detail route with `generateStaticParams` and `generateMetadata`.                                             |
| `src/components/Nav.tsx`                 | Sticky navigation header with anchor links and `ThemeToggle`. Server component except for toggle wiring.                     |
| `src/components/ThemeProvider.tsx`       | `"use client"` — reads `localStorage` and system preference on mount; sets `dark` class on `<html>`.                         |
| `src/components/ThemeToggle.tsx`         | `"use client"` — sun/moon icon button that calls `ThemeProvider` toggle function.                                            |
| `src/components/sections/Hero.tsx`       | Hero section: circular headshot (`next/image`), name, tagline, GitHub CTA, LinkedIn CTA, Print Resume button.                |
| `src/components/sections/About.tsx`      | About section: short bio paragraph from `src/data/profile.ts`.                                                               |
| `src/components/sections/Experience.tsx` | Experience timeline: maps over `src/data/experience.ts` array.                                                               |
| `src/components/sections/Education.tsx`  | Education section: maps over `src/data/education.ts` array.                                                                  |
| `src/components/sections/Skills.tsx`     | Skills section: categorized badge tags from `src/data/skills.ts`.                                                            |
| `src/components/sections/Projects.tsx`   | Projects grid section: maps over `src/data/projects.ts` and renders `ProjectCard` per entry.                                 |
| `src/components/ProjectCard.tsx`         | Individual project card: name, one-line description, tech stack badges, link to `/projects/[slug]`.                          |
| `src/data/profile.ts`                    | Typed constant: name, tagline, about text, GitHub URL, LinkedIn URL. No phone/email.                                         |
| `src/data/experience.ts`                 | Typed array of work history objects (company, title, dates, bullet responsibilities).                                        |
| `src/data/education.ts`                  | Typed array of education objects (institution, degree, graduation date).                                                     |
| `src/data/skills.ts`                     | Typed categories of skills (Languages, Frameworks, Tools, etc.).                                                             |
| `src/data/projects.ts`                   | Typed array of project objects (slug, name, description, techStack, githubUrl, demoUrl?, imagePath).                         |
| `public/headshot.*`                      | User-supplied headshot image (JPEG/PNG, min 400×400px). Placeholder used until user provides file.                           |
| `public/og-image.png`                    | Static 1200×630 OG image for social sharing previews.                                                                        |
| `public/projects/score-mate.png`         | Cover image for the score-mate project detail page. Placeholder OK for initial deploy.                                       |
| `public/projects/espn-fantasy-stats.png` | Cover image for the espn-fantasy-stats detail page. Placeholder OK for initial deploy.                                       |

### Notes

- This is a greenfield Next.js 16 project using **pnpm** (not npm/yarn) — all install/run instructions use `pnpm`.
- Follow the `score-mate` sibling repo as the pattern reference for stack config, ESLint, commitlint, and CI.
- Tailwind v4 uses a CSS-first config (`@import "tailwindcss"` in `globals.css`, `@variant dark` for dark mode class) — there is no `tailwind.config.ts`.
- Use `"use client"` sparingly: only `ThemeProvider`, `ThemeToggle`, and the Print Resume button need client-side behavior. All content sections are server components.
- Tests for this spec are primarily proof-artifact based (screenshots, build output, grep). Vitest unit tests are set up as part of the CI scaffold (Task 1.0) but no component unit tests are required in v1 — this is noted in the audit as a flagged risk.
- Colocate any future unit tests with their source file (e.g., `Hero.tsx` and `Hero.test.tsx` in the same directory).

---

## Tasks

### [x] 1.0 Project Scaffold, Theme System & Vercel Deployment

**Purpose:** Initialize the Next.js 16 repo with pnpm, configure Tailwind v4 with dark-mode-first class strategy, wire up the theme toggle, and deploy to Vercel — establishing the live URL and CI/CD pipeline that all subsequent units ship to.

#### 1.0 Proof Artifact(s)

- Screenshot: Vercel dashboard showing a green "Ready" deployment for the `main` branch demonstrates CI/CD is wired up.
- Browser screenshot: placeholder homepage at `https://<project>.vercel.app` rendered in dark mode (default) demonstrates Tailwind dark-mode-first theme is applied.
- Browser screenshot: same URL toggled to light mode demonstrates the theme toggle persists via `localStorage`.
- CLI: `pnpm lint && pnpm typecheck` both exit 0 in the terminal demonstrates quality gates pass from day one.

#### 1.0 Tasks

- [x] 1.1 Run `pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"` in the repo root; select **pnpm** as the package manager when prompted; verify `src/app/` and `src/app/globals.css` were created.
- [x] 1.2 In `src/app/globals.css`, replace the default Tailwind v3 directives with `@import "tailwindcss";` (Tailwind v4 syntax) and add `@variant dark (&:where(.dark, .dark *));` to enable class-based dark mode.
- [x] 1.3 Configure ESLint: install `eslint-config-next`, `eslint-config-prettier`; create `eslint.config.mjs` using the flat-config format from `score-mate/eslint.config.mjs` (`core-web-vitals` + `typescript` + `prettier`).
- [x] 1.4 Configure Prettier: add `.prettierrc` with settings matching `score-mate` (e.g., `"semi": true`, `"singleQuote": false`, `"trailingComma": "es5"`).
- [x] 1.5 Set up commitlint: `pnpm add -D @commitlint/cli @commitlint/config-conventional`; create `commitlint.config.mjs` identical to `score-mate/commitlint.config.mjs`.
- [x] 1.6 Create `src/components/ThemeProvider.tsx` as a `"use client"` component that (a) reads `localStorage.getItem("theme")` on mount, (b) falls back to `window.matchMedia("(prefers-color-scheme: dark)")`, and (c) adds/removes the `dark` class on `document.documentElement`; expose a `toggleTheme` function via React context.
- [x] 1.7 Create `src/components/ThemeToggle.tsx` as a `"use client"` button component that consumes the `ThemeProvider` context and renders a sun/moon icon from `lucide-react` (install if not present); the button shall have `min-h-11 min-w-11` for touch target compliance.
- [x] 1.8 Update `src/app/layout.tsx` to wrap children in `ThemeProvider` and include `<ThemeToggle />` in a temporary placeholder header (will be replaced in Task 2.0 by the full `Nav` component).
- [x] 1.9 Replace the contents of `src/app/page.tsx` with a minimal placeholder: centered `<h1>Ronan Prugh</h1>` and `<p>Coming soon</p>` — no personal contact info.
- [x] 1.10 Create `AGENTS.md` at the repo root documenting repo conventions: stack (Next.js 16, Tailwind v4, pnpm, Vitest), file layout (`src/app/`, `src/components/`, `src/data/`), quality gates (`pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm test:ci`), commit format (conventional commits), and SDD workflow path (`docs/specs/`).
- [x] 1.11 Create `README.md` with: project description, local setup (`pnpm install`, `pnpm dev`), available scripts, and link to `docs/specs/` for architecture context.
- [x] 1.12 Create `.github/workflows/ci.yml` that runs on every push and PR: steps are `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, and `pnpm test:ci`; use `actions/setup-node` with the pnpm caching strategy.
- [x] 1.13 Initialize git, commit everything with `chore: initial Next.js 16 scaffold with Tailwind v4 and theme system`, push to a new GitHub repository, and connect the repo to a new Vercel project (Vercel dashboard → "Import Git Repository"); confirm first deploy is green.

---

### [x] 2.0 Core Content Sections — Hero, About, Experience, Education, Skills

**Purpose:** Render all resume-equivalent sections with typed data-driven content, a sticky nav with smooth-scroll, and full mobile responsiveness — making the site shareable as a resume replacement.

#### 2.0 Proof Artifact(s)

- Browser screenshot (desktop, 1280px): full-page showing Hero (circular headshot, name, tagline, GitHub + LinkedIn CTAs, Print Resume button), About, Experience timeline, Education, and Skills sections rendered with real content demonstrates the resume-replacement core is complete.
- Browser screenshot (mobile, 390px): Hero section and sticky nav visible without horizontal scroll demonstrates mobile responsiveness.
- CLI: `grep -r "phone\|@gmail\|@yahoo\|@hotmail\|@outlook\|\.com[^/]" src/` returns no matches to personal contact info demonstrates zero PII leakage in source.
- Browser screenshot: sticky nav with at least two anchor links highlighted at mid-page scroll position demonstrates navigation works.

#### 2.0 Tasks

- [ ] 2.1 Create `src/data/profile.ts`: export a typed `Profile` const with fields `name`, `tagline`, `about` (multi-line string), `githubUrl`, `linkedinUrl`. Use placeholder values for URLs if not yet provided by user; **no phone number or email field**.
- [ ] 2.2 Create `src/data/experience.ts`: define and export a `WorkExperience` interface (`company`, `title`, `startDate`, `endDate | "Present"`, `responsibilities: string[]`) and export a typed `experience` array; populate with real job history (or placeholder entries if content not yet provided).
- [ ] 2.3 Create `src/data/education.ts`: define and export an `Education` interface (`institution`, `degree`, `field`, `graduationDate`) and export a typed `education` array.
- [ ] 2.4 Create `src/data/skills.ts`: define and export a `SkillCategory` interface (`category: string`, `items: string[]`) and export a typed `skills` array with at least three categories (e.g., Languages, Frameworks, Tools).
- [ ] 2.5 Install `shadcn/ui` (`pnpm dlx shadcn@latest init`); add the `badge` and `button` components (`pnpm dlx shadcn@latest add badge button`).
- [ ] 2.6 Create `src/components/Nav.tsx` (server component): renders a `<nav>` with `position: sticky; top: 0` styling, anchor links to `#hero`, `#about`, `#experience`, `#education`, `#skills`, `#projects`, and a slot for `<ThemeToggle />`; links use `scroll-smooth` via Tailwind `scroll-smooth` class on `<html>` in `layout.tsx`.
- [ ] 2.7 Create `src/components/sections/Hero.tsx`: renders the `#hero` section with a `next/image` circular-cropped headshot (use a gray placeholder square if `public/headshot.*` not yet present), `profile.name`, `profile.tagline`, GitHub CTA button (opens `profile.githubUrl` in `_blank`), LinkedIn CTA button (opens `profile.linkedinUrl` in `_blank`), and a "Print Resume" `"use client"` button that calls `window.print()`.
- [ ] 2.8 Create `src/components/sections/About.tsx`: renders the `#about` section displaying `profile.about`.
- [ ] 2.9 Create `src/components/sections/Experience.tsx`: renders the `#experience` section as a vertical timeline, mapping over `experience`; each entry shows company, title, date range, and bullet-point responsibilities.
- [ ] 2.10 Create `src/components/sections/Education.tsx`: renders the `#education` section mapping over `education`; each entry shows institution, degree + field, and graduation date.
- [ ] 2.11 Create `src/components/sections/Skills.tsx`: renders the `#skills` section; for each `SkillCategory`, render the category name as a subheading and each item as a `<Badge>` from shadcn/ui.
- [ ] 2.12 Update `src/app/page.tsx` to import and compose `<Nav />`, `<Hero />`, `<About />`, `<Experience />`, `<Education />`, and `<Skills />` in order; add `id` anchor attributes to each section's wrapper element.
- [ ] 2.13 Add `scroll-behavior: smooth` to `<html>` in `layout.tsx` (via Tailwind `className="scroll-smooth dark"` — `dark` class is added/removed by `ThemeProvider`); ensure `min-h-dvh` is used on the root element (not `min-h-screen`).
- [ ] 2.14 Manually verify responsiveness: open the site at 390px width (mobile) and 1280px (desktop) in browser DevTools; confirm no horizontal overflow and all sections are readable.
- [ ] 2.15 Run `grep -r "phone\|@gmail\|@yahoo\|@hotmail\|@outlook" src/` and confirm no matches; commit clean result as part of the task completion evidence.

---

### [x] 3.0 Project Showcase — Grid & Detail Pages

**Purpose:** Add a data-driven Projects section to the homepage and statically-generated `/projects/[slug]` detail pages for `score-mate` and `espn-fantasy-stats`, with a structure that makes adding future projects a one-line data change.

#### 3.0 Proof Artifact(s)

- Browser screenshot: homepage Projects section showing cards for `score-mate` and `espn-fantasy-stats` (each with name, one-line description, tech stack badges, and "View Project" link) demonstrates the card grid renders.
- Browser screenshot: `/projects/score-mate` detail page showing project name, full description, tech stack list, project image, and GitHub link demonstrates the per-project route and layout.
- Browser screenshot: `/projects/espn-fantasy-stats` detail page demonstrates the second slug renders with its own distinct content.
- CLI: `pnpm build` output in terminal showing `● /projects/score-mate` and `● /projects/espn-fantasy-stats` listed as static pages demonstrates `generateStaticParams` is working.

#### 3.0 Tasks

- [ ] 3.1 Create `src/data/projects.ts`: define and export a `Project` interface (`slug: string`, `name: string`, `shortDescription: string`, `fullDescription: string`, `techStack: string[]`, `githubUrl: string`, `demoUrl?: string`, `imagePath: string`); export a typed `projects` array with entries for `score-mate` and `espn-fantasy-stats` — populate descriptions and tech stacks from the README files in those sibling repos.
- [ ] 3.2 Add placeholder project images: copy or create simple 800×450 placeholder PNG files at `public/projects/score-mate.png` and `public/projects/espn-fantasy-stats.png` (a solid-color rectangle is fine); these will be replaced with real screenshots later.
- [ ] 3.3 Create `src/components/ProjectCard.tsx`: renders a card with project `name`, `shortDescription`, tech stack `<Badge>` list (shadcn/ui), and a "View Project" link to `/projects/[slug]`; use `next/link` for the link.
- [ ] 3.4 Create `src/components/sections/Projects.tsx`: renders the `#projects` section as a responsive grid (1 column on mobile, 2 on `md:`, 3 on `lg:`); maps over `projects` data and renders a `<ProjectCard />` per entry.
- [ ] 3.5 Update `src/app/page.tsx` to import and add `<Projects />` after `<Skills />`.
- [ ] 3.6 Create `src/app/projects/[slug]/page.tsx`:
  - Implement `generateStaticParams` that returns `projects.map(p => ({ slug: p.slug }))`.
  - Implement `generateMetadata({ params })` that returns `title` and `description` specific to each project.
  - Render the project detail layout: back link to `/#projects`, project name as `<h1>`, `next/image` project image, full description, tech stack badges, GitHub link button, and optional demo link button.
  - Return a 404 (`notFound()`) if the slug does not match any project in the data array.
- [ ] 3.7 Run `pnpm build` locally; confirm both project slugs appear in the build output as static (`○`) routes; fix any TypeScript or lint errors before committing.

---

### [x] 4.0 SEO, Open Graph, Print-CSS Resume & Custom Domain

**Purpose:** Polish the site for real-world sharing — proper social link previews, a clean printable resume, and a custom domain with HTTPS.

#### 4.0 Proof Artifact(s)

- Screenshot: Open Graph debugger (visit `https://www.opengraph.xyz/` and enter the custom domain URL) showing correct title, description, and OG image demonstrates social sharing works.
- Browser screenshot: browser print preview (File → Print, or Ctrl+P / Cmd+P) of the homepage showing a clean resume layout with nav and decorative elements hidden demonstrates the print-CSS flow.
- Browser screenshot: site accessible at the custom domain (e.g., `https://ronanprugh.com`) with a valid HTTPS padlock in the browser address bar demonstrates domain and TLS are configured.
- Screenshot: Lighthouse report (Chrome DevTools → Lighthouse tab → "Analyze page load") showing Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, and SEO ≥ 90 on the homepage demonstrates production quality.

#### 4.0 Tasks

- [ ] 4.1 Add root-level `generateMetadata` to `src/app/layout.tsx`: export a `metadata` object with `title` (e.g., `"Ronan Prugh — Software Engineer"`), `description` (2-sentence professional bio), `openGraph.title`, `openGraph.description`, `openGraph.url` (custom domain), `openGraph.images` pointing to `/og-image.png`, and `twitter.card: "summary_large_image"`.
- [ ] 4.2 Add page-level `generateMetadata` override to `src/app/projects/[slug]/page.tsx` so each project detail page has its own `title` (`"[Project Name] — Ronan Prugh"`) and `description` from the project data.
- [ ] 4.3 Create the OG image: design or export a 1200×630 PNG (name + tagline + optional accent graphic) and save it to `public/og-image.png`; verify it renders cleanly at thumbnail size.
- [ ] 4.4 In `src/app/globals.css`, add a `@media print` block that: sets `background: white; color: black` on `body`, hides `nav`, `.hero-ctas`, `.projects-section`, all motion/animation elements, and the theme toggle; renders Experience, Education, and Skills in a clean single-column layout with appropriate font sizes.
- [ ] 4.5 Update `src/components/sections/Hero.tsx`: ensure the "Print Resume" button (added in Task 2.7) has a `data-print-hide="false"` attribute or is otherwise **visible** in print layout (it should say "Print / Save as PDF" on-screen but be hidden in the actual print output via `@media print { .print-hide { display: none; } }`).
- [ ] 4.6 Register the custom domain (confirm preference with user — e.g., `ronanprugh.com` or `ronanprugh.dev`): add domain in Vercel project dashboard → Settings → Domains; update DNS nameservers or add CNAME/A records as instructed by Vercel; wait for TLS certificate to propagate (typically < 5 minutes on Vercel).
- [ ] 4.7 Run a Lighthouse audit in Chrome DevTools on the deployed custom domain URL; screenshot the scores; if any category is below 90, fix the flagged issues (common: missing `alt` text, contrast ratio failures, render-blocking resources) and re-run until all four scores are ≥ 90.
