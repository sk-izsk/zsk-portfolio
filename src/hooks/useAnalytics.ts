import { getReactGA, initAnalytics } from '@utils/analytics'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

export const useAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      return
    }

    void initAnalytics(
      import.meta.env.VITE_GA_MEASUREMENT_ID,
      import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN,
      import.meta.env.DEV,
    ).then(() =>
      getReactGA().then((reactGa) => {
        reactGa.send({ hitType: 'pageview', page: location.pathname })
      }),
    )
  }, [location.pathname])
}
