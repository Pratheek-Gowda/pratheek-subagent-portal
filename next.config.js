/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This tells Vercel to skip the "grammar" check
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This tells Vercel to skip the strict type check
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
