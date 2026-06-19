import type { Metadata } from 'next'
import { Placeholder } from '../_components/Placeholder'

export const metadata: Metadata = {
  title: 'Projects — Dillon Hamilton',
  description: 'Things Dillon Hamilton has built.',
}

export default function ProjectsPage() {
  return (
    <Placeholder eyebrow="02 · Projects" title="Projects">
      <p>The Card grid lands here — one Card per Project. Coming soon.</p>
    </Placeholder>
  )
}
