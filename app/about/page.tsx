import type { Metadata } from 'next'
import { Placeholder } from '../_components/Placeholder'

export const metadata: Metadata = {
  title: 'About — Dillon Ruiz-Hamilton',
  description: 'Who Dillon Ruiz-Hamilton is.',
}

export default function AboutPage() {
  return (
    <Placeholder eyebrow="01 · About" title="About">
      <p>Who I am. Coming soon.</p>
    </Placeholder>
  )
}
