import type { GetStaticProps } from 'next'
import type { PortfolioPageProps } from '../types/pageProps'
import { getPortfolioData } from './portfolio.server'

export const getPortfolioPageStaticProps: GetStaticProps<PortfolioPageProps> = async () => {
  const [portfolioDataEn, portfolioDataFr] = await Promise.all([
    getPortfolioData('en'),
    getPortfolioData('fr'),
  ])

  return {
    props: {
      portfolioDataByLanguage: {
        en: portfolioDataEn,
        fr: portfolioDataFr,
      },
    },
    revalidate: 60 * 60,
  }
}
