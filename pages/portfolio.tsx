import { PageSeo } from '../src/components/common/PageSeo'
import SkillScreen from '../src/screens/SkillScreen'
import { getPortfolioPageStaticProps } from '../src/services/portfolioStaticProps'

const PortfolioPage = () => {
  return (
    <>
      <PageSeo
        title="Skills"
        description="Browse technical skills, toolset, and capability breakdown across frontend, backend, and testing."
        path="/portfolio"
      />
      <SkillScreen />
    </>
  )
}

export const getStaticProps = getPortfolioPageStaticProps

export default PortfolioPage
