import mixpanel from 'mixpanel-browser'
import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import ReactGA from 'react-ga4'

import { LocalizeProvider } from 'zsk-react-i18n'
import type { AppLanguage } from '../localization'
import { localizeConfig, useTranslation } from '../localization/localize'
import { usePortfolioStore } from '../stores/portfolioStore'
import { useSidebarStore } from '../stores/sidebarStore'
import '../styles/global.css'
import type { PortfolioData } from '../types/portfolio'
import { Sidebar } from './sidebar/Sidebar'
import { StyleSwitcher } from './styleSwitcher/StyleSwitcher'

const ThemeAnimatedCursor = dynamic(
  () => import('./common/ThemeAnimatedCursor').then((module) => module.ThemeAnimatedCursor),
  { ssr: false },
)

const Canedly = dynamic(() => import('./Canedly').then((module) => module.Canedly), {
  ssr: false,
})

interface AppLayoutProps extends PropsWithChildren {
  initialPortfolioDataByLanguage?: Record<AppLanguage, PortfolioData>
}

const AppLayout = ({ children, initialPortfolioDataByLanguage }: AppLayoutProps) => {
  const { i18n } = useTranslation()
  const isSidebarOpen = useSidebarStore((state) => state.isOpen)
  const currentLanguage = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'
  const { setData, setLoading, setError } = usePortfolioStore()
  const defaultData = useMemo(
    () => initialPortfolioDataByLanguage?.en ?? initialPortfolioDataByLanguage?.fr,
    [initialPortfolioDataByLanguage],
  )

  useEffect(() => {
    if (!initialPortfolioDataByLanguage) {
      return
    }

    const data = initialPortfolioDataByLanguage[currentLanguage] ?? defaultData
    if (!data) {
      return
    }

    setData(data)
    setLoading(false)
    setError(null)
  }, [currentLanguage, defaultData, initialPortfolioDataByLanguage, setData, setError, setLoading])

  return (
    <div className="main-container">
      <ThemeAnimatedCursor />
      <Sidebar />

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>{children}</div>

      <StyleSwitcher />
      <Canedly />
    </div>
  )
}

interface AppWrapperProps extends PropsWithChildren {
  initialPortfolioDataByLanguage?: Record<AppLanguage, PortfolioData>
}

export const AppWrapper = ({ children, initialPortfolioDataByLanguage }: AppWrapperProps) => {
  const hasInitializedAnalyticsRef = useRef(false)

  useEffect(() => {
    if (hasInitializedAnalyticsRef.current) {
      return
    }

    hasInitializedAnalyticsRef.current = true

    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (gaMeasurementId) {
      ReactGA.initialize(gaMeasurementId)
    }

    const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN
    if (mixpanelToken) {
      mixpanel.init(mixpanelToken, {
        debug: process.env.NODE_ENV !== 'production',
        track_pageview: false,
      })
    }
  }, [])

  return (
    <LocalizeProvider config={localizeConfig}>
      <AppLayout initialPortfolioDataByLanguage={initialPortfolioDataByLanguage}>
        {children}
      </AppLayout>
    </LocalizeProvider>
  )
}
