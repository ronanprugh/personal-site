# 02-tasks-score-mate-integration.md

## Relevant Files

| File                                                                  | Why It Is Relevant                                                                                                            |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `next.config.ts`                                                      | Portfolio repo entry point — add `rewrites()` function here (Task 2.0).                                                       |
| `docs/specs/02-spec-score-mate-integration/02-notes-prerequisites.md` | New file — record the resolved ScoreMate Vercel URL and confirmed `NEXTAUTH_URL` value from Task 1.0.                         |
| `docs/specs/02-spec-score-mate-integration/02-proofs/`                | Directory for all proof-artifact screenshots and supporting evidence (created when first proof is saved).                     |
| `[ScoreMate repo]/next.config.js` (or `.ts`)                          | ScoreMate's Next.js config — add `basePath: '/ScoreMate'` here (Task 3.0). This file is in the separate ScoreMate repository. |

### Notes

- Tasks 1.0, 3.0, and 4.0 involve work outside this portfolio repository (ScoreMate repo, Vercel dashboard, Google Cloud Console). Those changes do not flow through the portfolio's CI pipeline.
- The only file in this repo that changes is `next.config.ts`. All four quality gates (`pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm test:ci`) must pass after that change.
- Proof screenshots should be saved to `docs/specs/02-spec-score-mate-integration/02-proofs/`. Crop or redact any secrets, API keys, or OAuth client credentials visible in the screenshots before saving.
- Follow Conventional Commits for all commits in this repo (e.g., `feat: add ScoreMate URL rewrite to next.config.ts`). Reference the task number in the commit body: `Related to T2.1 in Spec 02-spec-score-mate-integration`.

---

## Tasks

### [x] 1.0 Resolve Prerequisites — Confirm ScoreMate Vercel URL and NEXTAUTH_URL Value

**Context:** Two open questions from the spec must be answered before any code is written. This task is pure discovery — no code changes. The outputs become inputs for Tasks 2.0 and 3.0.

#### 1.0 Proof Artifact(s)

- Documented note: `docs/specs/02-spec-score-mate-integration/02-notes-prerequisites.md` contains the ScoreMate Vercel deployment URL (e.g., `https://score-mate-abc123.vercel.app`) demonstrates OQ-2 is resolved.
- Documented note: The same file contains the confirmed `NEXTAUTH_URL` value with a one-line rationale tied to the Auth.js / NextAuth version found in ScoreMate's `package.json` demonstrates OQ-1 is resolved.

#### 1.0 Tasks

- [x] 1.1 Open the ScoreMate Vercel project dashboard and copy the primary deployment URL (the stable `*.vercel.app` URL, not a preview URL).
- [x] 1.2 Open the ScoreMate repository and read `package.json` to identify which auth library version is in use: look for `next-auth` (v4), `@auth/nextjs`, `@auth/core` (Auth.js v5), or equivalent.
- [x] 1.3 Determine the correct `NEXTAUTH_URL` / `AUTH_URL` value based on the version found:
  - **NextAuth v4**: `NEXTAUTH_URL=https://ronanprugh.com` — NextAuth v4 uses this value as the base and automatically appends `/api/auth/callback/google`. With `basePath: '/ScoreMate'` set in Next.js, the actual accessible path is `/ScoreMate/api/auth/callback/google`, so `NEXTAUTH_URL` should be `https://ronanprugh.com/ScoreMate` to align.
  - **Auth.js v5**: Check Auth.js v5 docs for `AUTH_URL` and `basePath` interaction — the variable name and path construction differ from v4.
  - If uncertain, test locally or check the Auth.js / NextAuth GitHub issues for `basePath` + `NEXTAUTH_URL` compatibility.
- [x] 1.4 Create `docs/specs/02-spec-score-mate-integration/02-notes-prerequisites.md` and record:
  - The ScoreMate Vercel deployment URL.
  - The confirmed `NEXTAUTH_URL` or `AUTH_URL` value.
  - The Auth.js / NextAuth version found.
  - A one-line rationale for the URL value chosen.
- [x] 1.5 Commit the notes file to the portfolio repo: `docs: record ScoreMate integration prerequisites`.

---

### [~] 2.0 Add URL Rewrite to Portfolio `next.config.ts`

**Context:** The portfolio's `next.config.ts` is currently empty (just the default blank config). Add an async `rewrites()` function that proxies `/ScoreMate` and `/ScoreMate/:path*` to the ScoreMate Vercel URL confirmed in Task 1.0. This is the only code change in the portfolio repo for this spec.

#### 2.0 Proof Artifact(s)

- Screenshot (`02-proofs/2.0-scoremate-root.png`): Browser showing `https://ronanprugh.com/ScoreMate` with the ScoreMate login/home page loaded demonstrates the rewrite is live.
- Screenshot (`02-proofs/2.0-scoremate-deep-path.png`): Browser showing a deep path (e.g., `ronanprugh.com/ScoreMate/dashboard` or the first authenticated route inside ScoreMate) loaded correctly demonstrates `:path*` forwarding works.
- Screenshot (`02-proofs/2.0-portfolio-homepage.png`): Browser showing `https://ronanprugh.com` (portfolio homepage) loading normally demonstrates existing portfolio routes are unaffected.
- Screenshot (`02-proofs/2.0-ci-pass.png`): GitHub Actions CI run page showing all four checks (Lint, Type-check, Format check, Test) as green after the `next.config.ts` commit demonstrates the portfolio quality gates pass with no regressions.

#### 2.0 Tasks

- [x] 2.1 Edit `next.config.ts` to add an async `rewrites()` function. Use the `NextConfig` type already imported in the file. The function should return a top-level array (not `beforeFiles`/`afterFiles`) with two rules:
  ```ts
  async rewrites() {
    return [
      {
        source: '/ScoreMate',
        destination: 'SCOREMATE_VERCEL_URL',
      },
      {
        source: '/ScoreMate/:path*',
        destination: 'SCOREMATE_VERCEL_URL/:path*',
      },
    ];
  },
  ```
  Replace `SCOREMATE_VERCEL_URL` with the URL confirmed in Task 1.1 (e.g., `https://score-mate-abc123.vercel.app`).
- [x] 2.2 Run `pnpm typecheck` locally and fix any TypeScript errors before committing.
- [x] 2.3 Run `pnpm lint` and `pnpm format:check` locally. If format check fails, run `pnpm format` and stage the formatted file.
- [x] 2.4 Run `pnpm test:ci` locally to confirm no test regressions.
- [x] 2.5 Commit using Conventional Commits: `feat: add ScoreMate URL rewrite to next.config.ts`. Include in the commit body: `Related to T2.1 in Spec 02-spec-score-mate-integration`.
- [ ] 2.6 Push the commit and confirm the portfolio's Vercel deployment completes successfully (check the Vercel dashboard for a green "Ready" status).
- [ ] 2.6a Open the GitHub Actions tab for this repo and locate the CI run triggered by the push from step 2.5. Confirm all four checks (Lint, Type-check, Format check, Test) show green. Capture a screenshot of the CI run page and save to `docs/specs/02-spec-score-mate-integration/02-proofs/2.0-ci-pass.png`.
- [ ] 2.7 Open `https://ronanprugh.com/ScoreMate` in a browser and capture a screenshot saved to `docs/specs/02-spec-score-mate-integration/02-proofs/2.0-scoremate-root.png`.
- [ ] 2.8 Navigate to a deep path inside ScoreMate (e.g., sign-in page, dashboard, or any route one level below root) and capture a screenshot saved to `02-proofs/2.0-scoremate-deep-path.png`.
- [ ] 2.9 Open `https://ronanprugh.com` (portfolio homepage) and capture a screenshot saved to `02-proofs/2.0-portfolio-homepage.png` to confirm no portfolio regression.
- [ ] 2.10 Commit the proof screenshots: `docs: add Task 2.0 proof artifacts for ScoreMate URL rewrite`.

---

### [ ] 3.0 Configure ScoreMate `basePath` and Update Vercel Environment Variables

**Context:** Without `basePath: '/ScoreMate'` in ScoreMate's own Next.js config, internal links and static assets will use root-relative paths (`/`), which break when served through the portfolio rewrite. This task is performed entirely in the ScoreMate repository and Vercel dashboard — not the portfolio repo.

#### 3.0 Proof Artifact(s)

- Screenshot (`02-proofs/3.0-network-tab-assets.png`): Browser DevTools Network tab open on `ronanprugh.com/ScoreMate` showing JS chunk and image requests resolving under `/ScoreMate/_next/static/...` demonstrates `basePath` is correctly applied.
- Screenshot (`02-proofs/3.0-vercel-build-green.png`): Vercel dashboard showing ScoreMate project with a green "Ready" deployment after the `basePath` change demonstrates the build succeeds with no errors.
- Screenshot (`02-proofs/3.0-internal-navigation.png`): Browser address bar on `ronanprugh.com/ScoreMate/...` after clicking an internal link inside ScoreMate (e.g., from sign-in page to another route) — no raw Vercel subdomain visible — demonstrates internal routing works end-to-end.

#### 3.0 Tasks

- [ ] 3.1 In the ScoreMate repository, open `next.config.js` (or `next.config.ts`) and add `basePath: '/ScoreMate'` to the exported config object.
- [ ] 3.2 Run the ScoreMate build locally (`pnpm build` or `npm run build`) to confirm no build errors before pushing. Fix any errors before continuing.
- [ ] 3.3 Commit the `basePath` change in the ScoreMate repo following that repo's commit conventions and push it. This will trigger a Vercel deployment — monitor it until it shows "Ready".
- [ ] 3.4 In the ScoreMate Vercel project settings (Settings → Environment Variables), update the environment variable for auth URL:
  - Variable name: `NEXTAUTH_URL` (NextAuth v4) or `AUTH_URL` (Auth.js v5) — use whichever was found in Task 1.2.
  - Value: the URL confirmed in Task 1.3.
  - Apply to: Production (and Preview if desired).
- [ ] 3.5 Trigger a new Vercel deployment of ScoreMate (Vercel will prompt, or redeploy manually) so the updated env var takes effect in production.
- [ ] 3.6 Open `https://ronanprugh.com/ScoreMate` with browser DevTools open on the Network tab. Confirm that JS chunk and image requests use paths beginning with `/ScoreMate/_next/static/...`. Capture a screenshot saved to `docs/specs/02-spec-score-mate-integration/02-proofs/3.0-network-tab-assets.png`.
- [ ] 3.7 Click an internal navigation link inside ScoreMate and confirm the address bar stays on `ronanprugh.com/ScoreMate/...`. Capture a screenshot saved to `02-proofs/3.0-internal-navigation.png`.
- [ ] 3.8 Capture a Vercel dashboard screenshot showing the ScoreMate project's green "Ready" deployment and save to `02-proofs/3.0-vercel-build-green.png`. Crop or redact any environment variable values or secrets visible on screen.
- [ ] 3.9 Add and commit the proof screenshots to the portfolio repo: `docs: add Task 3.0 proof artifacts for ScoreMate basePath config`.

---

### [ ] 4.0 Update Google OAuth Callback URI and Verify End-to-End Auth Flow

**Context:** The Google Cloud Console OAuth 2.0 client must have the new `ronanprugh.com`-based callback URI added before Google sign-in will work through the rewrite. Keep the old Vercel-subdomain URI in place during the cutover, then remove it once the new flow is confirmed. This task involves only the Google Cloud Console and a browser — no code changes.

#### 4.0 Proof Artifact(s)

- Screenshot sequence (`02-proofs/4.0-oauth-step1-signin-page.png`, `4.0-oauth-step2-google-picker.png`, `4.0-oauth-step3-post-auth.png`): Three sequential browser screenshots showing (1) ScoreMate sign-in page at `ronanprugh.com/ScoreMate`, (2) Google account picker / OAuth consent screen, (3) post-auth redirect on `ronanprugh.com/ScoreMate/...` — demonstrates the full OAuth flow completes on the main domain.
- Screenshot (`02-proofs/4.0-address-bar-clean.png`): Address bar throughout the flow showing only `ronanprugh.com/...` and `accounts.google.com/...` — no raw Vercel subdomain — demonstrates the user-facing URL experience is clean.
- (Optional) Screenshot (`02-proofs/4.0-magic-link-email.png`): Magic-link email showing `ronanprugh.com/ScoreMate/api/auth/callback/...` in the link URL demonstrates email-based auth also uses the correct domain.

#### 4.0 Tasks

- [ ] 4.1 Open [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → click the OAuth 2.0 Client ID used by ScoreMate.
- [ ] 4.2 Under "Authorized redirect URIs", click "Add URI" and enter:
      `https://ronanprugh.com/ScoreMate/api/auth/callback/google`
      (Use the exact path confirmed by Task 1.3 — adjust if Auth.js v5 uses a different callback path.)
- [ ] 4.3 Save the client. **Do NOT remove the old Vercel-subdomain callback URI yet** — it keeps the old direct URL working during the transition.
- [ ] 4.4 Open `https://ronanprugh.com/ScoreMate` in a fresh private/incognito browser window (to avoid cached session state).
- [ ] 4.5 Click "Sign in with Google" and complete the OAuth flow end-to-end. Confirm the post-auth redirect lands back on `ronanprugh.com/ScoreMate/...`.
- [ ] 4.6 Capture the three-frame screenshot sequence (sign-in page → Google picker → post-auth) and save as `02-proofs/4.0-oauth-step1-signin-page.png`, `4.0-oauth-step2-google-picker.png`, `4.0-oauth-step3-post-auth.png`. Crop or redact any personal Google account details visible in the screenshots.
- [ ] 4.7 (Optional) If ScoreMate supports magic-link sign-in: trigger a magic-link request and check the received email. Capture a screenshot of the email showing the `ronanprugh.com/ScoreMate/...` callback URL and save to `02-proofs/4.0-magic-link-email.png`.
- [ ] 4.8 Once the `ronanprugh.com` OAuth flow is confirmed working end-to-end, return to Google Cloud Console and remove the old Vercel-subdomain callback URI from the authorized redirect URIs list. Save.
- [ ] 4.9 Add and commit the proof screenshots to the portfolio repo: `docs: add Task 4.0 proof artifacts for ScoreMate OAuth flow`.
