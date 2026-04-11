import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LocalizeProvider } from 'zsk-react-i18n'
import { localizeConfig } from '@localization/localize'

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  })

interface WrapperProps extends PropsWithChildren {
  queryClient?: QueryClient
}

/**
 * Full providers wrapper: Router + React Query + i18n.
 * Use this for component/screen tests that need all providers.
 */
export const AllProviders: React.FC<WrapperProps> = ({ children, queryClient }) => {
  const client = queryClient ?? createTestQueryClient()

  return (
    <QueryClientProvider client={client}>
      <LocalizeProvider config={localizeConfig}>
        <BrowserRouter>{children}</BrowserRouter>
      </LocalizeProvider>
    </QueryClientProvider>
  )
}
