import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lbesrtjgwjibfktfjkee.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },

  /* config options here */
};

export default nextConfig;
