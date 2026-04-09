import mixpanel from 'mixpanel-browser'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useLocation } from 'react-router-dom'

export const trackGaEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({ category, action, label })
}

export const trackMixpanelEvent = (action: string, category?: string, label?: string) => {
  mixpanel.track(action, {
    category,
    label,
  })
}

export const useAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname })
  }, [location.pathname])
}
