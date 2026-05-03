let reactGaPromise: Promise<typeof import('react-ga4').default> | null = null
let mixpanelPromise: Promise<typeof import('mixpanel-browser').default> | null = null
let analyticsInitPromise: Promise<void> | null = null
let analyticsConfig: {
  gaMeasurementId: string | undefined
  mixpanelProjectToken: string | undefined
  isDev: boolean
} | null = null

type IdleScheduler = {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  cancelIdleCallback?: (handle: number) => void
}

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
  analyticsConfig = {
    gaMeasurementId,
    mixpanelProjectToken,
    isDev,
  }

  if (analyticsInitPromise) {
    await analyticsInitPromise
    return
  }

  analyticsInitPromise = (async () => {
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
  })()

  await analyticsInitPromise
}

const ensureAnalyticsReady = async () => {
  if (!analyticsConfig) {
    return
  }

  if (!analyticsInitPromise) {
    analyticsInitPromise = initAnalytics(
      analyticsConfig.gaMeasurementId,
      analyticsConfig.mixpanelProjectToken,
      analyticsConfig.isDev,
    )
  }

  await analyticsInitPromise
}

export const scheduleAnalyticsBootstrap = (
  gaMeasurementId: string | undefined,
  mixpanelProjectToken: string | undefined,
  isDev: boolean,
) => {
  analyticsConfig = {
    gaMeasurementId,
    mixpanelProjectToken,
    isDev,
  }

  const run = () => {
    void ensureAnalyticsReady()
  }

  const scheduler = globalThis as typeof globalThis & IdleScheduler
  const requestIdle = scheduler.requestIdleCallback?.bind(scheduler)
  const cancelIdle = scheduler.cancelIdleCallback?.bind(scheduler)
  const interactionEvents = ['pointerdown', 'keydown', 'touchstart'] as const
  let idleId: number | undefined

  const cleanup = () => {
    if (idleId !== undefined) {
      cancelIdle?.(idleId)
    }

    for (const eventName of interactionEvents) {
      window.removeEventListener(eventName, handleInteract)
    }
  }

  const handleInteract = () => {
    cleanup()
    run()
  }

  for (const eventName of interactionEvents) {
    window.addEventListener(eventName, handleInteract, {
      once: true,
      passive: true,
    })
  }

  if (requestIdle) {
    idleId = requestIdle(
      () => {
        cleanup()
        run()
      },
      { timeout: 2000 },
    )

    return cleanup
  }

  const timeoutId = window.setTimeout(() => {
    cleanup()
    run()
  }, 1500)

  return () => {
    cleanup()
    window.clearTimeout(timeoutId)
  }
}

export const trackGaEvent = (category: string, action: string, label?: string) => {
  if (!analyticsConfig?.gaMeasurementId) {
    return
  }

  void ensureAnalyticsReady().then(() =>
    getReactGA().then((reactGa) => {
      reactGa.event({ category, action, label })
    }),
  )
}

export const trackMixpanelEvent = (action: string, category?: string, label?: string) => {
  if (!analyticsConfig?.mixpanelProjectToken) {
    return
  }

  void ensureAnalyticsReady().then(() =>
    getMixpanel().then((mixpanel) => {
      mixpanel.track(action, {
        category,
        label,
      })
    }),
  )
}
