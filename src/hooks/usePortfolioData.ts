import type { AppLanguage } from '@localization/index'
import { portfolioApi, queryKeys } from '@services/api'
import { useQuery } from '@tanstack/react-query'

export const usePortfolioData = (language: AppLanguage) => {
  const query = useQuery({
    queryKey: queryKeys.portfolioData(language),
    queryFn: () => portfolioApi.getPortfolioData(language),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  })

  return query
}
