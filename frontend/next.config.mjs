/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

console.log('--- NEXT CONFIG DEBUG ---');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('GITHUB_ACTIONS:', process.env.GITHUB_ACTIONS);
console.log('isProd:', isProd);
console.log('isGithubActions:', isGithubActions);
console.log('-------------------------');

const nextConfig = {
  // Always use export for production to ensure consistency
  output: 'export',
  // Hardcode basePath for now to eliminate any path issues
  basePath: '/bharataiwealth',
  assetPrefix: '/bharataiwealth',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
