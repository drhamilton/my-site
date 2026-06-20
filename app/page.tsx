import type { CSSProperties } from 'react'
import { IdentityPanel } from './_components/IdentityPanel'
import { PixelAccent } from './_components/PixelAccent'

const directory = [
  { code: '01', label: 'About', href: '/about' },
  { code: '02', label: 'Projects', href: '/projects' },
  { code: '03', label: 'Résumé', href: '/resume' },
]

const socials = [
  { code: 'A1', label: 'GitHub', value: 'github.com/drhamilton', href: 'https://github.com/drhamilton' },
  { code: 'A2', label: 'LinkedIn', value: 'in/dillon-hamilton', href: 'https://www.linkedin.com/in/dillon-hamilton/' },
  { code: 'B1', label: 'Email', value: 'dillonrhamilton@gmail.com', href: 'mailto:dillonrhamilton@gmail.com' },
]

const codeMark: CSSProperties = {
  fontFamily: 'var(--sig-font-mono)',
  fontWeight: 600,
  fontSize: 12,
  border: '2px solid #16150f',
  borderRadius: 3,
  padding: '2px 7px',
}

export default function Home() {
  return (
    <main className="sig-grid-bg flex min-h-screen items-center justify-center p-6 sm:p-12">
      <div className="flex flex-wrap items-stretch justify-center gap-5">
        <IdentityPanel items={directory} style={{ width: 330, maxWidth: '100%' }} />

        <section
          className="flex w-[340px] max-w-full flex-col border-[3px] border-[#16150f] p-6"
          style={{ background: '#f6f4ec' }}
        >
          <p
            style={{
              fontFamily: 'var(--sig-font-mono)',
              fontSize: 10.5,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(22,21,15,0.5)',
              margin: '0 0 6px',
            }}
          >
            Connect · Exit
          </p>
          <ul className="m-0 mt-auto flex list-none flex-col gap-0.5 p-0">
            {socials.map(({ code, label, value, href }, i) => (
              <li
                key={code}
                style={{ borderBottom: i < socials.length - 1 ? '1px solid rgba(22,21,15,0.15)' : 'none' }}
              >
                <a
                  href={href}
                  aria-label={label}
                  className="flex items-center gap-3.5 py-3 transition-opacity hover:opacity-70"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <PixelAccent size={30} grid={4} mode="solid" color="#16150f" glow={0} />
                  <span className="flex flex-1 flex-col leading-tight">
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{label}</span>
                    <span
                      style={{
                        fontFamily: 'var(--sig-font-mono)',
                        fontSize: 10.5,
                        color: 'rgba(22,21,15,0.6)',
                      }}
                    >
                      {value}
                    </span>
                  </span>
                  <span style={codeMark}>{code}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
