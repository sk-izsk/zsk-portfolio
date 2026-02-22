import ky from "ky"
import type { PortfolioData } from "../types/portfolio"

/**
 * Simple API client for portfolio data
 */
export const portfolioApi = {
  getPortfolioData: async (): Promise<PortfolioData> => {
    return await ky.get("portfolio-data.json").json<PortfolioData>()
  },
}

// Query key for React Query
export const queryKeys = {
  portfolioData: () => ["portfolio-data"] as const,
}
