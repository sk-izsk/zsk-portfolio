import { useEffect } from 'react'
import { AppWrapper } from './components/AppWrapper'
import { AppRoutes } from './routes/AppRoutes'
import { initAnalytics } from './utils/analytics'

const App = () => {
  useEffect(() => {
    void initAnalytics(
      import.meta.env.VITE_GA_MEASUREMENT_ID,
      import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN,
      import.meta.env.DEV,
    )
  }, [])
  return (
    <AppWrapper>
      <AppRoutes />
    </AppWrapper>
  )
}

export default App
