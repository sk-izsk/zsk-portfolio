import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router'

import { ErrorBoundary } from '@components/errorBoundary/ErrorBoundary'
import { Sidebar } from '@components/sidebar/Sidebar'
import { StyleSwitcher } from '@components/styleSwitcher/StyleSwitcher'
import { useKeyboardShortcuts } from '@hooks/useKeyboardShortcuts'
import { usePortfolioData } from '@hooks/usePortfolioData'
import { useSoundClick } from '@hooks/useSoundClick'
import { localizeConfig, useTranslation } from '@localization/localize'
import { usePortfolioStore } from '@stores/portfolioStore'
import { useSidebarStore } from '@stores/sidebarStore'
import { useThemeStore } from '@stores/themeStore'
import { cx } from '@utils/cn'
import { applyThemeClassToBody } from '@utils/themeClass'
import { LocalizeProvider } from 'zsk-react-i18n'
import '../styles/global.css'

const LazyCanedly = lazy(() =>
  import('@components/canedly/Canedly').then((module) => ({ default: module.Canedly })),
)
const LazyThemeAnimatedCursor = lazy(() =>
  import('@components/common/ThemeAnimatedCursor').then((module) => ({
    default: module.ThemeAnimatedCursor,
  })),
)

type IdleScheduler = {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  cancelIdleCallback?: (handle: number) => void
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

const AppLayout = ({ children }: PropsWithChildren) => {
  const { i18n } = useTranslation()
  const isSidebarOpen = useSidebarStore((state) => state.isOpen)
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const currentColor = useThemeStore((state) => state.currentColor)
  const [showEnhancements, setShowEnhancements] = useState(false)

  const portfolioQuery = usePortfolioData(i18n.resolvedLanguage === 'fr' ? 'fr' : 'en')
  const { setData, setLoading, setError } = usePortfolioStore()

  useKeyboardShortcuts()
  useSoundClick()

  useLayoutEffect(() => {
    applyThemeClassToBody(isDarkMode, currentColor)
  }, [currentColor, isDarkMode])

  useEffect(() => {
    setLoading(portfolioQuery.isLoading)

    if (portfolioQuery.data) {
      setData(portfolioQuery.data)
    }

    if (portfolioQuery.error) {
      setError(portfolioQuery.error.message)
    }
  }, [
    portfolioQuery.isLoading,
    portfolioQuery.data,
    portfolioQuery.error,
    setData,
    setLoading,
    setError,
  ])

  useEffect(() => {
    const show = () => setShowEnhancements(true)
    const scheduler = globalThis as typeof globalThis & IdleScheduler
    const requestIdle = scheduler.requestIdleCallback?.bind(scheduler)
    const cancelIdle = scheduler.cancelIdleCallback?.bind(scheduler)

    if (document.readyState === 'complete') {
      if (requestIdle) {
        const idleId = requestIdle(show, { timeout: 1200 })
        return () => cancelIdle?.(idleId)
      }

      const timeoutId = globalThis.setTimeout(show, 0)
      return () => globalThis.clearTimeout(timeoutId)
    }

    const onLoad = () => {
      if (requestIdle) {
        requestIdle(show, { timeout: 1200 })
        return
      }

      globalThis.setTimeout(show, 0)
    }

    window.addEventListener('load', onLoad, { once: true })

    return () => {
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <div className="main-container">
      {showEnhancements ? (
        <Suspense fallback={null}>
          <LazyThemeAnimatedCursor />
        </Suspense>
      ) : null}
      <Sidebar />

      <div className={cx('main-content', isSidebarOpen && 'sidebar-mobile-open')}>{children}</div>

      {showEnhancements ? <StyleSwitcher /> : null}
      {showEnhancements ? (
        <Suspense fallback={null}>
          <LazyCanedly />
        </Suspense>
      ) : null}
    </div>
  )
}

export const AppWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LocalizeProvider config={localizeConfig}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <AppLayout>{children}</AppLayout>
            </Router>
          </QueryClientProvider>
        </LocalizeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
