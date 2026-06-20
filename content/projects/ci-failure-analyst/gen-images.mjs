// Regenerates this Project's images (thumb.png, pipeline.png), branded with the
// Beacon tokens (ink/paper/signal). Run from anywhere:
//   node content/projects/ci-failure-analyst/gen-images.mjs
// thumb.png is a placeholder Card image — replace with a real screenshot if one
// exists. pipeline.png is an architecture diagram of the actual processing flow.
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const HERE = dirname(fileURLToPath(import.meta.url))

const INK = '#16150f'
const PAPER = '#f6f4ec'
const SIGNAL = '#f4c500'
const MUTE = '#d9d6c9'

const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

function pixels(x, y, color = INK, n = 5, cell = 11) {
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

// Card thumbnail: signage panel with title + footer strip.
function thumbSvg() {
  const W = 1200
  const H = 720
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="20" y="20" width="${W - 40}" height="${H - 40}" fill="none" stroke="${INK}" stroke-width="8"/>
  <rect x="20" y="20" width="${W - 40}" height="96" fill="${INK}"/>
  <text x="56" y="84" font-family="${mono}" font-size="34" letter-spacing="6" fill="${SIGNAL}">DH/SIG</text>
  <text x="${W - 56}" y="84" text-anchor="end" font-family="${mono}" font-size="26" letter-spacing="4" fill="${PAPER}">P02</text>
  <rect x="56" y="220" width="240" height="240" fill="${MUTE}" stroke="${INK}" stroke-width="6"/>
  ${pixels(96, 270)}
  ${pixels(96, 360, SIGNAL)}
  <text x="350" y="316" font-family="${mono}" font-size="74" font-weight="700" letter-spacing="-2" fill="${INK}">CI ANALYST</text>
  <text x="352" y="386" font-family="${mono}" font-size="28" letter-spacing="2" fill="rgba(22,21,15,0.6)">CI failure-triage pipeline</text>
  <rect x="350" y="424" width="${W - 350 - 56}" height="6" fill="${INK}"/>
  <rect x="56" y="${H - 96}" width="${W - 112}" height="44" fill="${SIGNAL}" stroke="${INK}" stroke-width="6"/>
  <text x="78" y="${H - 64}" font-family="${mono}" font-size="22" letter-spacing="3" fill="${INK}">JAVA 21 · SPRING BOOT · TRANSACTIONAL OUTBOX</text>
</svg>`
}

// Architecture diagram: the real processing pipeline, stage by stage.
function pipelineSvg() {
  const W = 1200
  const H = 560
  const stages = ['Webhook', 'Parse', 'Fetch logs', 'Analyze', 'Persist', 'Notify']
  const bw = 168
  const gap = 18
  const totalW = stages.length * bw + (stages.length - 1) * gap
  const x0 = (W - totalW) / 2
  const y = 150
  const bh = 120

  let boxes = ''
  stages.forEach((label, i) => {
    const x = x0 + i * (bw + gap)
    const fill = label === 'Analyze' ? SIGNAL : PAPER
    boxes += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${fill}" stroke="${INK}" stroke-width="5"/>`
    boxes += `<text x="${x + bw / 2}" y="${y + bh / 2 + 8}" text-anchor="middle" font-family="${mono}" font-size="24" font-weight="700" fill="${INK}">${label}</text>`
    if (i < stages.length - 1) {
      const ax = x + bw + gap / 2
      boxes += `<text x="${ax}" y="${y + bh / 2 + 9}" text-anchor="middle" font-family="${mono}" font-size="26" fill="${INK}">›</text>`
    }
  })

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="20" y="20" width="${W - 40}" height="${H - 40}" fill="none" stroke="${INK}" stroke-width="8"/>
  <rect x="20" y="20" width="${W - 40}" height="84" fill="${INK}"/>
  <text x="52" y="74" font-family="${mono}" font-size="28" letter-spacing="5" fill="${SIGNAL}">FIG.1 — PROCESSING PIPELINE</text>
  ${boxes}
  <text x="${W / 2}" y="${y + bh + 70}" text-anchor="middle" font-family="${mono}" font-size="22" fill="rgba(22,21,15,0.7)">Persist writes the result + a PENDING outbox row in one transaction;</text>
  <text x="${W / 2}" y="${y + bh + 102}" text-anchor="middle" font-family="${mono}" font-size="22" fill="rgba(22,21,15,0.7)">a scheduled relay drains the outbox to Notify — at-least-once delivery.</text>
</svg>`
}

const targets = [
  { file: 'thumb.png', svg: thumbSvg() },
  { file: 'pipeline.png', svg: pipelineSvg() },
]

for (const { file, svg } of targets) {
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
  await writeFile(join(HERE, file), png)
  console.log(`wrote ${file} (${png.length} bytes)`)
}
