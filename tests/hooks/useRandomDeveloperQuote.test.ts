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

  it('fetches one quote batch and exposes the first rotated quote', async () => {
    const quotes: QuoteItem[] = [
      {
        text: 'Talk is cheap. Show me the code.',
        author: 'Linus Torvalds',
      },
      {
        text: 'First, solve the problem. Then, write the code.',
        author: 'John Johnson',
      },
    ]

    vi.spyOn(api, 'quoteApi').mockResolvedValueOnce(quotes)

    const queryClient = createTestQueryClient()
    const wrapper = ({ children }: React.PropsWithChildren) =>
      React.createElement(QueryClientProvider, { client: queryClient }, children)

    const { result } = renderHook(() => useRandomDeveloperQuote(), { wrapper })

    await waitFor(() => {
      expect(api.quoteApi).toHaveBeenCalledTimes(1)
      expect(result.current.data).toEqual(quotes[0])
    })
  })
})
