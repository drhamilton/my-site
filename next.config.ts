import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ESLint is run separately via `npm run lint` (flat config), so it's not
  // re-run during `next build`.
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
