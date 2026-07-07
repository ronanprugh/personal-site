export interface Project {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  imagePath: string;
  accent: "amber" | "coral" | "teal";
  icon: "pen" | "bars" | "train";
}

export const projects: Project[] = [
  {
    slug: "score-mate",
    name: "ScoreMate",
    shortDescription:
      "Mobile-first sports score-tracker. Favorite teams and leagues, then see yesterday's results, today's games, and tomorrow's schedule at a glance.",
    fullDescription:
      "ScoreMate is a mobile-first personal sports score-tracker built with Next.js 16 and Tailwind CSS v4. Sign in with Google or a magic link, favorite any combination of teams, sports, and leagues, and get a single glanceable feed showing what played yesterday, what's live today, and what's coming tomorrow — no noise, no ads. Authentication is handled by Auth.js (NextAuth v5) backed by Neon Postgres and Drizzle ORM, with a clean server-component architecture throughout.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "Auth.js (NextAuth v5)",
      "Neon Postgres",
      "Drizzle ORM",
      "Vercel",
    ],
    githubUrl: "https://github.com/ronanprugh/score-mate",
    demoUrl: "https://ronanprugh.com/ScoreMate",
    imagePath: "/projects/score-mate.png",
    accent: "amber",
    icon: "pen",
  },
  {
    slug: "espn-fantasy-stats",
    name: "ESPN Fantasy Stats",
    shortDescription:
      "Multi-user web app for analyzing ESPN Fantasy Football leagues — standings, playoff brackets, scoreboard, team comparisons, and head-to-head records across seasons.",
    fullDescription:
      "ESPN Fantasy Stats is a full-stack analytics platform for ESPN Fantasy Football leagues. The FastAPI backend wraps the espn_api library, stores ESPN credentials encrypted at rest with Fernet, and exposes a REST API consumed by a React + Vite + TypeScript frontend. Features include all-time and per-season standings tables, interactive SVG playoff bracket reconstruction with box scores, a per-week scoreboard grid, per-team hubs, year-over-year stat comparison charts, and full head-to-head records between any two owners. Auth is invite-only with bcrypt-hashed passwords and cookie sessions. Hosted on Cloud Run (backend) + Vercel (frontend) with automatic deploys via Cloud Build on push to main.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Recharts",
      "FastAPI",
      "SQLAlchemy",
      "Postgres",
      "Docker",
      "Cloud Run",
      "Vercel",
    ],
    githubUrl: "https://github.com/ronanprugh/espn_fantasy_stats",
    demoUrl: "https://ronanprugh.com/espn-fantasy-stats",
    imagePath: "/projects/espn-fantasy-stats.png",
    accent: "coral",
    icon: "bars",
  },
  {
    slug: "railrat-pretty-view",
    name: "RailRat Pretty View",
    shortDescription:
      "Mobile-first PWA that renders Amtrak train data from railrat.net in a friendlier, glanceable UI — installable on iOS and Android.",
    fullDescription:
      "RailRat Pretty View is a two-piece project: a Cloudflare Worker that scrapes railrat.net's Amtrak HTML and serves clean JSON, and a Vite + React + TypeScript PWA that renders that data in a mobile-first layout. Search for any Amtrak train by number, see station stops with arrival/departure times, delays, and status at a glance. Installable as a home-screen app on iOS and Android via the native share menu.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Cloudflare Workers",
      "Cloudflare Pages",
    ],
    githubUrl: "https://github.com/ronanprugh/railrat-pretty-view",
    demoUrl: "https://ronanprugh.com/RRPrettyView",
    imagePath: "/projects/railrat-pretty-view.png",
    accent: "teal",
    icon: "train",
  },
];
