/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/bharataiwealth',
  assetPrefix: '/bharataiwealth',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
