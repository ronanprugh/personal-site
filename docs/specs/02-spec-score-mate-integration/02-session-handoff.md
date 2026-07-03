# ScoreMate Integration — Session Handoff

**Spec:** `02-spec-score-mate-integration`
**Date:** 2026-07-02
**Status:** Tasks 1.0–3.0 partially complete, auth still broken, screenshots not yet captured

---

## What Was Built

The goal is to serve ScoreMate at `https://ronanprugh.com/ScoreMate` using a Next.js multi-zone rewrite proxy — ScoreMate stays its own Vercel project, the portfolio proxies `/ScoreMate/*` traffic to it.

### Portfolio repo (`ronanprugh-personal-site`)

**`next.config.ts`** — two rewrite rules added (commit `63729f9`):

```ts
const SCOREMATE_URL = "https://score-mate-ronanprughs-projects.vercel.app";

async rewrites() {
  return [
    { source: "/ScoreMate",        destination: `${SCOREMATE_URL}/ScoreMate` },
    { source: "/ScoreMate/:path*", destination: `${SCOREMATE_URL}/ScoreMate/:path*` },
  ];
}
```

> The destination must include `/ScoreMate` because ScoreMate has `basePath: '/ScoreMate'` — all its routes live under that prefix.

### ScoreMate repo

**`next.config.ts`** — `basePath` added and deployed to production (commit `c3beddc` on `main`):

```ts
const nextConfig: NextConfig = {
  basePath: "/ScoreMate",
};
```

### Google Cloud Console

OAuth 2.0 client already updated with:

- **Authorized JavaScript origins:** `https://ronanprugh.com` ✓
- **Authorized redirect URIs:** `https://ronanprugh.com/ScoreMate/api/auth/callback/google` ✓

---

## RESOLVED (2026-07-02) — Root Cause Was Code, Not Env Vars

> **⚠️ The original diagnosis below was wrong.** Setting `AUTH_URL=https://ronanprugh.com/ScoreMate` does NOT fix the flow — Auth.js v5 treats the `AUTH_URL` path as the full mount point of the auth handler and uses it for BOTH request parsing and URL building, which cannot both be satisfied behind a Next.js basePath. See ScoreMate commit `f1d53e5` and portfolio commit `f70de08` for the actual fix:
>
> - `next-auth/react` client hardcodes `/api/auth` (env vars never reach the browser) → `SessionProvider basePath` now set in `signin-form.tsx`.
> - Relative `callbackUrl`/`redirectTo`/`pages` values resolve against the bare origin → now explicitly `/ScoreMate`-prefixed.
> - Middleware sign-in redirect was basePath-unaware → fixed.
> - Auth endpoints are served at the **domain root** (`ronanprugh.com/api/auth/*`) via a new portfolio rewrite, because Auth.js builds its absolute URLs (Google redirect_uri, magic links) without any basePath prefix.
>
> **Correct env var value: `AUTH_URL=https://ronanprugh.com` (origin only, NO path).** A path in `AUTH_URL`/`NEXTAUTH_URL` hijacks the Auth.js basePath and breaks every auth request.
>
> **Google Console:** the authorized redirect URI must be `https://ronanprugh.com/api/auth/callback/google` (no `/ScoreMate`).

<details>
<summary>Original (incorrect) diagnosis — kept for history</summary>

**Symptom:** Signing in redirects to `ronanprugh.com/api/auth/error` (no `/ScoreMate/` prefix) → 404.

**Root cause:** Auth.js v5 constructs auth URLs from `AUTH_URL`. Without it, it falls back to the raw domain, producing `/api/auth/error` instead of `/ScoreMate/api/auth/error`.

**Fix (not yet done):**

In ScoreMate's Vercel project → **Settings → Environment Variables**:

| Key        | Value                              |
| ---------- | ---------------------------------- |
| `AUTH_URL` | `https://ronanprugh.com/ScoreMate` |

- Capital `S` in `ScoreMate` — must match exactly (Google does case-sensitive URI matching)
- Variable name is `AUTH_URL`, not `NEXTAUTH_URL` (Auth.js v5 changed the name)
- After saving, **redeploy** ScoreMate so the env var takes effect

The user previously set `NEXTAUTH_URL=https://ronanprugh.com/scoremate` — wrong variable name AND wrong casing. That variable is ignored by Auth.js v5.

</details>

---

## Task Status

| Task                             | Status                 | Notes                                                              |
| -------------------------------- | ---------------------- | ------------------------------------------------------------------ |
| 1.0 Prerequisites                | ✅ Complete            | Notes in `02-notes-prerequisites.md`, committed                    |
| 2.0 Portfolio rewrite            | 🟡 Mostly done         | Code + Vercel deployment green; proof screenshots NOT captured yet |
| 3.0 ScoreMate basePath + env var | 🟡 basePath done       | `basePath` deployed; `AUTH_URL` env var NOT set yet                |
| 4.0 Google OAuth + e2e test      | 🟡 Google Console done | New redirect URI added; e2e flow blocked by AUTH_URL issue         |

---

## Remaining Work (in order)

### 1. Fix env vars in Vercel and deploy the code fixes (blocker)

- ScoreMate Vercel project → Settings → Environment Variables
- Set `AUTH_URL` = `https://ronanprugh.com` (origin only — a path breaks Auth.js request parsing)
- Set `NEXTAUTH_URL` to the same value or delete it (it is read as a fallback and must not carry a path either)
- Push ScoreMate commit `f1d53e5` and portfolio commit `f70de08`, wait for both deployments to show "Ready"
- Google Console: add authorized redirect URI `https://ronanprugh.com/api/auth/callback/google`

### 2. Test end-to-end OAuth

- Open `https://ronanprugh.com/ScoreMate` in a private/incognito window
- Click "Sign in with Google", complete flow
- Confirm post-auth URL is `ronanprugh.com/ScoreMate/...` (not Vercel subdomain, not `/api/auth/...`)

### 3. Capture proof screenshots (all tasks need these before closing)

**Task 2.0 screenshots** → save to `docs/specs/02-spec-score-mate-integration/02-proofs/`:

- `2.0-scoremate-root.png` — `ronanprugh.com/ScoreMate` loaded, no redirect
- `2.0-scoremate-deep-path.png` — any sub-route e.g. `/ScoreMate/signin`
- `2.0-portfolio-homepage.png` — `ronanprugh.com` homepage unaffected
- `2.0-ci-pass.png` — GitHub Actions CI green for commit `0a13985`

**Task 3.0 screenshots:**

- `3.0-network-tab-assets.png` — DevTools Network showing `/ScoreMate/_next/static/...` requests
- `3.0-vercel-build-green.png` — ScoreMate Vercel deployment "Ready" (redact any secrets)
- `3.0-internal-navigation.png` — address bar on `ronanprugh.com/ScoreMate/...` after clicking internal link

**Task 4.0 screenshots:**

- `4.0-oauth-step1-signin-page.png` — ScoreMate sign-in page at `ronanprugh.com/ScoreMate`
- `4.0-oauth-step2-google-picker.png` — Google account picker
- `4.0-oauth-step3-post-auth.png` — post-auth landing on `ronanprugh.com/ScoreMate/...`

### 4. Commit screenshots

```
docs: add Task 2.0 proof artifacts for ScoreMate URL rewrite
docs: add Task 3.0 proof artifacts for ScoreMate basePath config
docs: add Task 4.0 proof artifacts for ScoreMate OAuth flow
```

### 5. (Optional) Remove old Vercel subdomain callback URI

After confirming the `ronanprugh.com` OAuth flow works end-to-end:

- Google Cloud Console → remove `https://score-mate-ronanprughs-projects.vercel.app/api/auth/callback/google`

### 6. Update task file and run SDD-4 validation

- Mark tasks 2.0, 3.0, 4.0 complete in `02-tasks-score-mate-integration.md`
- Run `/SDD-4-validate-spec-implementation`

---

## Key Facts to Remember

- ScoreMate Vercel URL: `https://score-mate-ronanprughs-projects.vercel.app`
- Auth library: `next-auth 5.0.0-beta.31` (Auth.js v5) — uses `AUTH_URL`, not `NEXTAUTH_URL`
- `AUTH_URL` must be `https://ronanprugh.com/ScoreMate` (capital S)
- Rewrite destination must include `/ScoreMate` prefix (because basePath is set on ScoreMate)
- Vercel Deployment Protection on ScoreMate has already been disabled (set to None)
- Google Console already has the correct redirect URI — no further Google changes needed unless optional cleanup in step 5
- **Never commit** `AUTH_URL`, `AUTH_GOOGLE_SECRET`, or any credentials — these live only in Vercel env vars
- Proof screenshots must be cropped/redacted before committing (no secrets, API keys, or OAuth credentials visible)
