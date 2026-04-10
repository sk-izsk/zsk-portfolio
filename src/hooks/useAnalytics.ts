import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'

export const trackGaEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({ category, action, label })
}

export const trackMixpanelEvent = (action: string, category?: string, label?: string) => {
  if (!process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN) {
    return
  }

  mixpanel.track(action, {
    category,
    label,
  })
}

export const useAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: router.asPath })
  }, [router.asPath])
}
