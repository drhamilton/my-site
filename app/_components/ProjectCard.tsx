import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CodeChip } from './CodeChip'
import { PixelAccent } from './PixelAccent'
import { getProjectImage } from '@/lib/project-images'
import type { Project } from '@/lib/projects'

/**
 * ProjectCard — a Card in the Projects grid (Beacon "Project card"). Frontend
 * Projects show a demo pane (thumbnail or striped placeholder); server Projects
 * a no-UI pane. The Card links through to a Walkthrough only when one exists.
 */
const badgeStyle: CSSProperties = {
  fontFamily: 'var(--sig-font-mono)',
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '3px 8px',
  borderRadius: 3,
  whiteSpace: 'nowrap',
}

/** Demo-pane height, shared by the thumbnail and the striped placeholder. */
const PANE_HEIGHT = 210

const paneStyle: CSSProperties = {
  height: PANE_HEIGHT,
  backgroundColor: '#d9d6c9',
  backgroundImage:
    'repeating-linear-gradient(135deg, rgba(22,21,15,0.07) 0 9px, transparent 9px 18px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const paneLabelStyle: CSSProperties = {
  fontFamily: 'var(--sig-font-mono)',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(22,21,15,0.5)',
  whiteSpace: 'nowrap',
  border: '1.5px dashed rgba(22,21,15,0.4)',
  padding: '8px 14px',
  background: 'rgba(246,244,236,0.7)',
}

const titleStyle: CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  margin: 0,
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

export function ProjectCard({ project, code }: { project: Project; code: string }) {
  const server = project.type === 'server'
  const walkthroughHref = project.hasWalkthrough ? `/projects/${project.slug}` : undefined
  // A co-located thumbnail (frontmatter `thumbnail`) fills the demo pane via
  // next/image; an unset or unresolved filename falls back to the striped pane.
  const thumbnail = project.thumbnail
    ? getProjectImage(project.slug, project.thumbnail)
    : undefined

  const links: { label: string; href: string; external: boolean }[] = [
    project.demoUrl && { label: 'Live', href: project.demoUrl, external: true },
    project.repoUrl && { label: 'Repo', href: project.repoUrl, external: true },
    walkthroughHref && { label: 'Walkthrough', href: walkthroughHref, external: false },
  ].filter(Boolean) as { label: string; href: string; external: boolean }[]

  return (
    <article
      style={{
        boxSizing: 'border-box',
        border: '3px solid #16150f',
        background: '#f6f4ec',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '6px 6px 0 rgba(22,21,15,0.9)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 16px',
          borderBottom: '2px solid #16150f',
        }}
      >
        <CodeChip label={code} tone="outline" />
        <span
          style={{
            ...badgeStyle,
            background: server ? '#16150f' : '#f4c500',
            color: server ? '#f4c500' : '#16150f',
          }}
        >
          {server ? 'Service' : 'App'}
        </span>
        <PixelAccent size={26} mode="solid" color="#16150f" glow={0} style={{ marginLeft: 'auto' }} />
      </div>

      <div style={{ borderBottom: '2px solid #16150f' }}>
        {thumbnail ? (
          <div style={{ position: 'relative', height: PANE_HEIGHT }}>
            <Image
              src={thumbnail}
              alt={`${project.title} thumbnail`}
              fill
              sizes="(max-width: 768px) 100vw, 557px"
              placeholder="blur"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div style={paneStyle}>
            <span style={paneLabelStyle}>{server ? 'service · no UI' : 'demo'}</span>
          </div>
        )}
      </div>

      <div style={{ padding: '18px 18px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {walkthroughHref ? (
          <Link href={walkthroughHref} style={{ color: 'inherit', textDecoration: 'none' }}>
            <h3 style={titleStyle}>{project.title}</h3>
          </Link>
        ) : (
          <h3 style={titleStyle}>{project.title}</h3>
        )}
        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(22,21,15,0.75)', margin: '9px 0 0' }}>
          {project.blurb}
        </p>
        {project.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '16px 0 0' }}>
            {project.tags.map((tag) => (
              <span key={tag} style={tagStyle}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {links.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 'auto',
              paddingTop: 14,
              borderTop: '1px solid rgba(22,21,15,0.15)',
            }}
          >
            {links.map((lk) =>
              lk.external ? (
                <a key={lk.label} href={lk.href} target="_blank" rel="noreferrer" style={linkStyle}>
                  {lk.label} ↗
                </a>
              ) : (
                <Link key={lk.label} href={lk.href} style={linkStyle}>
                  {lk.label}
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </article>
  )
}
