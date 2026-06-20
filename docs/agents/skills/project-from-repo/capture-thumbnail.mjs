// Capture a Card thumbnail by screenshotting a running Demo.
//   node docs/agents/skills/project-from-repo/capture-thumbnail.mjs <url> <outPath>
// First run on a machine needs the browser binary: npx playwright install chromium
import { chromium } from 'playwright'

const [url, out] = process.argv.slice(2)
if (!url || !out) {
  console.error('usage: capture-thumbnail.mjs <url> <outPath.png>')
  process.exit(1)
}

const browser = await chromium.launch()
try {
  // 1200×750 ≈ the 1200×720 placeholder aspect; 2× for a crisp Card on retina.
  const page = await browser.newPage({
    viewport: { width: 1200, height: 750 },
    deviceScaleFactor: 2,
  })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
  await page.waitForTimeout(800) // let fonts and entrance animations settle
  await page.screenshot({ path: out })
  console.log(`wrote ${out}`)
} finally {
  await browser.close()
}
