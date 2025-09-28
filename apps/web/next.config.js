/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      allowedOrigins: [".localhost"],
    },
  },
  eslint: {
    dirs: ["."],
  },
};

module.exports = nextConfig;
