import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ESLint is run separately via `npm run lint` (flat config), so it's not
  // re-run during `next build`.
  eslint: { ignoreDuringBuilds: true },
  // Co-located Project images are served through next/image; prefer modern
  // formats (AVIF, then WebP) when the browser advertises support.
  images: { formats: ['image/avif', 'image/webp'] },
  // High-value, low-friction security headers. A full CSP (strict script-src
  // with nonces) is deferred — it needs App Router nonce wiring and is easy to
  // break, so it belongs in its own iteration.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Vercel serves HTTPS; pin it for two years and preload.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Anti-clickjacking for our own pages.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Disable browser features the site never uses.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
