# 01 Questions Round 1 - Personal Portfolio Site

Please answer each question below (select one or more options, or add notes). Add additional context anywhere it helps.

---

## 1. Tech Stack & Framework

What should this site be built with?

- [x] (A) **Next.js (App Router) + TypeScript + Tailwind** — same stack as your `score-mate` repo; gives you SSR/SSG, easy Vercel deploy, room to add interactive project pages later.
- [ ] (B) **Astro + TypeScript + Tailwind** — content-first static site generator, extremely fast, ideal for portfolio/resume use cases, can embed React islands if needed.
- [ ] (C) **Plain static site (HTML/CSS/JS) or a simple framework like 11ty** — minimal, no build complexity, easy to host anywhere.
- [ ] (D) Other (describe)

**Current best-practice context:** For personal portfolio sites in 2026, the dominant patterns are (1) Astro for content-heavy static portfolios (fastest, simplest) and (2) Next.js when you anticipate hosting interactive sub-apps on the same domain. React-only SPAs (CRA, Vite SPA) are no longer recommended for content sites because of SEO and Core Web Vitals penalties.

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- You already use Next.js in `score-mate`, so the learning curve is zero and patterns carry over.
- Next.js makes it straightforward to later host interactive project pages (e.g., a `score-mate`-style demo) at routes like `/projects/score-mate/demo` on the same domain.
- Astro (B) would be slightly faster and simpler for a pure resume site, but adds friction if you later want to embed real app demos.
- (C) is the lightest but limits future expansion the most.

---

## 2. Hosting & Deployment

Where will the site be hosted?

- [x] (A) **Vercel** — first-class Next.js support, generous free tier, automatic preview deploys per PR, custom domain support.
- [ ] (B) **Netlify** — comparable to Vercel, framework-agnostic.
- [ ] (C) **GitHub Pages** — free, but static-only and weaker for Next.js dynamic features.
- [ ] (D) **Cloudflare Pages** — fast edge network, free tier, good for static + serverless.
- [ ] (E) Other (describe)

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- Best DX for Next.js (matches the recommendation in Q1) and you appear to already have Vercel MCP tooling available.
- Free tier is enough for a personal portfolio.
- Preview deploys make iteration safe.

---

## 3. Custom Domain

Will you use a custom domain?

- [ ] (A) **Yes — I already own one** (please specify in notes).
- [x] (B) **Yes — I want to register one as part of this work** (e.g., `ronanprugh.com`, `ronanprugh.dev`).
- [] (C) **No — use the default `*.vercel.app` (or equivalent) URL for now.**

**Recommended answer(s):** [(B) if not already owned]

**Why these are recommended:**

- A custom domain (especially `.com` or `.dev`) is the single biggest credibility lift when sending the link in place of a resume.
- Cost is ~$10–15/year; trivial relative to portfolio value.

---

## 4. What does "host my personal projects from this site" mean concretely?

How should `espn-fantasy-stats`, `score-mate`, and future projects appear on the site?

- [x] (A) **Showcase pages only** — a `/projects/<name>` page per project with screenshots, description, tech stack, and links to GitHub + (if applicable) the project's separately hosted live demo. **No code migration.**
- [ ] (B) **Showcase + embedded screenshots/video walkthroughs** — same as (A) but with richer media (recorded demos, GIFs).
- [] (C) **Showcase + live read-only embeds** — same domain hosts an iframe/subroute pointing to the actual deployed app (which may live elsewhere).
- [ ] (D) **Full migration** — physically move the source for `score-mate` / `espn-fantasy-stats` into this repo as sub-apps and serve them from `ronanprugh.com/score-mate`, etc.
- [ ] (E) Other (describe)

**Recommended answer(s):** [(A)] for this spec, with a clear note that (B) or (C) can be later specs per project.

NOTE - If possible, I would like the apps to live at ronanprugh.com/{appname}, so whatever method would work best for that. I understand this is likely a different spec, but keep that in mind

**Why these are recommended:**

- (D) is a large multi-spec effort: `espn-fantasy-stats` has its own backend + Docker; merging it would dominate this spec and bury the actual goal (a sendable portfolio).
- (A) lets you ship a credible portfolio in days, not weeks, and still satisfies "active portfolio I can send instead of a resume."
- Live demos / migrations can be added incrementally as separate specs without re-architecting this site.

---

## 5. Contact / How People Can Reach You

You said no phone/email visible. How should someone reach out?

- [x] (A) **LinkedIn link + GitHub link only** — recruiters reach out via LinkedIn.
- [ ] (B) **LinkedIn + GitHub + contact form** that emails you (email stays hidden on the page).
- [ ] (C) **LinkedIn + GitHub + obfuscated email** (e.g., a "click to reveal" or a `mailto:` triggered by a button so bots don't scrape it).
- [ ] (D) Other (describe)

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- Simplest, no backend/email-service dependency, no spam vector.
- LinkedIn is the standard channel for recruiter outreach in a resume-replacement context.
- A contact form (B) is a meaningful addition but adds a service dependency (Resend, Formspree, etc.) — fine to add later as its own spec.

---

## 6. Resume / CV Download

Should the site offer a downloadable resume?

- [ ] (A) **Yes — a "Download Resume (PDF)" button** linking to a PDF you provide.
- [ ] (B) **No — the site IS the resume.**
- [x] (C) **Yes, and generate the PDF from the site content** at build time.

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- Many recruiters/ATS still want a PDF to forward.
- (C) adds build complexity for marginal benefit on v1.

---

## 7. Site Sections / Information Architecture

Which sections should v1 include? (Select all that apply.)

- [x] (A) **Hero** — name, headshot, one-line tagline, primary CTAs (GitHub, LinkedIn, resume).
- [x] (B) **About** — short paragraph in your voice.
- [x] (C) **Experience / Job History** — timeline of roles.
- [x] (D) **Education** — degrees, school, dates.
- [x] (E) **Skills / Credentials** — languages, frameworks, certifications.
- [ ] (F) **Projects** — `score-mate`, `espn-fantasy-stats`, and future ones (see Q4).
- [ ] (G) **Writing / Blog** — optional, can be added later.
- [] (H) Other (describe)

**Recommended answer(s):** [(A), (B), (C), (D), (E), (F)] — skip (G) for v1.

**Why these are recommended:**

- These six cover everything a resume contains plus the project showcase that differentiates this from a static resume.
- Blog (G) is high-maintenance and not required for the "active portfolio" goal; defer to its own spec if/when you want it.

---

## 8. Visual Design Direction

What aesthetic do you want?

- [ ] (A) **Clean, minimal, typographic** (think personal sites of senior engineers — lots of whitespace, one accent color, system fonts or one display font).
- [x] (B) **Modern dark-mode-first with subtle gradients/animations** (think Linear, Vercel marketing).
- [ ] (C) **Playful / illustrated** (custom illustrations, color, personality).
- [ ] (D) **Match an existing site I'll share** (paste URL in notes).
- [ ] (E) Other (describe)

**Recommended answer(s):** [(A) or (B)]

**Why these are recommended:**

- Both read as professional in recruiter contexts and are achievable with Tailwind + shadcn/ui in days.
- (A) ages best and is the safest for a resume-replacement context.
- (B) is more visually distinctive but requires more design polish to avoid feeling generic.
  Let's do B, but make Light mode optional NOTE <-

---

## 9. Dark Mode

- [x] (A) **Light + dark mode toggle, respects system preference.**
- [ ] (B) **Dark only.**
- [ ] (C) **Light only.**

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- Standard expectation for technical portfolio sites in 2026.
- Tailwind + Next.js makes this trivial.

---

## 10. Headshot — Source & Handling

How will the headshot be supplied?

- [x] (A) **I'll provide a high-res image file** (place it in `/public/`).
- [ ] (B) **Pull from an existing source** (LinkedIn, GitHub avatar — please specify URL).
- [ ] (C) **I need to take/get one taken** before this can ship.

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- Avoids hotlinking and gives you control over crop/quality.
- Site can ship as soon as you drop the file in.

---

## 11. Content Source for Experience / Education / Skills

Where will the actual resume content come from?

- [x] (A) **I'll paste my resume content into the conversation / a markdown file** and you structure it.
- [ ] (B) **Use my LinkedIn export** (I'll attach it).
- [ ] (C) **Read from my existing resume file** (specify path).

**Recommended answer(s):** [(A) or (C)]

**Why these are recommended:**

- Easiest to keep authoritative and accurate.
- Avoids guessing at job titles/dates.

---

## 12. Analytics

- [x] (A) **None** — keep it simple, no tracking.
- [ ] (B) **Privacy-friendly analytics** (Plausible, Vercel Analytics, Fathom) — see who's visiting without cookies.
- [ ] (C) **Google Analytics.**

**Recommended answer(s):** [(B) — Vercel Analytics, since it's one-click if you pick Vercel hosting]

**Why these are recommended:**

- Useful signal (did the recruiter click the link?) without the privacy/cookie overhead.
- One-click enable on Vercel; free tier sufficient.

---

## 13. SEO / Open Graph

- [x] (A) **Yes** — proper `<title>`, meta description, Open Graph image so the link looks good when shared in LinkedIn/Slack/iMessage.
- [ ] (B) **Skip for v1.**

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- An ugly link preview when a recruiter shares your site internally is a missed first impression — fixing OG metadata is cheap and high-leverage.

---

## 14. Scope: Project Migration Path

Confirming the scope split (related to Q4):

- [x] (A) **This spec covers ONLY the portfolio site + project showcase pages.** Any live-embedding or full migration of `score-mate` / `espn-fantasy-stats` happens in separate follow-on specs.
- [ ] (B) **This spec must also fully migrate `score-mate` into the new site.**
- [ ] (C) **This spec must also fully migrate `espn-fantasy-stats` (including backend) into the new site.**
- [ ] (D) **This spec must fully migrate BOTH.**

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- Keeps the spec demoable end-to-end in a reasonable timeframe.
- `espn-fantasy-stats` in particular has a backend + Docker setup; bundling that migration here would dominate the spec and delay the "sendable portfolio" goal.
- Migration of each app can be its own focused spec once the portfolio is live.

---

Once you've answered, let me know and I'll re-check whether the context is now sufficient and generate the full spec (or, if needed, a short follow-up round).
