import type { NextConfig } from "next";

const SCOREMATE_URL = "https://score-mate-ronanprughs-projects.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ScoreMate",
        destination: SCOREMATE_URL,
      },
      {
        source: "/ScoreMate/:path*",
        destination: `${SCOREMATE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
