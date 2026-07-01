# 02 ScoreMate Integration — Prerequisites Notes

Resolved open questions from the spec before implementation begins.

## OQ-2: ScoreMate Vercel Deployment URL

**Stable production alias:** `https://score-mate-ronanprughs-projects.vercel.app`

- Source: Vercel project `prj_Ze9VWXQJNSeTauOwv4bCuBVvOcAD` domains list
- This is the alias that always points to the latest production deployment (not a per-deploy URL)
- Use this as the `destination` in the portfolio's `next.config.ts` rewrite rules

## OQ-1: AUTH_URL Value with basePath

**Auth library:** `next-auth 5.0.0-beta.31` (Auth.js v5)

**Confirmed value:** `AUTH_URL=https://ronanprugh.com/ScoreMate`

**Rationale:**
- Auth.js v5 uses `AUTH_URL` (not `NEXTAUTH_URL`) as the canonical base for auth route construction
- Auth.js constructs callback paths as `{AUTH_URL}/api/auth/callback/{provider}`
- With `basePath: '/ScoreMate'` set in ScoreMate's `next.config.ts`, Next.js prefixes all routes including `/api/auth/...` → actual accessible path becomes `/ScoreMate/api/auth/callback/google`
- Setting `AUTH_URL=https://ronanprugh.com/ScoreMate` aligns Auth.js's own URL construction with the Next.js basePath prefix, so both produce `https://ronanprugh.com/ScoreMate/api/auth/callback/google`

**Google Console redirect URI to add:** `https://ronanprugh.com/ScoreMate/api/auth/callback/google`

**Auth.js v5 variable name used in ScoreMate:** `AUTH_URL` (confirmed from `auth.config.ts` — the file uses `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_RESEND_KEY` naming convention, all v5 style)
