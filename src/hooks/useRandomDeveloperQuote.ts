import type { QuoteItem } from '@utils/githubHighlights'
import { queryKeys, quoteApi } from '@services/api'
import { useQuery } from '@tanstack/react-query'

const QUOTE_ROTATE_INTERVAL_MS = 10000

export const useRandomDeveloperQuote = () =>
  useQuery<QuoteItem>({
    queryKey: queryKeys.developerQuotes(),
    queryFn: quoteApi,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchInterval: QUOTE_ROTATE_INTERVAL_MS,
    refetchOnWindowFocus: false,
  })
