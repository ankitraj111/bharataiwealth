const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production deployment settings for GitHub Pages
  output: isGitHubPages ? 'export' : undefined, // Export for static site only on GH Pages
  basePath: isGitHubPages ? '/bharataiwealth' : '',
  assetPrefix: isGitHubPages ? '/bharataiwealth' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? '/bharataiwealth' : '',
  },
}

export default nextConfig
