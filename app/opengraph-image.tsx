import { ImageResponse } from 'next/og'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'

// Signage-style default share card, generated at build time.
export const alt = `${SITE_NAME} — portfolio`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INK = '#16150f'
const YELLOW = '#f4c500'
const FIELD = '#f6f4ec'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: FIELD,
          color: INK,
          padding: 80,
          border: `24px solid ${INK}`,
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 36, height: 36, background: YELLOW }} />
          <div style={{ fontSize: 28, letterSpacing: 8, textTransform: 'uppercase' }}>
            DH / SIG
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 34, color: '#4a4636' }}>{SITE_DESCRIPTION}</div>
        </div>
      </div>
    ),
    size,
  )
}
