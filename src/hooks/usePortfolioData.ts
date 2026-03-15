import { useQuery } from "@tanstack/react-query"
import { portfolioApi, queryKeys } from "../services/api"

export const usePortfolioData = () => {
  const query = useQuery({
    queryKey: queryKeys.portfolioData(),
    queryFn: portfolioApi.getPortfolioData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  })

  return query
}
