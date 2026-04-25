import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1ifl6xx8vx.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
