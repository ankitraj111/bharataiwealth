/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  // Use export for both production builds and GitHub Actions
  output: (isProd || isGithubActions) ? 'export' : undefined,
  basePath: (isProd || isGithubActions) ? '/bharataiwealth' : '',
  assetPrefix: (isProd || isGithubActions) ? '/bharataiwealth' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
