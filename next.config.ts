import type { NextConfig } from "next";

const SCOREMATE_URL = "https://score-mate-ronanprughs-projects.vercel.app";
const ESPN_FANTASY_URL = "https://espn-fantasy-stats.vercel.app";
const RAILRAT_URL = "https://railrat-pretty-view.pages.dev";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ScoreMate",
        destination: `${SCOREMATE_URL}/ScoreMate`,
      },
      {
        source: "/ScoreMate/:path*",
        destination: `${SCOREMATE_URL}/ScoreMate/:path*`,
      },
      // Auth.js builds its absolute URLs (Google redirect_uri, magic-link
      // callbacks) at the domain root with no /ScoreMate prefix, so auth
      // endpoints must be proxied from the root onto ScoreMate's
      // basePath-prefixed handler.
      {
        source: "/api/auth/:path*",
        destination: `${SCOREMATE_URL}/ScoreMate/api/auth/:path*`,
      },
      // ESPN Fantasy Stats is a Vite SPA served under /espn-fantasy-stats
      // (Vite `base`), so it already emits prefixed asset + API URLs. The
      // espn app's own vercel.json maps those prefixed paths onto its assets
      // and Cloud Run backend.
      {
        source: "/espn-fantasy-stats",
        destination: `${ESPN_FANTASY_URL}/espn-fantasy-stats`,
      },
      {
        source: "/espn-fantasy-stats/:path*",
        destination: `${ESPN_FANTASY_URL}/espn-fantasy-stats/:path*`,
      },
      // RailRat Pretty View — Vite PWA on Cloudflare Pages
      {
        source: "/RRPrettyView",
        destination: `${RAILRAT_URL}/RRPrettyView/`,
      },
      {
        source: "/RRPrettyView/:path*",
        destination: `${RAILRAT_URL}/RRPrettyView/:path*`,
      },
    ];
  },
};

export default nextConfig;
