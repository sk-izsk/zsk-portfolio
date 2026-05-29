import type { QuoteItem } from '@utils/githubHighlights'
import { useRandomDeveloperQuote } from '@hooks/useRandomDeveloperQuote'
import { queryKeys, quoteApi } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

const quoteCatalog: QuoteItem[] = [
  {
    text: 'Talk is cheap. Show me the code.',
    author: 'Linus Torvalds',
  },
  {
    text: 'Programs must be written for people to read.',
    author: 'Harold Abelson',
  },
]

describe('useRandomDeveloperQuote', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('configures React Query for the quote catalog and rotates quotes locally', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)

    vi.mocked(useQuery).mockReturnValue({
      data: quoteCatalog,
      isLoading: false,
      error: null,
    } as never)

    const { result } = renderHook(() => useRandomDeveloperQuote())

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: queryKeys.developerQuotes(),
      queryFn: quoteApi,
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    })
    expect(result.current.data).toEqual(quoteCatalog[0])

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    expect(result.current.data).toEqual(quoteCatalog[1])
  })
})
