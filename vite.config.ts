import babelPlugin from '@rolldown/plugin-babel'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { exec } from 'node:child_process'
import path from 'node:path'
import { getRandomQuoteBatch } from './server/random-quote.js'
import type { ViteDevServer } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'

const rootDir = import.meta.dirname

const openUrl = (url: string) => {
  const quotedUrl = JSON.stringify(url)

  if (process.platform === 'darwin') {
    exec(`open ${quotedUrl}`)
    return
  }

  if (process.platform === 'win32') {
    exec(`start "" ${quotedUrl}`)
    return
  }

  exec(`xdg-open ${quotedUrl}`)
}

const openBrowserOnStart = () => {
  let hasOpened = false

  return {
    name: 'open-browser-on-start',
    configureServer(server: ViteDevServer) {
      server.httpServer?.once('listening', () => {
        if (hasOpened) {
          return
        }

        hasOpened = true

        const url = process.env.PORTLESS_URL ?? server.resolvedUrls?.local[0]

        if (url) {
          openUrl(url)
        }
      })
    },
  }
}

const quoteApiDevRoute = () => ({
  name: 'quote-api-dev-route',
  configureServer(server: ViteDevServer) {
    server.middlewares.use('/api/quote', async (_request, response) => {
      try {
        const quotes = await getRandomQuoteBatch()

        response.statusCode = 200
        response.setHeader('Cache-Control', 'no-store')
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.end(JSON.stringify(quotes))
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown quote API error'

        response.statusCode = 502
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.end(JSON.stringify({ message }))
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(new Date().toISOString()),
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
      '@assets': path.resolve(rootDir, 'src/assets'),
      '@components': path.resolve(rootDir, 'src/components'),
      '@hooks': path.resolve(rootDir, 'src/hooks'),
      '@localization': path.resolve(rootDir, 'src/localization'),
      '@routes': path.resolve(rootDir, 'src/routes'),
      '@screens': path.resolve(rootDir, 'src/screens'),
      '@services': path.resolve(rootDir, 'src/services'),
      '@stores': path.resolve(rootDir, 'src/stores'),
      '@styles': path.resolve(rootDir, 'src/styles'),
      '@app-types': path.resolve(rootDir, 'src/types'),
      '@utils': path.resolve(rootDir, 'src/utils'),
      '@tests': path.resolve(rootDir, 'tests'),
    },
  },
  server: {
    port: 2222,
  },
  plugins: [
    react(),
    babelPlugin({ presets: [reactCompilerPreset()] }),
    vanillaExtractPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: {
        name: 'Portfolio',
        short_name: 'CV',
        description: 'Interactive Developer Portfolio',
        theme_color: '#151515',
        background_color: '#151515',
        display: 'standalone',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        // Do not serve SPA fallback for direct file navigations (e.g. /Zeeshan-Resume.pdf).
        navigateFallbackDenylist: [/\/[^/?]+\.[^/]+$/],
        runtimeCaching: [
          {
            // Keep portfolio JSON fresh for returning users while preserving offline fallback.
            urlPattern: /\/portfolio-data-(common|translations-(en|fr))\.json$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'portfolio-data-runtime-v1',
              networkTimeoutSeconds: 4,
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxEntries: 6,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
    quoteApiDevRoute(),
    openBrowserOnStart(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.css.ts', 'src/main.tsx', 'src/routes/lazyScreens.ts'],
    },
  },
})
