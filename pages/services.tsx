import { PageSeo } from '../src/components/common/PageSeo'
import ServiceScreen from '../src/screens/ServiceScreen'
import { getPortfolioPageStaticProps } from '../src/services/portfolioStaticProps'

const ServicesPage = () => {
  return (
    <>
      <PageSeo
        title="Services"
        description="Explore development services, expertise areas, and practical delivery strengths."
        path="/services"
      />
      <ServiceScreen />
    </>
  )
}

export const getStaticProps = getPortfolioPageStaticProps

export default ServicesPage
