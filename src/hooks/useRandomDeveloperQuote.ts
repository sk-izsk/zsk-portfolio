import type { QuoteItem } from '@utils/githubHighlights'
import { useEffect, useState } from 'react'
import { queryKeys, quoteApi } from '@services/api'
import { useQuery } from '@tanstack/react-query'

const QUOTE_ROTATE_INTERVAL_MS = 10000

const isSameQuote = (left: QuoteItem | undefined, right: QuoteItem | undefined) =>
  left?.text === right?.text && left?.author === right?.author

const getRandomQuote = (quotes: QuoteItem[], currentQuote?: QuoteItem) => {
  if (quotes.length <= 1) {
    return quotes[0]
  }

  const currentIndex = quotes.findIndex((quote) => isSameQuote(quote, currentQuote))

  if (currentIndex < 0) {
    return quotes[Math.floor(Math.random() * quotes.length)] ?? quotes[0]
  }

  const nextIndexSeed = Math.floor(Math.random() * (quotes.length - 1))
  const nextIndex = nextIndexSeed >= currentIndex ? nextIndexSeed + 1 : nextIndexSeed

  return quotes[nextIndex] ?? quotes[0]
}

export const useRandomDeveloperQuote = () => {
  const quotesQuery = useQuery({
    queryKey: queryKeys.developerQuotes(),
    queryFn: quoteApi,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  })
  const [currentQuote, setCurrentQuote] = useState<QuoteItem | undefined>(undefined)

  useEffect(() => {
    if (!quotesQuery.data?.length) {
      return
    }

    setCurrentQuote((current) => getRandomQuote(quotesQuery.data, current))

    const interval = window.setInterval(() => {
      setCurrentQuote((current) => getRandomQuote(quotesQuery.data, current))
    }, QUOTE_ROTATE_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [quotesQuery.data])

  return {
    ...quotesQuery,
    data: currentQuote,
  }
}
