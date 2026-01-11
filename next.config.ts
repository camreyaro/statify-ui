import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/stats',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
