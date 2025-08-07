/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    // App directory is enabled by default in Next.js 13.4+
  },
  // Webpack configuration removed - GLB files served from public directory
};

module.exports = nextConfig;