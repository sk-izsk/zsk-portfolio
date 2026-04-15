import App from '@/App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

const isLocalhost =
  globalThis.location.hostname === 'localhost' || globalThis.location.hostname === '127.0.0.1'

if (import.meta.env.PROD && !isLocalhost) {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      void updateSW(true)
    },
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
