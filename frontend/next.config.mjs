/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Only use basePath for GitHub Pages deployment
  ...(process.env.GITHUB_PAGES === 'true' && {
    basePath: '/bharataiwealth',
    assetPrefix: '/bharataiwealth',
  }),
  images: {
    unoptimized: true,
  },
}

export default nextConfig
