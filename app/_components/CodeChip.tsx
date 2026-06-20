import type { CSSProperties, ReactNode } from 'react'

/**
 * CodeChip — the mono numbered marker (01, A5, P02). The Beacon system's atom.
 * Ported from the "my-site signage" Claude Design project.
 */
type Tone = 'outline' | 'ink' | 'yellow' | 'red' | 'blue'

const TONES: Record<Tone, CSSProperties> = {
  outline: { border: '2px solid currentColor', background: 'transparent', color: 'inherit' },
  ink: { background: '#16150f', color: '#f4c500', border: '2px solid #16150f' },
  yellow: { background: '#f4c500', color: '#16150f', border: '2px solid #f4c500' },
  red: { border: '2px solid #d4202a', color: '#d4202a', background: 'transparent' },
  blue: { border: '2px solid #143d8a', color: '#143d8a', background: 'transparent' },
}

export function CodeChip({
  children,
  label,
  tone = 'outline',
  style,
  className,
}: {
  children?: ReactNode
  label?: ReactNode
  tone?: Tone
  style?: CSSProperties
  className?: string
}) {
  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--sig-font-mono)',
        fontSize: 12,
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1px 7px',
        borderRadius: 3,
        lineHeight: 1.4,
        ...TONES[tone],
        ...style,
      }}
    >
      {label != null ? label : children}
    </span>
  )
}
