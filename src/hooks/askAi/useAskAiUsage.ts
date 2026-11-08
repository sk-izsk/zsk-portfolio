import { askAiUsageApi, queryKeys } from '@services/api'
import { useQuery } from '@tanstack/react-query'

// Fetched when the chat first opens, then read from the cache on later opens. Each chat reply writes
// its count into the same cache entry (see useAskAiChat), so it stays right between fetches.
export const useAskAiUsage = (enabled: boolean) =>
  useQuery({
    queryKey: queryKeys.askAiUsage(),
    queryFn: askAiUsageApi,
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  })
