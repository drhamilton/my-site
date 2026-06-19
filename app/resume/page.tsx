import type { Metadata } from 'next'
import { Placeholder } from '../_components/Placeholder'

export const metadata: Metadata = {
  title: 'Résumé — Dillon Hamilton',
  description: 'The experience of Dillon Hamilton.',
}

export default function ResumePage() {
  return (
    <Placeholder eyebrow="03 · Résumé" title="Résumé">
      <p>Experience and background. Coming soon.</p>
    </Placeholder>
  )
}
