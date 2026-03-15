import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xnoqcdboqiwshbrndcmq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
