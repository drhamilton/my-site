import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import { ProjectCard } from '../_components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects — Dillon Ruiz-Hamilton',
  description: 'Selected work by Dillon Ruiz-Hamilton — frontend builds and server systems.',
}

const eyebrow = {
  fontFamily: 'var(--sig-font-mono)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: 'rgba(22,21,15,0.55)',
  margin: '0 0 8px',
}

export default function ProjectsPage() {
  const projects = getProjects()

  return (
    <main className="sig-grid-bg--light min-h-screen">
      <div className="mx-auto max-w-[1140px] px-6 py-14 sm:px-8">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b-[3px] border-[#16150f] pb-4">
          <div>
            <Link
              href="/"
              style={eyebrow}
              className="inline-block hover:opacity-60"
            >
              ← DH/SIG · 02 — Projects
            </Link>
            <h1 className="m-0 text-[44px] font-bold tracking-[-0.03em] sm:text-[52px]" style={{ lineHeight: 0.9 }}>
              Selected Work
            </h1>
          </div>
          <span
            style={{
              fontFamily: 'var(--sig-font-mono)',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(22,21,15,0.5)',
            }}
          >
            {String(projects.length).padStart(2, '0')} project{projects.length === 1 ? '' : 's'}
          </span>
        </header>

        {projects.length === 0 ? (
          <p
            className="mt-10"
            style={{ fontFamily: 'var(--sig-font-mono)', fontSize: 13, color: 'rgba(22,21,15,0.55)' }}
          >
            No Projects published yet — add one under{' '}
            <code>content/projects/&lt;slug&gt;/index.mdx</code>.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 items-start gap-[26px] md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                code={`P${String(i + 1).padStart(2, '0')}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
