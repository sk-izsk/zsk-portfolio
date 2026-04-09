import mixpanel from 'mixpanel-browser'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import App from './App.tsx'

ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID)
if (import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN) {
  mixpanel.init(import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN, {
    debug: import.meta.env.DEV,
    track_pageview: false,
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
