# Task 1.0 Proofs — Prerequisites Resolved

## Task Summary

Task 1.0 was a pure discovery task: find the two pieces of information the spec flagged as open questions before any code could be written. Both are now confirmed and documented.

## What This Task Proves

- OQ-2 is resolved: the stable ScoreMate Vercel production URL is known and ready to paste into `next.config.ts`.
- OQ-1 is resolved: Auth.js v5 is confirmed, the correct env var name is `AUTH_URL`, and the value to set has been determined based on the `basePath` interaction.
- All implementation tasks (2.0 through 4.0) are unblocked.

## Evidence Summary

Both open questions were answered by inspecting live sources: Vercel MCP for the deployment URL, and the ScoreMate repo's `package.json` + `auth.config.ts` for the auth library version and variable naming convention.

---

## Artifact: ScoreMate Vercel Project Domains

**What it proves:** The stable production alias URL for the ScoreMate Vercel project (OQ-2 resolved).

**Why it matters:** This URL is the `destination` value in the portfolio's `next.config.ts` rewrite rules. Using the per-deploy URL would break after every new ScoreMate deployment; the project alias always tracks production.

**Source:** Vercel MCP `get_project` → `prj_Ze9VWXQJNSeTauOwv4bCuBVvOcAD`

**Result summary:** The project exposes three domains; the stable production alias is `score-mate-ronanprughs-projects.vercel.app`.

```json
{
  "domains": [
    "score-mate-chi.vercel.app",
    "score-mate-ronanprughs-projects.vercel.app",
    "score-mate-git-main-ronanprughs-projects.vercel.app"
  ]
}
```

**Confirmed value:** `https://score-mate-ronanprughs-projects.vercel.app`

---

## Artifact: Auth Library Version

**What it proves:** ScoreMate uses Auth.js v5 (next-auth `5.0.0-beta.31`), which means the env var is `AUTH_URL` (not `NEXTAUTH_URL`) (OQ-1 partially resolved).

**Why it matters:** The env var name and URL construction logic differ between NextAuth v4 and Auth.js v5. Using the wrong variable name would silently fail — the setting would be ignored and callbacks would fall back to the wrong domain.

**Source:** `/Users/rprugh/repos/score-mate/package.json`

```
"next-auth": "5.0.0-beta.31"
```

**Confirmed:** Auth.js v5 naming convention also verified in `auth.config.ts` — the file uses `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_RESEND_KEY` (all v5 style), with no reference to `NEXTAUTH_URL`.

---

## Artifact: AUTH_URL Value Determination

**What it proves:** `AUTH_URL=https://ronanprugh.com/ScoreMate` is the correct value after `basePath: '/ScoreMate'` is applied (OQ-1 fully resolved).

**Why it matters:** Auth.js v5 constructs callback URLs as `{AUTH_URL}/api/auth/callback/{provider}`. With Next.js `basePath: '/ScoreMate'`, the actual accessible path is `/ScoreMate/api/auth/callback/google`. Setting `AUTH_URL=https://ronanprugh.com/ScoreMate` makes Auth.js construct `https://ronanprugh.com/ScoreMate/api/auth/callback/google`, which aligns with what Next.js actually serves through the rewrite.

**Google Console redirect URI to add:** `https://ronanprugh.com/ScoreMate/api/auth/callback/google`

---

## Reviewer Conclusion

Both spec open questions are resolved with source-backed evidence. Task 2.0 (`next.config.ts` rewrite) can proceed using `https://score-mate-ronanprughs-projects.vercel.app` as the destination. Tasks 3.0 and 4.0 can proceed using `AUTH_URL=https://ronanprugh.com/ScoreMate` and Google callback URI `https://ronanprugh.com/ScoreMate/api/auth/callback/google`.
