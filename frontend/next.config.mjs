const isProd = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production deployment settings for GitHub Pages
  output: 'export', // Always export for static site
  basePath: isProd ? '/bharataiwealth' : '',
  assetPrefix: isProd ? '/bharataiwealth' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },
}

export default nextConfig
