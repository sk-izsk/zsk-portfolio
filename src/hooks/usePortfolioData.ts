import { useQuery } from "@tanstack/react-query"
import { portfolioApi, queryKeys } from "../services/api"

/**
 * Custom hook to fetch and manage portfolio data using React Query
 * @returns Object containing loading state, data, and error
 */
export const usePortfolioData = () => {
  const query = useQuery({
    queryKey: queryKeys.portfolioData(),
    queryFn: portfolioApi.getPortfolioData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })

  return query
}
