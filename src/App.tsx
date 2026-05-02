import { AppWrapper } from '@components/AppWrapper'
import { AppRoutes } from '@routes/AppRoutes'
import { scheduleAnalyticsBootstrap } from '@utils/analytics'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    return scheduleAnalyticsBootstrap(
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
