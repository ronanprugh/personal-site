# 02-spec-score-mate-integration.md

## Introduction / Overview

This spec defines the configuration work required to serve the ScoreMate application at `https://ronanprugh.com/ScoreMate`. ScoreMate remains its own standalone Vercel project with its own database and auth; the portfolio site proxies all `/ScoreMate/*` traffic to that deployment via a Next.js URL rewrite. The goal is a seamless vanity URL with no codebase merge and no regression risk to either app.

## Goals

- Visitors who navigate to `https://ronanprugh.com/ScoreMate` see and use ScoreMate with no visible redirect to a Vercel subdomain.
- All ScoreMate internal links, API routes, and static assets resolve correctly under the `/ScoreMate` path prefix.
- Google OAuth and magic-link flows complete entirely on `ronanprugh.com`, with no mid-flow redirect to the raw Vercel deployment URL.
- Both applications (portfolio and ScoreMate) continue to pass their existing CI checks and behave normally in isolation.
- The integration is reversible: removing the rewrite from `next.config.ts` restores the prior state with no data loss.

## User Stories

- **As a portfolio visitor**, I want to click a link to ScoreMate on ronanprugh.com and land directly in the app, so I never see or have to remember a separate Vercel subdomain.
- **As a ScoreMate user**, I want to sign in with Google or magic link and have the callback stay on ronanprugh.com, so the authentication flow feels professional and trustworthy.
- **As Ronan**, I want to add ScoreMate to the portfolio's project showcase and link to `ronanprugh.com/ScoreMate`, so the portfolio demonstrates a live, working app rather than just a GitHub link.

## Demoable Units of Work

### Unit 1: Portfolio URL Rewrite

**Purpose:** Configure the portfolio's `next.config.ts` to proxy all `/ScoreMate/*` requests to the existing ScoreMate Vercel deployment URL, making the app accessible at `ronanprugh.com/ScoreMate`.

**Functional Requirements:**
- The portfolio's `next.config.ts` shall export an async `rewrites()` function containing a rule that maps `source: '/ScoreMate'` and `source: '/ScoreMate/:path*'` to the corresponding paths on the ScoreMate Vercel deployment URL.
- The rewrite shall preserve the full path suffix (`:path*`) so that deep links like `/ScoreMate/dashboard` resolve correctly inside ScoreMate.
- The rewrite shall be added under the `afterFiles` array (or top-level, if no existing rewrite structure is present) so it does not override any portfolio-internal routes.
- The portfolio's existing routes (`/`, `/projects/[slug]`, etc.) shall remain unaffected.

**Proof Artifacts:**
- Browser screenshot: `https://ronanprugh.com/ScoreMate` loads the ScoreMate home/login page in a production browser tab, demonstrating the rewrite is live.
- Browser screenshot: navigating to a deep path (e.g., `ronanprugh.com/ScoreMate/dashboard` or equivalent) loads the correct ScoreMate page, demonstrating full path forwarding works.

---

### Unit 2: ScoreMate `basePath` Configuration

**Purpose:** Configure ScoreMate's Next.js app to know it is mounted under `/ScoreMate`, so internal links, API routes, and static asset paths are all prefixed correctly when accessed through the rewrite.

**Functional Requirements:**
- ScoreMate's `next.config` (in the ScoreMate repository) shall add `basePath: '/ScoreMate'` so all internal `<Link>` hrefs, `<Image>` src paths, and `router.push()` calls are automatically prefixed.
- ScoreMate's Vercel project environment variables shall have `NEXTAUTH_URL` updated to the value confirmed in Open Question 1 (either `https://ronanprugh.com` or `https://ronanprugh.com/ScoreMate` — see Open Questions).
- The ScoreMate CI/CD pipeline (Vercel build) shall pass with no errors after the `basePath` change.
- Navigating within ScoreMate (e.g., from the login page to a protected route) shall not break or redirect to a raw Vercel URL.

**Proof Artifacts:**
- Browser screenshot: ScoreMate login page loads at `ronanprugh.com/ScoreMate` and the browser Network panel shows all internal asset requests (JS chunks, images) resolving under `/ScoreMate/...`, demonstrating basePath is applied.
- Vercel dashboard screenshot: ScoreMate project shows a green "Ready" deployment after the `basePath` change.

---

### Unit 3: Google OAuth Callback Update

**Purpose:** Update the Google Cloud Console OAuth configuration and ScoreMate's auth environment so Google sign-in completes on `ronanprugh.com` without redirecting through the raw Vercel URL.

**Functional Requirements:**
- The Google Cloud Console OAuth 2.0 client for ScoreMate shall have `https://ronanprugh.com/ScoreMate/api/auth/callback/google` added as an authorized redirect URI (exact path depends on Open Question 1 resolution — see Open Questions).
- The prior Vercel-subdomain callback URI may remain in Google Cloud Console temporarily to avoid breaking the non-proxied deployment URL during the transition; it can be removed once the new URI is confirmed working.
- After the change, clicking "Sign in with Google" from `ronanprugh.com/ScoreMate` shall complete the OAuth flow and return the user to a ScoreMate page on `ronanprugh.com`, with no visible redirect to a Vercel subdomain.
- Magic-link emails shall include a link to `ronanprugh.com/ScoreMate/api/auth/callback/...` rather than the raw Vercel URL.

**Proof Artifacts:**
- End-to-end screenshot sequence: (1) ScoreMate sign-in page at `ronanprugh.com/ScoreMate`, (2) Google account picker, (3) post-auth redirect landing back on `ronanprugh.com/ScoreMate/...` — demonstrates OAuth flow completes on the main domain.
- (Optional) Magic-link email screenshot showing the callback link contains `ronanprugh.com/ScoreMate` demonstrates email-based auth also uses the correct domain.

## Non-Goals (Out of Scope)

1. **Code migration**: ScoreMate's routes, components, database schema, and environment variables are NOT moved into the portfolio repository. The two codebases remain entirely separate.
2. **Portfolio UI changes**: Updating the portfolio's project card or detail page for ScoreMate (e.g., swapping a GitHub link for a live demo link) is deferred — it is a one-line data change in `src/data/projects.ts` and can be done independently.
3. **espn-fantasy-stats integration**: This spec covers ScoreMate only. A similar rewrite for `espn-fantasy-stats` would be a follow-on spec.
4. **Shared session / SSO between portfolio and ScoreMate**: Users do not need to be signed in to the portfolio to access ScoreMate. No cross-app session sharing is required.
5. **Custom email domain for magic links**: Magic-link sender address changes (e.g., from a Vercel default to a custom domain) are out of scope.

## Design Considerations

No UI changes to the portfolio are required by this spec. The rewrite is invisible to visitors — the URL changes, the visual appearance of both apps does not. Any project-card or showcase updates to link to the live demo URL are treated as a separate, trivial data change outside this spec's scope.

## Repository Standards

Implementation shall follow the patterns established in the portfolio repo:

- `next.config.ts` uses TypeScript ESM (`import type { NextConfig }` pattern already in place).
- No new dependencies should be added to the portfolio — `rewrites()` is a built-in Next.js API.
- Changes to the ScoreMate repo shall follow whatever conventions and commit style that repo uses (out of scope for this spec's enforcement).
- Commit message shall follow Conventional Commits (enforced by commitlint in the portfolio repo): e.g., `feat: add ScoreMate URL rewrite to next.config.ts`.

## Technical Considerations

**Multi-zone rewrite pattern (Next.js official guidance):**
The `rewrites()` function in `next.config.ts` is the canonical Next.js mechanism for multi-zone setups where separate apps share a domain. This is a Vercel-recommended, well-documented pattern and is appropriate here. The portfolio is Next.js 16.2.9 (App Router); `rewrites()` is fully supported.

**`basePath` requirement on ScoreMate:**
Without `basePath: '/ScoreMate'` in ScoreMate's `next.config`, internal `<Link>` hrefs and API route paths will be relative to the app root (`/`), not `/ScoreMate`. When served through the portfolio rewrite, relative links to `/` would resolve to the portfolio homepage. Setting `basePath` in ScoreMate is mandatory for internal navigation to work correctly.

**Static assets (`_next/static`):**
When `basePath: '/ScoreMate'` is set, Next.js automatically serves static assets under `/_next/static/` prefixed as `/ScoreMate/_next/static/`. The portfolio's rewrite rule for `/ScoreMate/:path*` must capture this path, which it will automatically because `:path*` matches `_next/static/...`.

**Next.js 16 `proxy.ts` file convention:**
Next.js 16 introduced a new `proxy.ts` file convention for dynamic per-request routing decisions. This is NOT needed here — the rewrite destination is static (a fixed Vercel URL). `rewrites()` in `next.config.ts` is simpler and appropriate.

**Rewrite rule ordering:**
The rewrite rule should not conflict with the portfolio's existing routes. Since the portfolio has no `/ScoreMate` routes, placement in `afterFiles` (or as a top-level array) is safe.

**Vercel plan compatibility:**
URL rewrites that proxy to external URLs (non-Vercel URLs) work on the free Hobby plan. Rewrites to other Vercel deployments (same or different team) also work on Hobby.

## Security Considerations

- **`NEXTAUTH_URL` / `AUTH_URL`**: This environment variable must be updated in ScoreMate's Vercel project settings — not committed to the ScoreMate repository.
- **Google OAuth client secret**: Not changed by this spec; remains in ScoreMate's Vercel env vars only, never in any committed file.
- **Proof artifacts**: Screenshots of the Vercel dashboard or Google Console should not expose client secrets, API keys, or database credentials. Crop or redact as needed before committing proof artifacts.
- **Authorized redirect URIs**: Add only the specific callback URI needed (`ronanprugh.com/ScoreMate/api/auth/callback/google`). Do not add wildcard URIs to the Google Console OAuth client.
- **Old Vercel callback URI**: The prior Vercel-subdomain callback URI can remain in Google Console during cutover. Remove it once the new URI is confirmed working, to minimize the authorized surface area.

## Success Metrics

1. **Zero broken internal links**: All navigation within ScoreMate at `ronanprugh.com/ScoreMate` resolves to `ronanprugh.com/ScoreMate/...` paths — no redirects to the raw Vercel subdomain.
2. **OAuth end-to-end success**: A full Google sign-in flow completes at `ronanprugh.com/ScoreMate` without the user ever seeing the raw Vercel subdomain in the address bar.
3. **No portfolio regressions**: The portfolio homepage, `/projects/[slug]` pages, and all existing routes continue to load and pass CI (lint, typecheck, tests) after the `next.config.ts` change.
4. **ScoreMate CI green**: ScoreMate's Vercel deployment succeeds (no build errors) after the `basePath` change.

## Open Questions

1. **`NEXTAUTH_URL` exact value with `basePath`**: The user selected `NEXTAUTH_URL=https://ronanprugh.com` (Q3-A). However, when ScoreMate sets `basePath: '/ScoreMate'`, Auth.js constructs callback paths as `{NEXTAUTH_URL}/api/auth/callback/google`. With basePath applied by Next.js, the actual accessible path would be `/ScoreMate/api/auth/callback/google`. The correct value may be `https://ronanprugh.com/ScoreMate` or `https://ronanprugh.com` depending on which version of Auth.js/NextAuth ScoreMate uses and how it handles basePath. **Resolution needed before Unit 3 implementation**: check the Auth.js version in ScoreMate and verify the expected callback URL construction.

2. **ScoreMate Vercel deployment URL**: The user confirmed ScoreMate is already on Vercel (Q2-A), but the specific deployment URL (e.g., `https://score-mate-abc123.vercel.app`) is needed to populate the rewrite destination in `next.config.ts`. Retrieve this from the Vercel dashboard for the ScoreMate project before implementing Unit 1.
