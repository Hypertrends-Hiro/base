#!/usr/bin/env node
/**
 * Audit copy: extract visible/literal strings from React and Vue, output diff.
 * Strings present in Vue but NOT in React = invented copy (must be empty).
 * Output: vue/audit-copy.json
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
const reactSrc = path.join(root, 'react/src')
const vueSrc = path.join(root, 'vue/src')

function extractStringsFromFile(filePath, content) {
  const strings = new Set()
  // Double-quoted strings (skip imports and short tokens)
  const dq = content.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)
  for (const m of dq) {
    const s = m[1].trim()
    if (s.length >= 3 && !s.startsWith('@') && !s.startsWith('/') && !s.includes('.')) strings.add(s)
  }
  // Single-quoted
  const sq = content.matchAll(/'([^'\\]*(?:\\.[^'\\]*)*)'/g)
  for (const m of sq) {
    const s = m[1].trim()
    if (s.length >= 3 && !s.startsWith('@') && !s.startsWith('/')) strings.add(s)
  }
  // Template literals (single line)
  const tpl = content.matchAll(/`([^`\\]*(?:\\.[^`\\]*)*)`/g)
  for (const m of tpl) {
    const s = m[1].trim()
    if (s.length >= 5) strings.add(s)
  }
  // JSX/HTML text: >...< (simplified)
  const text = content.matchAll(/>\s*([^<{]+?)\s*</g)
  for (const m of text) {
    const s = m[1].replace(/\s+/g, ' ').trim()
    if (s.length >= 2 && !s.startsWith('{{') && !s.startsWith('v-')) strings.add(s)
  }
  return strings
}

function walkDir(dir, ext, out) {
  if (!fs.existsSync(dir)) return
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory() && e.name !== 'node_modules') walkDir(full, ext, out)
    else if (e.isFile() && e.name.endsWith(ext)) out.push(full)
  }
}

const reactFiles = []
const vueFiles = []
walkDir(reactSrc, '.tsx', reactFiles)
walkDir(reactSrc, '.ts', reactFiles)
walkDir(vueSrc, '.vue', vueFiles)
walkDir(vueSrc, '.ts', vueFiles)

const reactStrings = new Set()
const vueStrings = new Set()

for (const f of reactFiles) {
  const content = fs.readFileSync(f, 'utf8')
  extractStringsFromFile(f, content).forEach((s) => reactStrings.add(s))
}
for (const f of vueFiles) {
  const content = fs.readFileSync(f, 'utf8')
  extractStringsFromFile(f, content).forEach((s) => vueStrings.add(s))
}

// Normalize: lowercase for "coming soon" check; keep original for report
const reactLower = new Set([...reactStrings].map((s) => s.toLowerCase()))
const onlyInVue = [...vueStrings].filter((s) => !reactLower.has(s.toLowerCase()))

// Forbidden substrings: invented or default template copy that must not appear in Vue unless in React
const forbiddenSubstrings = [
  'local fixture',
  'Meal cards for the selected day',
  'to test HMR',
  'Check out',
  'official Vue + Vite',
  'Learn more about IDE Support',
  'Vue Docs Scaling up',
  'Click on the Vite and Vue logos',
]
// Report: (1) any Vue string containing forbidden text that isn't in React, (2) "coming soon" in Vue when not in React
const inventedInVue = []
for (const s of vueStrings) {
  const lower = s.toLowerCase()
  // Only flag short user-visible "coming soon" strings not in React (skip template chunks)
  if (/coming\s+soon/i.test(s) && s.length < 200 && !reactLower.has(lower)) inventedInVue.push(s)
  else if (forbiddenSubstrings.some((f) => s.includes(f)) && s.length < 300) inventedInVue.push(s)
}
// Also report strings that look like visible copy and are only in Vue (stricter filter)
const looksLikeCopy = (s) => {
  if (s.length < 5 || s.length > 400) return false
  if (/import|const |=>|\.vue|\.tsx|path |class=|:class|@\//.test(s)) return false
  if (/^[MZL\d\s.,()-]+$/.test(s) && s.length > 20) return false
  if (/\b(item|cat|f|i|idx|key) in |\.value|row\[0\]|count\+\+/.test(s)) return false
  if (/flex |rounded-|border-|text-|bg-|px-|py-|gap-|mt-|mb-|ring-|shrink-|overflow-|w-\d|h-\d/.test(s)) return false
  if (/transition-|hover:|focus:|group-|absolute|relative/.test(s)) return false
  if (s.startsWith('components/') || s.startsWith('@/')) return false
  const words = s.split(/\s+/).filter(Boolean)
  return words.length >= 2 && words.length <= 20
}
const onlyInVueFiltered = onlyInVue.filter(looksLikeCopy)

const comingSoonInVue = [...vueStrings].filter((s) => /coming\s+soon/i.test(s))
const comingSoonInReact = [...reactStrings].filter((s) => /coming\s+soon/i.test(s))

const report = {
  meta: { reactFiles: reactFiles.length, vueFiles: vueFiles.length, reactStrings: reactStrings.size, vueStrings: vueStrings.size },
  comingSoon: { inReact: comingSoonInReact, inVue: comingSoonInVue },
  inventedInVue,
  onlyInVueCandidates: onlyInVueFiltered,
  onlyInVueCandidatesCount: onlyInVueFiltered.length,
  diffCount: inventedInVue.length,
}

const outPath = path.join(root, 'vue/audit-copy.json')
fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8')
console.log('audit-copy: wrote', outPath)
console.log('inventedInVue count:', report.diffCount)
if (report.diffCount > 0) console.log('inventedInVue:', report.inventedInVue)
process.exit(report.diffCount > 0 ? 1 : 0)
