import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ESLint is run separately via `npm run lint` (flat config), so it's not
  // re-run during `next build`.
  eslint: { ignoreDuringBuilds: true },
  // Co-located Project images are served through next/image; prefer modern
  // formats (AVIF, then WebP) when the browser advertises support.
  images: { formats: ['image/avif', 'image/webp'] },
}

export default nextConfig
