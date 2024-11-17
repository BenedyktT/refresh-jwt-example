import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: "/accounts/:path*",
        destination: "http://localhost:3000/accounts/:path*",
      },
    ];
  },
};

export default nextConfig;
