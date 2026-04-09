import mixpanel from 'mixpanel-browser'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { AppWrapper } from './components/AppWrapper'
import { AppRoutes } from './routes/AppRoutes'

const App = () => {
  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID)
    if (import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN) {
      mixpanel.init(import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN, {
        debug: import.meta.env.DEV,
        track_pageview: false,
      })
    }
  }, [])
  return (
    <AppWrapper>
      <AppRoutes />
    </AppWrapper>
  )
}

export default App
