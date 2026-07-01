# 02 Questions Round 1 - ScoreMate Integration

Please answer each question below (select one or more options, or add your own notes).

---

## 1. Deployment Model — One codebase or two?

Score-mate has its own database (Neon Postgres), auth (Auth.js + Google OAuth + magic link),
edge middleware, and environment variables. The portfolio site is fully static. "Moving" it
to ronanprugh.com/ScoreMate can mean two very different things technically:

- [X] (A) **Separate deployments, shared domain (Recommended)** — Score-mate stays its own
  Vercel project and codebase. The portfolio's `next.config.ts` adds a URL rewrite so
  `ronanprugh.com/ScoreMate/*` proxies to the score-mate Vercel deployment. Auth, DB,
  and env vars all stay in the score-mate repo. Zero risk of breaking either app.

- [ ] (B) **Full merge** — Score-mate's routes, components, auth system, and DB schema are
  physically moved into the portfolio Next.js app. One codebase, one deployment.
  Much more complex and risky: requires merging two sets of env vars, auth config,
  middleware, and DB migrations into a single app.

- [ ] (C) Other (describe)

**Recommended answer:** (A)

**Why:**
- Score-mate is a functioning app with auth and a database. Merging it into the portfolio
  risks breaking both apps and entangles unrelated concerns (static resume + dynamic sports app).
- Multi-zone / URL rewrites is the Vercel-recommended pattern for exactly this use case.
- Option (A) takes hours; option (B) takes days and has real regression risk.
- The URL `ronanprugh.com/ScoreMate` looks identical to visitors regardless of which approach
  is used underneath.

---

## 2. Score-mate Vercel deployment — Does one already exist?

For option (A) to work, score-mate needs its own Vercel deployment URL
(e.g. `score-mate-abc123.vercel.app`) that the portfolio can rewrite to.

- [X] (A) **Yes** — score-mate is already deployed on Vercel (I have a project URL).
- [ ] (B) **No** — score-mate is not yet deployed; it would need a new Vercel project first.
- [ ] (C) Other (describe)

**Recommended answer:** Whichever is true — just confirm so the spec can include the
right setup steps.

---

## 3. Auth callback URL — What domain should auth use?

Score-mate's OAuth callbacks and magic-link emails currently point to wherever it's deployed
(e.g. `https://score-mate.vercel.app`). After moving to `ronanprugh.com/ScoreMate`,
the `NEXTAUTH_URL` and Google OAuth redirect URI need to change.

- [X] (A) **ronanprugh.com** — Update `NEXTAUTH_URL=https://ronanprugh.com` and add
  `https://ronanprugh.com/api/auth/callback/google` to the Google Cloud Console OAuth
  allowed redirect URIs. Auth flows through the main domain.

- [ ] (B) **Keep the existing score-mate Vercel URL** — Auth callbacks stay on
  `score-mate-abc123.vercel.app`. The rewrite forwards all traffic including auth.
  Simpler to set up but the auth redirect URL will briefly show the raw Vercel URL.

- [ ] (C) Other (describe)

**Recommended answer:** (A)

**Why:**
- Option (A) gives a cleaner user experience — the sign-in redirect stays on ronanprugh.com.
- Option (B) is simpler initially but users will see the Vercel subdomain during OAuth,
  which looks unprofessional for a portfolio showcase.
- Option (A) requires one extra step: updating Google Cloud Console + `NEXTAUTH_URL` in
  Vercel env vars for the score-mate project.
