import { PageSeo } from '../src/components/common/PageSeo'
import HomeScreen from '../src/screens/HomeScreen'
import { getPortfolioPageStaticProps } from '../src/services/portfolioStaticProps'

const HomePage = () => {
  return (
    <>
      <PageSeo
        title="Home"
        description="Portfolio homepage with profile overview, introduction, and quick access to projects and services."
        path="/"
      />
      <HomeScreen />
    </>
  )
}

export const getStaticProps = getPortfolioPageStaticProps

export default HomePage
