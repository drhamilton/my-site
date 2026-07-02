import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, Mail, ExternalLink } from 'lucide-react'
import { resume } from '@/lib/resume'

export const metadata: Metadata = {
  title: 'Résumé',
  description:
    'Résumé of Dillon Ruiz-Hamilton — full-stack software engineer with 13 years across healthtech, e-commerce, and platform engineering.',
}

const INK = '#16150f'

const eyebrow: CSSProperties = {
  fontFamily: 'var(--sig-font-mono)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(22,21,15,0.55)',
  margin: '0 0 8px',
}

const mono: CSSProperties = {
  fontFamily: 'var(--sig-font-mono)',
  fontSize: 12,
  color: 'rgba(22,21,15,0.6)',
}

/** Signage-style section heading: mono label over a hard rule. */
function SectionHeader({ children }: { children: string }) {
  return (
    <h2
      className="mt-10 mb-4 border-b-[3px] pb-2 font-bold tracking-[0.14em] uppercase"
      style={{ borderColor: INK, color: INK, fontFamily: 'var(--sig-font-mono)', fontSize: 13 }}
    >
      {children}
    </h2>
  )
}

export default function ResumePage() {
  const { name, headline, contact, summary, skills, experience, education, pdf } = resume

  return (
    <main className="sig-grid-bg--light min-h-screen">
      <div className="mx-auto max-w-[860px] px-6 py-14 sm:px-8">
        <Link href="/" style={eyebrow} className="inline-block hover:opacity-60">
          ← DH/SIG · 02 — Résumé
        </Link>

        {/* Identity + download CTA */}
        <header className="flex flex-wrap items-end justify-between gap-6 border-b-[3px] pb-5" style={{ borderColor: INK }}>
          <div>
            <h1 className="m-0 text-[40px] font-bold tracking-[-0.03em] sm:text-[48px]" style={{ lineHeight: 0.95, color: INK }}>
              {name}
            </h1>
            <p className="mt-2" style={{ ...mono, fontSize: 13, color: 'rgba(22,21,15,0.7)' }}>
              {headline}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 hover:opacity-60" style={mono}>
                <Mail className="h-3.5 w-3.5" /> {contact.email}
              </a>
              <a href={contact.linkedinUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:opacity-60" style={mono}>
                <ExternalLink className="h-3.5 w-3.5" /> {contact.linkedin}
              </a>
            </div>
          </div>

          <a
            href={pdf}
            download
            className="inline-flex items-center gap-2 border-[3px] px-5 py-3 font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            style={{
              borderColor: INK,
              background: 'var(--sig-yellow)',
              color: INK,
              boxShadow: '4px 4px 0 rgba(22,21,15,0.9)',
              fontFamily: 'var(--sig-font-mono)',
              fontSize: 13,
              letterSpacing: '0.04em',
            }}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </header>

        {/* Summary */}
        <SectionHeader>Professional Summary</SectionHeader>
        <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(22,21,15,0.82)' }}>
          {summary}
        </p>

        {/* Skills */}
        <SectionHeader>Skills</SectionHeader>
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[max-content_1fr]">
          {skills.map((group) => (
            <div key={group.label} className="contents">
              <dt className="font-bold" style={{ ...mono, fontSize: 12, color: INK }}>
                {group.label}
              </dt>
              <dd className="m-0 text-[14px] leading-snug" style={{ color: 'rgba(22,21,15,0.82)' }}>
                {group.items}
              </dd>
            </div>
          ))}
        </dl>

        {/* Experience */}
        <SectionHeader>Work Experience</SectionHeader>
        <div className="flex flex-col gap-7">
          {experience.map((role) => (
            <article key={`${role.company}-${role.dates}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[17px] font-bold" style={{ color: INK }}>
                  {role.title} <span style={{ fontWeight: 400, color: 'rgba(22,21,15,0.6)' }}>· {role.company}</span>
                </h3>
                <span style={mono}>{role.dates}</span>
              </div>
              <ul className="mt-2.5 flex list-none flex-col gap-2 p-0">
                {role.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed" style={{ color: 'rgba(22,21,15,0.82)' }}>
                    <span aria-hidden style={{ color: 'var(--sig-yellow)', fontWeight: 700 }}>
                      ▸
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Education */}
        <SectionHeader>Education</SectionHeader>
        {education.map((entry) => (
          <p key={entry.degree} className="text-[15px]" style={{ color: 'rgba(22,21,15,0.82)' }}>
            <span className="font-bold" style={{ color: INK }}>
              {entry.degree}
            </span>{' '}
            · {entry.school}
          </p>
        ))}
      </div>
    </main>
  )
}
