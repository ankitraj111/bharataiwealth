const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production deployment settings for GitHub Pages
  output: isProd ? 'export' : undefined,
  basePath: isProd ? '/bharataiwealth' : '',
  assetPrefix: isProd ? '/bharataiwealth' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
