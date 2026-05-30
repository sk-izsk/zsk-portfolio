import type { QuoteItem } from '@utils/githubHighlights'
import { queryKeys, quoteApi } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const QUOTE_ROTATE_INTERVAL_MS = 10000

export const useRandomDeveloperQuote = () => {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const quoteQuery = useQuery<QuoteItem[]>({
    queryKey: queryKeys.developerQuotes(),
    queryFn: quoteApi,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!quoteQuery.data?.length) {
      setQuoteIndex(0)
      return
    }

    const intervalId = window.setInterval(() => {
      setQuoteIndex((currentIndex) => (currentIndex + 1) % quoteQuery.data.length)
    }, QUOTE_ROTATE_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [quoteQuery.data])

  const currentQuote =
    quoteQuery.data && quoteQuery.data.length
      ? quoteQuery.data[quoteIndex % quoteQuery.data.length]
      : undefined

  return {
    ...quoteQuery,
    data: currentQuote,
  }
}
