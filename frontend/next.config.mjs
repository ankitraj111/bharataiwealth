/** @type {import('next').NextConfig} */
const nextConfig = {
  // Re-triggering deployment to ensure GitHub Actions is synced.
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
