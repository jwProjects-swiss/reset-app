// Baut aus dist-single/index.html eine einzelne Vorschau-Datei (preview/reset.html).
// Aufruf: npm run build:single && node scripts/make-preview.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync('dist-single/index.html', 'utf8')
const styles = [...html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)].map((m) => m[0]).join('\n')
const scripts = [...html.matchAll(/<script[^>]*>[\s\S]*?<\/script>/g)].map((m) => m[0]).join('\n')

mkdirSync('preview', { recursive: true })
writeFileSync(
  'preview/reset.html',
  `<title>RESET</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${styles}\n<div id="root"></div>\n${scripts}\n`,
)
