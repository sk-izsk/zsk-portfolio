import { usePersonalInfo, usePortfolioLoading } from '@stores/portfolioStore'

// The first name, capitalized, with a fallback while the portfolio data loads.
export const useLogoName = () => {
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const firstName = (loading ? undefined : personalInfo?.name.split(' ')[1]) ?? 'Zeeshan'

  return `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`
}
