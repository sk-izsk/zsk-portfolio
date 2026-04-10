import { PageSeo } from '../src/components/common/PageSeo'
import AboutScreen from '../src/screens/AboutScreen'
import { getPortfolioPageStaticProps } from '../src/services/portfolioStaticProps'

const AboutPage = () => {
  return (
    <>
      <PageSeo
        title="About"
        description="Learn more about Zeeshan, work background, education, and experience highlights."
        path="/about"
      />
      <AboutScreen />
    </>
  )
}

export const getStaticProps = getPortfolioPageStaticProps

export default AboutPage
