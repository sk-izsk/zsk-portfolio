import type { AppProps } from 'next/app'
import { AppWrapper } from '../src/components/AppWrapper'
import type { AppLanguage } from '../src/localization'
import type { PortfolioData } from '../src/types/portfolio'

type AppPageProps = {
  portfolioDataByLanguage?: Record<AppLanguage, PortfolioData>
}

const PortfolioApp = ({ Component, pageProps }: AppProps<AppPageProps>) => {
  return (
    <AppWrapper initialPortfolioDataByLanguage={pageProps.portfolioDataByLanguage}>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default PortfolioApp
