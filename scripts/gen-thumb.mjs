// One-off generator for the co-located placeholder images shipped with the
// `this-site` Project. Branded with the Beacon tokens (ink/paper/signal).
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const INK = '#16150f'
const PAPER = '#f6f4ec'
const SIGNAL = '#f4c500'
const MUTE = '#d9d6c9'

const mono =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

function pixels(x, y, color, n = 5, cell = 11) {
  // A little 4-row pixel-accent cluster, Beacon-style.
  const rows = [0b1010, 0b0101, 0b1110, 0b0011]
  let r = ''
  rows.forEach((bits, ry) => {
    for (let cx = 0; cx < n; cx++) {
      if (bits & (1 << (n - 1 - cx))) {
        r += `<rect x="${x + cx * cell}" y="${y + ry * cell}" width="${cell - 2}" height="${cell - 2}" fill="${color}"/>`
      }
    }
  })
  return r
}

function svg({ code, title, sub }) {
  const W = 1200
  const H = 720
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="20" y="20" width="${W - 40}" height="${H - 40}" fill="none" stroke="${INK}" stroke-width="8"/>
  <rect x="20" y="20" width="${W - 40}" height="96" fill="${INK}"/>
  <text x="56" y="84" font-family="${mono}" font-size="34" letter-spacing="6" fill="${SIGNAL}">DH/SIG</text>
  <text x="${W - 56}" y="84" text-anchor="end" font-family="${mono}" font-size="26" letter-spacing="4" fill="${PAPER}">${code}</text>
  <rect x="56" y="220" width="240" height="240" fill="${MUTE}" stroke="${INK}" stroke-width="6"/>
  ${pixels(96, 270)}
  ${pixels(96, 360, SIGNAL)}
  <text x="350" y="320" font-family="${mono}" font-size="78" font-weight="700" letter-spacing="-2" fill="${INK}">${title}</text>
  <text x="352" y="392" font-family="${mono}" font-size="30" letter-spacing="2" fill="rgba(22,21,15,0.6)">${sub}</text>
  <rect x="350" y="430" width="${W - 350 - 56}" height="6" fill="${INK}"/>
  <rect x="56" y="${H - 96}" width="${W - 112}" height="44" fill="${SIGNAL}" stroke="${INK}" stroke-width="6"/>
  <text x="78" y="${H - 64}" font-family="${mono}" font-size="22" letter-spacing="3" fill="${INK}">CONTENT-AS-CODE · NEXT.JS · MDX</text>
</svg>`
}

const targets = [
  {
    file: 'content/projects/this-site/thumb.png',
    spec: { code: 'P01', title: 'THIS SITE', sub: 'server-rendered portfolio' },
  },
  {
    file: 'content/projects/this-site/card-grid.png',
    spec: { code: 'FIG.1', title: 'CARD GRID', sub: 'the Projects index' },
  },
]

for (const { file, spec } of targets) {
  const png = await sharp(Buffer.from(svg(spec))).png({ compressionLevel: 9 }).toBuffer()
  await writeFile(file, png)
  console.log(`wrote ${file} (${png.length} bytes)`)
}
