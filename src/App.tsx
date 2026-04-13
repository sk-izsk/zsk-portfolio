import { AppWrapper } from '@components/AppWrapper'
import { AppRoutes } from '@routes/AppRoutes'
import { initAnalytics } from '@utils/analytics'
import { useEffect } from 'react'

type IdleScheduler = {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  cancelIdleCallback?: (handle: number) => void
}

const App = () => {
  useEffect(() => {
    const run = () => {
      void initAnalytics(
        import.meta.env.VITE_GA_MEASUREMENT_ID,
        import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN,
        import.meta.env.DEV,
      )
    }

    const scheduler = globalThis as typeof globalThis & IdleScheduler
    const requestIdle = scheduler.requestIdleCallback?.bind(scheduler)
    const cancelIdle = scheduler.cancelIdleCallback?.bind(scheduler)

    if (requestIdle) {
      const idleId = requestIdle(run, { timeout: 1500 })
      return () => cancelIdle?.(idleId)
    }

    const timeoutId = globalThis.setTimeout(run, 0)
    return () => globalThis.clearTimeout(timeoutId)
  }, [])

  return (
    <AppWrapper>
      <AppRoutes />
    </AppWrapper>
  )
}

export default App
