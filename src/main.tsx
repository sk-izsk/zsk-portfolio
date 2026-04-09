import mixpanel from 'mixpanel-browser'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import App from './App.tsx'

if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
  console.log('ga')
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID)
} else {
  console.warn('[Analytics] VITE_GA_MEASUREMENT_ID is not set — GA4 disabled')
}

if (import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN) {
  console.log('mixpanel')
  mixpanel.init(import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN, {
    debug: import.meta.env.DEV,
    track_pageview: false,
  })
} else {
  console.warn('[Analytics] VITE_MIXPANEL_PROJECT_TOKEN is not set — Mixpanel disabled')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
