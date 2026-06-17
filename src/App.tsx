import type { ComponentType } from 'react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Mail } from 'lucide-react'

/* LinkedIn (removed from Simple Icons over brand policy) — inline filled mark */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

/* Outlined code chip, e.g. [01] */
function Chip({ code }: { code: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-[3px] border-2 border-current px-1.5 text-xs font-bold">
      {code}
    </span>
  )
}

/* Colored Tokyo Metro line roundel with a glyph inside */
function LineRoundel({
  Icon,
  color,
}: {
  Icon: ComponentType<{ className?: string }>
  color: string
}) {
  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
      style={{ backgroundColor: color }}
    >
      <Icon className="h-6 w-6" />
    </span>
  )
}

const directory = [
  { code: '01', label: 'About', sub: 'Who I am' },
  { code: '02', label: 'Projects', sub: 'Things I built' },
  { code: '03', label: 'Writing', sub: 'Notes & essays' },
  { code: '04', label: 'Résumé', sub: 'PDF' },
]

const socials = [
  {
    label: 'GitHub',
    value: 'github.com/dillon',
    Icon: SiGithub,
    color: '#181717',
    href: 'https://github.com/',
  },
  {
    label: 'LinkedIn',
    value: 'in/dillon-hamilton',
    Icon: LinkedInIcon,
    color: '#0a66c2',
    href: 'https://linkedin.com/',
  },
  {
    label: 'Email',
    value: 'dillonrhamilton@gmail.com',
    Icon: Mail,
    color: '#e60012',
    href: 'mailto:dillonrhamilton@gmail.com',
  },
]

function App() {
  return (
    <main className="tiles flex min-h-screen items-center justify-center p-4 sm:p-8">
      <div className="grid w-full max-w-4xl gap-3 md:grid-cols-2">
        {/* Yellow exit / identity panel */}
        <section className="flex flex-col border-[3px] border-black bg-exit p-6">
          <p className="text-xs font-bold tracking-widest text-black/60 uppercase">
            Portfolio
          </p>

          <h1 className="mt-4 text-4xl leading-[0.95] font-bold tracking-tight text-black sm:text-5xl">
            Dillon
            <br />
            Hamilton
          </h1>
          <p className="mt-2 font-bold text-black/70">Software Engineer</p>

          <ul className="mt-6 flex flex-col gap-3 text-black">
            {directory.map(({ code, label, sub }) => (
              <li key={code}>
                <a href="#" className="flex items-center gap-3 hover:opacity-60">
                  <Chip code={code} />
                  <span className="flex flex-col leading-tight">
                    <span className="font-bold">{label}</span>
                    <span className="text-xs text-black/60">{sub}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-auto pt-6 text-right text-sm font-bold text-black/70">
            Sections
          </p>
        </section>

        {/* White line-guide panel */}
        <section className="flex flex-col border-[3px] border-black bg-neutral-50 p-6">
          <p className="text-xs font-bold tracking-widest text-black/50 uppercase">
            Connect
          </p>

          <ul className="mt-6 flex flex-col">
            {socials.map(({ label, value, Icon, color, href }, i) => (
              <li key={label} className={i > 0 ? 'border-t border-black/15' : ''}>
                <a
                  href={href}
                  aria-label={label}
                  className="flex items-center gap-4 py-4 transition-colors hover:bg-black/5"
                >
                  <LineRoundel Icon={Icon} color={color} />
                  <span className="flex flex-col leading-tight">
                    <span className="text-xl font-bold text-black">{label}</span>
                    <span className="text-sm text-black/60">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default App
