# ronanprugh.com

Personal portfolio site — a polished, sendable alternative to a resume.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and deployed on Vercel.

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Start local dev server           |
| `pnpm build`        | Production build                 |
| `pnpm start`        | Start production server          |
| `pnpm lint`         | Run ESLint                       |
| `pnpm format`       | Format all files with Prettier   |
| `pnpm format:check` | Check formatting without writing |
| `pnpm typecheck`    | TypeScript type check (no emit)  |
| `pnpm test`         | Run Vitest in watch mode         |
| `pnpm test:ci`      | Run Vitest once (CI mode)        |

## Project Structure

```
src/
  app/           # Next.js App Router pages and layouts
  components/    # Shared UI components
    sections/    # Full-page sections (Hero, About, Experience, etc.)
  data/          # Typed content data (experience, education, skills, projects)
public/          # Static assets (headshot, OG image, project screenshots)
docs/specs/      # SDD specs, task lists, audits, and proof artifacts
```

## Architecture

See [`docs/specs/01-spec-personal-portfolio-site/`](docs/specs/01-spec-personal-portfolio-site/) for the full specification, task list, and planning audit.

See [`AGENTS.md`](AGENTS.md) for repo conventions (stack, quality gates, commit format).
