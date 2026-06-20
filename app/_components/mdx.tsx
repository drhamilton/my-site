import type { ComponentPropsWithoutRef, CSSProperties } from 'react'

/**
 * Styling for the MDX body of a Walkthrough. Maps Markdown elements to the
 * Beacon look so narrative + screenshots read consistently with the rest of
 * the site. The set is intentionally token-driven and restyle-friendly.
 */
const heading: CSSProperties = { fontWeight: 700, letterSpacing: '-0.02em', color: '#16150f' }

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2 style={{ ...heading, fontSize: 28, margin: '40px 0 12px' }} {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 style={{ ...heading, fontSize: 20, margin: '28px 0 8px' }} {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p style={{ fontSize: 16, lineHeight: 1.7, margin: '0 0 16px', color: 'rgba(22,21,15,0.85)' }} {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.7 }} {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.7 }} {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => <li style={{ margin: '4px 0' }} {...props} />,
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a style={{ color: '#143d8a', textDecoration: 'underline' }} {...props} />
  ),
  // next/image lands in #6; plain img renders co-located screenshots until then
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    <img
      style={{ display: 'block', maxWidth: '100%', height: 'auto', border: '3px solid #16150f', margin: '24px 0' }}
      alt=""
      {...props}
    />
  ),
  hr: () => <hr style={{ border: 0, borderTop: '2px solid rgba(22,21,15,0.2)', margin: '32px 0' }} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      style={{ borderLeft: '3px solid #16150f', margin: '0 0 16px', padding: '4px 0 4px 16px', color: 'rgba(22,21,15,0.7)' }}
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      style={{ fontFamily: 'var(--sig-font-mono)', fontSize: '0.9em', background: 'rgba(22,21,15,0.06)', padding: '1px 5px', borderRadius: 3 }}
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      style={{ fontFamily: 'var(--sig-font-mono)', fontSize: 13, background: '#16150f', color: 'rgba(255,255,255,0.88)', padding: 16, overflow: 'auto', margin: '0 0 20px' }}
      {...props}
    />
  ),
}
