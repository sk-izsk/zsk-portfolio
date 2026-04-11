import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'

import { LocalizeProvider } from 'zsk-react-i18n'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { useSoundClick } from '../hooks/useSoundClick'
import { localizeConfig, useTranslation } from '../localization/localize'
import { usePortfolioStore } from '../stores/portfolioStore'
import { useSidebarStore } from '../stores/sidebarStore'
import '../styles/global.css'
import { Canedly } from './canedly/Canedly'
import { ThemeAnimatedCursor } from './common/ThemeAnimatedCursor'
import { ErrorBoundary } from './errorBoundary/ErrorBoundary'
import { Sidebar } from './sidebar/Sidebar'
import { StyleSwitcher } from './styleSwitcher/StyleSwitcher'

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
  const currentLanguage = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'

  const portfolioQuery = usePortfolioData(currentLanguage)
  const { setData, setLoading, setError } = usePortfolioStore()

  useKeyboardShortcuts()
  useSoundClick()

  useEffect(() => {
    setLoading(portfolioQuery.isLoading)

    if (portfolioQuery.data) {
      setData(portfolioQuery.data)
    }

    if (portfolioQuery.error) {
      setError(portfolioQuery.error.message)
    }
  }, [
    currentLanguage,
    portfolioQuery.isLoading,
    portfolioQuery.data,
    portfolioQuery.error,
    setData,
    setLoading,
    setError,
  ])

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

export const AppWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LocalizeProvider config={localizeConfig}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <NuqsAdapter>
                <AppLayout>{children}</AppLayout>
              </NuqsAdapter>
            </Router>
          </QueryClientProvider>
        </LocalizeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
