import ky from "ky"
import type { AppLanguage } from "../localization"
import type { PortfolioData } from "../types/portfolio"

/**
 * Simple API client for portfolio data
 */
export const portfolioApi = {
  getPortfolioData: async (language: AppLanguage): Promise<PortfolioData> => {
    const dataPath =
      language === "fr" ? "portfolio-data-fr.json" : "portfolio-data.json"

    return await ky.get(dataPath).json<PortfolioData>()
  },
}

// Query key for React Query
export const queryKeys = {
  portfolioData: (language: AppLanguage) =>
    ["portfolio-data", language] as const,
}
