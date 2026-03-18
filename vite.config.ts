import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { exec } from 'node:child_process'
import { defineConfig, type ViteDevServer } from 'vite'
import type { UserConfig } from 'vitest/config'

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
  server: {
    port: 2222,
  },
  plugins: [react(), vanillaExtractPlugin(), openBrowserOnStart()],
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
  } satisfies UserConfig['test'],
})
