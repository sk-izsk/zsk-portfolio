import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { exec } from 'node:child_process'
import { defineConfig, type ViteDevServer } from 'vite'

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
})
