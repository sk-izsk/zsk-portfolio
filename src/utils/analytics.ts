let reactGaPromise: Promise<typeof import('react-ga4').default> | null = null
let mixpanelPromise: Promise<typeof import('mixpanel-browser').default> | null = null

export const getReactGA = async () => {
  if (!reactGaPromise) {
    reactGaPromise = import('react-ga4').then((module) => module.default)
  }

  return reactGaPromise
}

const getMixpanel = async () => {
  if (!mixpanelPromise) {
    mixpanelPromise = import('mixpanel-browser').then((module) => module.default)
  }

  return mixpanelPromise
}

export const initAnalytics = async (
  gaMeasurementId: string | undefined,
  mixpanelProjectToken: string | undefined,
  isDev: boolean,
) => {
  if (gaMeasurementId) {
    const reactGa = await getReactGA()
    reactGa.initialize(gaMeasurementId)
  }

  if (mixpanelProjectToken) {
    const mixpanel = await getMixpanel()
    mixpanel.init(mixpanelProjectToken, {
      debug: isDev,
      track_pageview: false,
    })
  }
}

export const trackGaEvent = (category: string, action: string, label?: string) => {
  void getReactGA().then((reactGa) => {
    reactGa.event({ category, action, label })
  })
}

export const trackMixpanelEvent = (action: string, category?: string, label?: string) => {
  void getMixpanel().then((mixpanel) => {
    mixpanel.track(action, {
      category,
      label,
    })
  })
}
