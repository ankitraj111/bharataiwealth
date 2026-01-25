/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use basePath and output export for production (GitHub Pages)
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    basePath: '/bharataiwealth',
    assetPrefix: '/bharataiwealth',
  }),
  images: {
    unoptimized: true,
  },
}

export default nextConfig
