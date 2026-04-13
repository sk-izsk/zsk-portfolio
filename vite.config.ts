import babelPlugin from '@rolldown/plugin-babel'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { exec } from 'node:child_process'
import path from 'node:path'
import type { ViteDevServer } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'

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

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@localization': path.resolve(__dirname, 'src/localization'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@app-types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@tests': path.resolve(__dirname, 'tests'),
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
      },
    }),
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
