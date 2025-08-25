import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ac.goit.global",
        pathname: "/fullstack/react/**",
      },
    ],
  },
};

export default nextConfig;