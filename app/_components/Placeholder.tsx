import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/**
 * Shared shell for the routes wired up in issue #3. Each is a placeholder
 * until its content lands (Projects grid #5, Walkthroughs #5, About #9,
 * Résumé #10) — the point here is that the home directory never dead-ends.
 */
export function Placeholder({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <main className="sig-grid-bg--light flex min-h-screen items-center justify-center p-4 sm:p-8">
      <section
        className="flex w-full max-w-2xl flex-col border-[3px] border-[#16150f] p-6 sm:p-8"
        style={{ background: '#f6f4ec', boxShadow: '6px 6px 0 rgba(22,21,15,0.9)' }}
      >
        <p
          style={{
            fontFamily: 'var(--sig-font-mono)',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(22,21,15,0.55)',
          }}
        >
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight break-words sm:text-5xl" style={{ color: '#16150f' }}>
          {title}
        </h1>
        <div className="mt-4" style={{ color: 'rgba(22,21,15,0.7)' }}>
          {children}
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 font-bold hover:opacity-60"
          style={{ color: '#16150f' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>
      </section>
    </main>
  )
}
