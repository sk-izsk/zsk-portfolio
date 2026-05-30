import type { QuoteItem } from '@utils/githubHighlights'
import { useRandomDeveloperQuote } from '@hooks/useRandomDeveloperQuote'
import * as api from '@services/api'
import { createTestQueryClient } from '@tests/helpers/AllProviders'
import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('useRandomDeveloperQuote', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('fetches one remote quote through React Query', async () => {
    const quote: QuoteItem = {
      text: 'Talk is cheap. Show me the code.',
      author: 'Linus Torvalds',
    }

    vi.spyOn(api, 'quoteApi').mockResolvedValueOnce(quote)

    const queryClient = createTestQueryClient()
    const wrapper = ({ children }: React.PropsWithChildren) =>
      React.createElement(QueryClientProvider, { client: queryClient }, children)

    const { result } = renderHook(() => useRandomDeveloperQuote(), { wrapper })

    await waitFor(() => {
      expect(api.quoteApi).toHaveBeenCalledTimes(1)
      expect(result.current.data).toEqual(quote)
    })
  })
})
