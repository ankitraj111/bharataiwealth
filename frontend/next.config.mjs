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
  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? '/bharataiwealth' : '',
  },

  // Enable compression (not used in static export mode)
  compress: !isGitHubPages,

  // ==================== REWRITES ====================
  // NOTE: rewrites() are NOT supported in static export mode (GitHub Pages)
  ...(!isGitHubPages && {
    rewrites: async () => [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/:path*`,
      },
    ],
  }),

  // ==================== SECURITY HEADERS ====================
  // NOTE: headers() are NOT supported in static export mode (GitHub Pages)
  ...(!isGitHubPages && {
    headers: async () => [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          {
            key: 'Content-Security-Policy',
            value: isProd
              ? "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://ankitraj111.github.io https://bharat-wealth-backend.onrender.com https://bharat-wealth-ml.onrender.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
              : "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' http://localhost:* ws://localhost:*; frame-ancestors 'none'",
          },
          ...(isProd ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' }] : []),
        ],
      },
    ],
  }),
}

export default nextConfig
