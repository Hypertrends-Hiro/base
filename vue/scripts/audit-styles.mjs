#!/usr/bin/env node
/**
 * Audit style parity: Playwright-based capture of computed styles for key selectors per route.
 * Run: BASE_URL=http://localhost:5173 node vue/scripts/audit-styles.mjs
 * Optional: SAVE_BASELINE=1 to write vue/audit-styles-react.json (run against React app first).
 * Output: vue/audit-styles.json (or audit-styles-react.json if SAVE_BASELINE=1)
 */

import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
const BASE = process.env.BASE_URL || 'http://localhost:5173'
const SAVE_BASELINE = process.env.SAVE_BASELINE === '1'

const STYLE_PROPS = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'borderRadius', 'boxShadow']

const ROUTES = [
  '/',
  '/login',
  '/register',
  '/dashboard',
  '/profile',
  '/shop',
  '/plan',
  '/treatments',
  '/checkout',
]

const SELECTORS = [
  { name: 'main', selector: 'main' },
  { name: 'header', selector: 'header' },
  { name: 'sidebar', selector: 'aside' },
  { name: 'primaryButton', selector: 'button.bg-primary, a.bg-primary, [class*="bg-primary"]' },
  { name: 'hero', selector: '[class*="hero"], section:first-of-type' },
  { name: 'card', selector: '.bg-card, [class*="shadow-soft"]' },
]

async function getStyles(page, selectors) {
  const out = {}
  for (const { name, selector } of selectors) {
    try {
      const el = page.locator(selector).first()
      const count = await el.count()
      if (count === 0) continue
      const styles = await el.evaluate((el, props) => {
        const c = window.getComputedStyle(el)
        const o = {}
        for (const p of props) o[p] = c.getPropertyValue(p.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')) || c[p]
        return o
      }, STYLE_PROPS)
      out[name] = styles
    } catch (_) {
      out[name] = null
    }
  }
  return out
}

async function main() {
  let browser
  try {
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    const report = { baseUrl: BASE, routes: {}, timestamp: new Date().toISOString() }

    for (const route of ROUTES) {
      try {
        await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await page.waitForTimeout(500)
        report.routes[route] = await getStyles(page, SELECTORS)
      } catch (e) {
        report.routes[route] = { error: e.message }
      }
    }

    const outFile = SAVE_BASELINE ? path.join(root, 'vue/audit-styles-react.json') : path.join(root, 'vue/audit-styles.json')
    fs.writeFileSync(outFile, JSON.stringify(report, null, 2), 'utf8')
    console.log('audit-styles: wrote', outFile)
  } finally {
    if (browser) await browser.close()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
