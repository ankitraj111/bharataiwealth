const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production deployment settings for GitHub Pages
  output: isGitHubPages ? 'export' : undefined,
  basePath: isGitHubPages ? '/bharataiwealth' : '',
  assetPrefix: isGitHubPages ? '/bharataiwealth' : '',
  trailingSlash: true,
  
  // Performance optimizations
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
  
  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },
  
  // Optimize production builds
  swcMinify: true,
  reactStrictMode: true,
  
  // Reduce bundle size
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? '/bharataiwealth' : '',
  },
  
  // Enable compression
  compress: true,
  
  // Optimize fonts
  optimizeFonts: true,
}

export default nextConfig
