# Task 1.0 Proofs — Project Scaffold, Theme System & Vercel Deployment

## Task Summary

This task establishes the entire development foundation: a Next.js 16 (App Router) project
with TypeScript, Tailwind CSS v4, a class-based dark/light theme system with no-flash support,
ESLint + Prettier + commitlint, a Vitest scaffold, GitHub Actions CI, and a first git commit.

All quality gates pass from day one. The site is ready to push to GitHub and connect to Vercel.

## What This Task Proves

- The project initializes with the correct stack (Next.js 16, Tailwind v4, pnpm).
- `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, and `pnpm test:ci` all exit 0.
- ThemeProvider and ThemeToggle are wired up with a no-flash inline script in `layout.tsx`.
- The dark-mode-first CSS uses `@variant dark` (Tailwind v4 class strategy).
- A conventional-commits-enforced git history is established with a clean first commit.
- CI workflow is ready to run on GitHub on every push/PR.

## Evidence Summary

All four quality gates (`lint`, `typecheck`, `format:check`, `test:ci`) exit 0 on the first
commit. The git log shows the scaffold commit. The theme system is implemented as a lazy-init
`useState` pattern with a no-flash `<script>` in `layout.tsx` — no `setTheme` inside
`useEffect`, eliminating the `react-hooks/set-state-in-effect` lint violation.

---

## Artifact: Quality Gates (All Exit 0)

**What it proves:** The scaffold is lint-clean, type-safe, consistently formatted, and the
Vitest runner passes with no test files (expected for v1 — `passWithNoTests: true`).

**Why it matters:** Establishes that CI will pass on the first push to GitHub.

**Commands:**

```bash
pnpm lint        # ESLint (flat config: core-web-vitals + typescript + prettier)
pnpm typecheck   # tsc --noEmit (strict mode)
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

## Artifact: Git Commit

**What it proves:** A clean initial commit exists with a conventional-commit message and task
reference, and all 31 files are tracked.

**Why it matters:** Establishes the baseline for all future incremental commits.

**Command:**

```bash
git log --oneline -1
```

**Result:**

```
71c7bef chore: initial Next.js 16 scaffold with Tailwind v4 and theme system
```

**Files committed (31 total):**

```
.github/workflows/ci.yml   — GitHub Actions CI (lint, typecheck, format, test)
.gitignore                 — standard Next.js gitignore
.prettierignore            — excludes .next, build, public, pnpm-lock.yaml
.prettierrc                — semi, singleQuote:false, trailingComma:es5, printWidth:100
AGENTS.md                  — repo conventions (stack, file layout, quality gates, commits)
README.md                  — pnpm setup instructions + script table
commitlint.config.mjs      — @commitlint/config-conventional
eslint.config.mjs          — core-web-vitals + typescript + prettier (flat config)
next.config.ts             — minimal Next.js 16 config
package.json               — all scripts: dev, build, lint, format, typecheck, test, test:ci
pnpm-lock.yaml             — lockfile
pnpm-workspace.yaml        — build approvals for sharp + unrs-resolver
postcss.config.mjs         — Tailwind v4 PostCSS plugin
src/app/globals.css        — @import "tailwindcss"; @variant dark; CSS vars; @media print stub
src/app/layout.tsx         — ThemeProvider wrapper, no-flash <script>, Geist font
src/app/page.tsx           — placeholder: "Ronan Prugh / Portfolio coming soon."
src/components/ThemeProvider.tsx — "use client"; lazy useState; applyTheme DOM fn
src/components/ThemeToggle.tsx   — "use client"; lucide-react Sun/Moon; min-h-11 touch target
tsconfig.json              — "strict": true
vitest.config.ts           — jsdom env, passWithNoTests: true, @/* alias
vitest.setup.ts            — @testing-library/jest-dom
(+ public/ SVGs from scaffold)
```

---

## Artifact: Theme System Implementation

**What it proves:** Dark-mode-first class strategy with localStorage persistence and no-flash
behavior is implemented correctly.

**Why it matters:** This is the core UX requirement for the dark-mode-first aesthetic (Q8 answer).

**Key implementation decisions:**

| Decision             | Choice                                                    | Reason                                                        |
| -------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| Dark mode strategy   | `@variant dark (&:where(.dark, .dark *))` in globals.css  | Tailwind v4 CSS-first config; no tailwind.config.ts           |
| No-flash             | Inline `<script>` in `layout.tsx` `<head>`                | Runs before React hydrates; sets `.dark`/`.light` on `<html>` |
| State initialization | Lazy `useState(resolveInitialTheme)`                      | Avoids `setTheme` in `useEffect` (eliminates lint violation)  |
| Default class        | `dark` on `<html>` in layout + `suppressHydrationWarning` | Server render defaults to dark; client corrects if needed     |

**globals.css dark variant declaration:**

```css
@import "tailwindcss";
@variant dark (&:where(.dark, .dark *));
```

**No-flash inline script in layout.tsx:**

```js
(function () {
  try {
    var t = localStorage.getItem("theme");
    var d = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = t || (d ? "dark" : "light");
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  } catch (e) {}
})();
```

---

## Vercel Deployment (Pending — Sub-task 1.13)

**Status:** Requires user action — create a GitHub repository and connect to Vercel.

**Steps:**

1. Create a new GitHub repo (e.g., `github.com/[username]/ronanprugh-personal-site`)
2. `git remote add origin https://github.com/[username]/ronanprugh-personal-site.git`
3. `git push -u origin main`
4. Go to vercel.com → "Add New Project" → Import the GitHub repo
5. Framework preset: Next.js (auto-detected)
6. Click Deploy

**Expected proof:** Screenshot of Vercel dashboard showing green "Ready" deployment.
Screenshot of `https://<project>.vercel.app` in dark mode and toggled to light mode.

---

## Reviewer Conclusion

The scaffold is complete: Next.js 16, Tailwind v4, TypeScript strict, pnpm, all quality gates
pass, theme system works, CI is ready, and a clean conventional-commit history is started.
The only pending action in Task 1.0 is pushing to GitHub and connecting Vercel (requires user
to create the GitHub repo). All code-level requirements of Task 1.0 are satisfied.
