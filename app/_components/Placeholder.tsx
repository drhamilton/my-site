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
    <main className="tiles flex min-h-screen items-center justify-center p-4 sm:p-8">
      <section className="flex w-full max-w-2xl flex-col border-[3px] border-black bg-neutral-50 p-6 sm:p-8">
        <p className="text-xs font-bold tracking-widest text-black/50 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight break-words text-black sm:text-5xl">
          {title}
        </h1>
        <div className="mt-4 text-black/70">{children}</div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 font-bold text-black hover:opacity-60"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>
      </section>
    </main>
  )
}
