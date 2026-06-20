import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { mdxComponents } from '../../_components/mdx'

type Params = { slug: string }

// Only Projects with a Walkthrough get a page; Card-only slugs 404.
export const dynamicParams = false

export function generateStaticParams() {
  return getProjects()
    .filter((project) => project.hasWalkthrough)
    .map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: `${project.title} — Dillon Hamilton`, description: project.blurb }
}

const eyebrow: CSSProperties = {
  fontFamily: 'var(--sig-font-mono)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(22,21,15,0.55)',
  margin: '0 0 8px',
}

const tagStyle: CSSProperties = {
  fontFamily: 'var(--sig-font-mono)',
  fontSize: 10.5,
  color: 'rgba(22,21,15,0.7)',
  border: '1px solid rgba(22,21,15,0.3)',
  borderRadius: 2,
  padding: '2px 7px',
}

const linkStyle: CSSProperties = {
  fontFamily: 'var(--sig-font-mono)',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
  color: '#16150f',
  textDecoration: 'none',
}

export default async function WalkthroughPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project || !project.hasWalkthrough) notFound()

  const showEmbed = project.embed && Boolean(project.demoUrl)

  return (
    <main className="sig-grid-bg--light min-h-screen">
      <article className="mx-auto max-w-[820px] px-6 py-14 sm:px-8">
        <header className="border-b-[3px] border-[#16150f] pb-6">
          <Link href="/projects" style={eyebrow} className="inline-block hover:opacity-60">
            ← Selected Work
          </Link>
          <h1 className="m-0 text-[40px] font-bold tracking-[-0.03em]" style={{ lineHeight: 0.95 }}>
            {project.title}
          </h1>
          <p className="mt-3 text-[17px]" style={{ color: 'rgba(22,21,15,0.7)', lineHeight: 1.5 }}>
            {project.blurb}
          </p>
          {project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} style={tagStyle}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          {(project.demoUrl || project.repoUrl) && (
            <div className="mt-5 flex gap-4">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" style={linkStyle}>
                  Live Demo ↗
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" style={linkStyle}>
                  Repo ↗
                </a>
              )}
            </div>
          )}
        </header>

        {showEmbed && (
          <div className="mt-8">
            <iframe
              src={project.demoUrl}
              title={`${project.title} — live Demo`}
              loading="lazy"
              className="block w-full"
              style={{ height: 620, border: '3px solid #16150f', background: '#fff' }}
            />
          </div>
        )}

        <div className="mt-8">
          <MDXRemote source={project.body} components={mdxComponents} />
        </div>
      </article>
    </main>
  )
}
