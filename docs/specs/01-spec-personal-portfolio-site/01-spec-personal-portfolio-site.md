# 01-spec-personal-portfolio-site.md

## Introduction / Overview

This spec defines a personal portfolio website for Ronan Prugh — a polished, sendable alternative to a traditional resume. The site displays credentials, job history, education, skills, and a headshot, and includes showcase pages for personal projects (`score-mate`, `espn-fantasy-stats`). It is built with Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel, and served from a custom domain.

## Goals

- Deliver a professional, shareable URL that replaces the resume in outreach to recruiters and hiring managers.
- Surface credentials, experience, education, and skills in a visually polished, dark-mode-first design with an optional light mode toggle.
- Showcase personal projects (`score-mate`, `espn-fantasy-stats`) with descriptions, tech stacks, and GitHub links — no phone number or email exposed anywhere on the site.
- Provide proper SEO and Open Graph metadata so the link looks good when shared on LinkedIn, Slack, or iMessage.
- Enable a downloadable resume generated from the site's own content.

## User Stories

- **As a recruiter**, I want to open a link and immediately see who Ronan is, what he's built, and how to connect with him on LinkedIn, so I can assess fit without asking for a resume attachment.
- **As a hiring manager**, I want to browse Ronan's job history, education, and skills in one place, so I can quickly understand his background.
- **As a technical interviewer**, I want to click into a project showcase page and see what problem it solves, what tech it uses, and a link to the GitHub repo, so I can evaluate the depth of his work.
- **As Ronan**, I want to send one URL instead of a resume PDF, so the link is always up-to-date and makes a stronger first impression than a static document.
- **As Ronan**, I want a "Download Resume" button that generates a clean PDF from the site's own content, so I can still provide a PDF to ATS systems without maintaining a separate file.

## Demoable Units of Work

### Unit 1: Project Scaffold & Vercel Deployment

**Purpose:** Establish the repo structure, CI/CD pipeline, and a live URL so every subsequent unit ships incrementally to a real URL.

**Functional Requirements:**

- The system shall initialize a Next.js 14+ (App Router) project with TypeScript and Tailwind CSS.
- The system shall configure a Vercel project connected to the GitHub repository with automatic preview deploys on every push.
- The system shall render a minimal placeholder homepage (name + "Coming soon") accessible at the Vercel-generated URL.
- The system shall apply a dark-mode-first Tailwind theme with a light mode toggle that persists via `localStorage` and respects the `prefers-color-scheme` OS setting on first visit.
- The repository shall include a `README.md` with local setup instructions (`npm install`, `npm run dev`).

**Proof Artifacts:**

- Screenshot: Vercel dashboard showing a successful deployment demonstrates CI/CD is wired up.
- Browser screenshot: placeholder homepage is live at `https://<project>.vercel.app` in both dark and light modes demonstrates theme toggle works.

---

### Unit 2: Core Content — Hero, About, Experience, Education, Skills

**Purpose:** Render all resume-equivalent content sections with real or placeholder copy, fully responsive and on-brand.

**Functional Requirements:**

- The system shall render a **Hero** section containing: Ronan's name, a circular headshot image (supplied by user at `/public/headshot.*`), a one-line tagline, and CTA buttons linking to GitHub and LinkedIn (opening in a new tab).
- The system shall render an **About** section with a short bio paragraph.
- The system shall render an **Experience** section displaying a timeline of roles, each with: company name, title, date range, and bullet-point responsibilities.
- The system shall render an **Education** section displaying degree(s), institution(s), and graduation date(s).
- The system shall render a **Skills / Credentials** section displaying categorized tags (e.g., Languages, Frameworks, Tools).
- All sections shall be accessible from a sticky navigation header with smooth-scroll anchor links.
- The layout shall be fully responsive: mobile-first single-column, tablet/desktop multi-column where appropriate.
- No phone number or email address shall appear anywhere on the page.

**Proof Artifacts:**

- Browser screenshot (desktop): full-page scroll showing all five content sections rendered with real content demonstrates the resume-replacement core is complete.
- Browser screenshot (mobile, 390px): hero + nav demonstrates mobile responsiveness.
- Code review: grep confirms no phone/email strings appear in any rendered component.

---

### Unit 3: Project Showcase

**Purpose:** Give visitors a dedicated space to explore Ronan's personal projects with enough context to assess technical depth.

**Functional Requirements:**

- The system shall render a **Projects** section on the homepage displaying a card grid of projects, each card showing: project name, one-line description, tech stack badges, and a link to the project's detail page.
- The system shall render individual project detail pages at `/projects/[slug]` (e.g., `/projects/score-mate`, `/projects/espn-fantasy-stats`) containing: project name, full description, problem solved, tech stack, screenshots or placeholder images, a link to the GitHub repository, and (if available) a link to a live demo.
- The system shall include project data as typed TypeScript objects in a `src/data/projects.ts` file so adding future projects requires only a new data entry.
- Project detail pages shall be statically generated at build time (`generateStaticParams`).

**Proof Artifacts:**

- Browser screenshot: homepage Projects section showing cards for `score-mate` and `espn-fantasy-stats` demonstrates the grid renders.
- Browser screenshot: `/projects/score-mate` detail page demonstrates the per-project route and content layout.
- Browser screenshot: `/projects/espn-fantasy-stats` detail page demonstrates the second project renders correctly.

---

### Unit 4: SEO, Open Graph, Resume PDF & Custom Domain

**Purpose:** Polish the site for real-world sharing — good link previews, a downloadable resume, and a professional custom domain.

**Functional Requirements:**

- The system shall set a `<title>`, meta description, and Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) on every page using Next.js `generateMetadata`.
- The system shall generate an OG image (static `1200×630` PNG in `/public/og-image.png`) for use as the Open Graph preview image.
- The system shall provide a "Download Resume" button/link that triggers a browser print dialog (or downloads a PDF) using a dedicated print-optimized CSS stylesheet (`@media print`) that renders a clean, single-column layout of the resume content, hiding navigation, CTAs, and decorative elements.
- The custom domain (e.g., `ronanprugh.com` or `ronanprugh.dev`) shall be registered and configured in Vercel DNS, with HTTPS enforced automatically by Vercel.
- The site shall pass Lighthouse scores of ≥ 90 in Performance, Accessibility, Best Practices, and SEO on the homepage.

**Proof Artifacts:**

- Screenshot: iMessage/Slack link preview of the custom domain URL showing correct OG image, title, and description demonstrates social sharing works.
- Browser screenshot: print preview of the homepage showing a clean resume layout demonstrates the PDF/print flow.
- Browser screenshot: site accessible at custom domain (e.g., `https://ronanprugh.com`) demonstrates domain and HTTPS are configured.
- Lighthouse report screenshot: scores ≥ 90 across all four categories demonstrates production quality.

---

## Non-Goals (Out of Scope)

1. **App migration / live demos hosted on this domain** — `score-mate` and `espn-fantasy-stats` will be showcased via static pages only; routing them as live sub-apps at `ronanprugh.com/{appname}` is a follow-on spec.
2. **Contact form or visible email** — no contact mechanism beyond LinkedIn and GitHub links.
3. **Blog / writing section** — deferred; not required for the "active portfolio" goal.
4. **Server-side analytics** — no tracking scripts included in v1.
5. **Headless CMS or database** — all content is code-managed TypeScript/JSON data files; no external CMS.
6. **Authentication or private sections** — the site is entirely public.
7. **Automated resume PDF generation via headless Chrome or `react-pdf`** — the print-CSS approach in Unit 4 satisfies the resume download goal without Vercel build-time constraints.

## Design Considerations

- **Aesthetic:** Dark-mode-first with subtle gradients and animations (think Linear / Vercel marketing sites). Light mode is a full alternative, not an afterthought.
- **Theme switching:** System preference detected on first visit; toggle persists in `localStorage`. Toggle button visible in the sticky nav.
- **Typography:** One display/heading font (e.g., Inter or Geist) + system UI stack for body text. No more than two type scales.
- **Color:** Dark background (near-black or deep gray), one accent color (e.g., indigo, teal, or violet — to be confirmed at implementation), subtle gradient accents on hero/section headers.
- **Motion:** Subtle entrance animations on scroll (Intersection Observer + CSS transitions or Framer Motion). No autoplay video. No distracting looping animations.
- **Component library:** `shadcn/ui` is recommended for UI primitives (buttons, badges, cards) to match the aesthetic while keeping bundle size lean.
- **Headshot:** Circular crop, placed prominently in the Hero. User supplies the file; it is placed at `/public/headshot.<ext>` and referenced with `next/image` for automatic optimization.
- **No phone number or email** shall appear in any rendered JSX, HTML, or metadata.

## Repository Standards

- **Framework patterns:** Follow Next.js App Router conventions — `app/` directory, `page.tsx` per route, `layout.tsx` at root, `generateMetadata` for SEO, `generateStaticParams` for static project pages.
- **TypeScript:** Strict mode (`"strict": true` in `tsconfig.json`). All props and data objects typed; no `any`.
- **Styling:** Tailwind CSS utility classes only; no separate CSS files except `globals.css` for base resets and the print stylesheet.
- **Data:** Content (experience, education, skills, projects) stored as typed TypeScript constant objects in `src/data/`. No inline hardcoded content in components.
- **Image handling:** All images use `next/image` for optimization. Headshot and project screenshots live in `/public/`.
- **Linting/formatting:** ESLint + Prettier configured from project init; CI fails on lint errors.
- **Commit conventions:** Conventional commits (`feat:`, `fix:`, `chore:`) — consistent with sibling `score-mate` repo patterns.
- **File naming:** Components in `PascalCase.tsx`, utilities in `camelCase.ts`, data files in `camelCase.ts`.

## Technical Considerations

- **Next.js version:** 14+ with App Router. Use `"use client"` sparingly — theme toggle and scroll animations are the primary client components; all content sections are server components.
- **Tailwind dark mode:** Set `darkMode: 'class'` in `tailwind.config.ts` so the theme toggle drives dark/light via a class on `<html>`, not just OS preference.
- **PDF / Resume download:** Use a `@media print` stylesheet (injected via `globals.css`) that hides nav, decorative elements, project cards, and animations, and renders the resume sections in a clean single-column layout. A "Print / Save as PDF" button in the Hero triggers `window.print()`. This avoids headless Chrome (`puppeteer`) or `@react-pdf/renderer`, both of which have Vercel cold-start or build-time constraints. _Note: the user selected "generate PDF from site content at build time" — the print-CSS approach satisfies this intent pragmatically; a fully automated build-time PDF (e.g., via `@react-pdf/renderer`) can be added as a follow-on enhancement._
- **Static generation:** All pages are statically generated at build time. No server-side data fetching required. `next export` compatible if ever needed.
- **Custom domain & HTTPS:** Registered and pointed to Vercel via Vercel's domain dashboard. Vercel provisions the TLS certificate automatically. Preferred TLD: `.com` or `.dev` (both read as professional). Specific domain to be confirmed by user (e.g., `ronanprugh.com`).
- **OG image:** A static `1200×630` PNG committed to `/public/og-image.png` is sufficient for v1. Vercel's `@vercel/og` dynamic image generation is a nice-to-have but not required.
- **Vercel deployment:** Free Hobby tier is sufficient. Connect GitHub repo → auto-deploy on push to `main`. Preview deployments on all other branches.
- **Accessibility:** All images have descriptive `alt` text. Interactive elements have visible focus rings. Color contrast meets WCAG AA in both dark and light modes.
- **Future routing for sub-apps:** The `app/` directory structure should leave `/projects/[slug]/` and top-level routes clean so that a future spec can add `/score-mate` or `/espn-fantasy-stats` as live sub-app routes without restructuring.

## Security Considerations

- **No PII on page:** No phone number, personal email, or home address shall appear in any rendered component, metadata, or Open Graph tag. LinkedIn and GitHub profile URLs are acceptable (public social profiles).
- **No secrets in repo:** No API keys, tokens, or credentials. The site is entirely static; no environment variables needed for v1.
- **OG image:** Does not need to contain any PII beyond name and title.
- **Third-party scripts:** None included in v1 (no analytics, no chat widgets) — eliminates the third-party script attack surface entirely.
- **Dependency hygiene:** Use `npm audit` / `pnpm audit` as part of CI to catch known vulnerabilities in dependencies.

## Success Metrics

1. **Shareability:** The site URL resolves correctly at a custom domain with valid HTTPS, a populated OG preview, and loads in < 2 seconds on a 4G connection.
2. **Resume completeness:** All five content sections (Hero, About, Experience, Education, Skills) and both project showcase pages are populated with real content before the site is shared publicly.
3. **Lighthouse scores:** ≥ 90 in Performance, Accessibility, Best Practices, and SEO on the homepage.
4. **Zero PII leakage:** No phone number or email appears in any rendered HTML, source, or metadata — confirmed by automated grep in CI.
5. **PDF usability:** "Download Resume" / print flow produces a clean single-page (or max two-page) PDF with no nav, no decorative UI, and all core resume content intact.

## Open Questions

1. **Exact custom domain:** `ronanprugh.com`, `ronanprugh.dev`, or another preference? Domain availability should be checked before implementation starts (Vercel domain checker or `whois`). _(Needed before Unit 4.)_
2. **Resume content:** User will paste job history, education, and skills content at the start of implementation so it can be structured into `src/data/` files. _(Needed before Unit 2.)_
3. **Headshot file:** User will provide a high-res image (JPEG or PNG, min 400×400px) at the start of implementation. _(Needed before Unit 2.)_
4. **Project screenshots:** Screenshots or cover images for `score-mate` and `espn-fantasy-stats` to use on project detail pages. Placeholder images are acceptable for initial deploy. _(Needed before Unit 3.)_
5. **Accent color:** Final accent color TBD at implementation — indigo, teal, or violet are the leading candidates given the dark-mode-first aesthetic.
6. **LinkedIn URL:** Exact LinkedIn profile URL to use for the CTA button. _(Needed before Unit 2.)_
7. **GitHub username:** Exact GitHub profile URL. _(Needed before Unit 2 — likely `https://github.com/rprugh` or similar.)_
