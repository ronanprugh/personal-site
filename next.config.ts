import type { NextConfig } from "next";

const SCOREMATE_URL = "https://score-mate-ronanprughs-projects.vercel.app";

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
    ];
  },
};

export default nextConfig;
