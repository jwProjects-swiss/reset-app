import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'

// "npm run build"          -> installierbare PWA in dist/
// "npm run build:single"   -> eine einzelne HTML-Datei in dist-single/ (zum Teilen als Vorschau)
export default defineConfig(({ mode }) => {
  const single = mode === 'single'

  return {
    // Relative Pfade, damit die App in jedem Unterordner läuft
    // (GitHub Pages, Cloudflare Pages, eigener Server).
    base: './',
    build: single ? { outDir: 'dist-single', assetsInlineLimit: 10_000_000 } : {},
    plugins: [
      react(),
      tailwindcss(),
      ...(single
        ? [viteSingleFile()]
        : [
            VitePWA({
              registerType: 'autoUpdate',
              includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
              workbox: { globPatterns: ['**/*.{js,css,html,svg,png,woff2}'] },
              manifest: {
                name: 'RESET',
                short_name: 'RESET',
                description:
                  'Ein Knopf für den Moment, in dem ein Drang kommt. Eine kleine Challenge lenkt deine Aufmerksamkeit um.',
                lang: 'de',
                start_url: '.',
                scope: '.',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#0d1120',
                theme_color: '#0d1120',
                icons: [
                  { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
                  { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
                  { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
                ],
              },
            }),
          ]),
    ],
  }
})
