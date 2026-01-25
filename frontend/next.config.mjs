/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production deployment settings for GitHub Pages
  output: 'export',
  basePath: '/bharataiwealth',
  assetPrefix: '/bharataiwealth',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
