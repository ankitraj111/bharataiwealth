/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for Vercel deployment
  // Only use basePath for GitHub Pages deployment
  ...(process.env.GITHUB_PAGES === 'true' && {
    basePath: '/bharataiwealth',
    assetPrefix: '/bharataiwealth',
    output: 'export',
  }),
  images: {
    unoptimized: true,
  },
}

export default nextConfig
