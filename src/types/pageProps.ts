import type { AppLanguage } from '../localization'
import type { PortfolioData } from './portfolio'

export interface PortfolioPageProps {
  portfolioDataByLanguage: Record<AppLanguage, PortfolioData>
}
