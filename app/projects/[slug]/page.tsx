import type { Metadata } from 'next'
import { Placeholder } from '../../_components/Placeholder'

type Params = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  return { title: `${slug} — Dillon Hamilton` }
}

export default async function WalkthroughPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  return (
    <Placeholder eyebrow="Walkthrough" title={slug}>
      <p>The Walkthrough for this Project lands here. Coming soon.</p>
    </Placeholder>
  )
}
