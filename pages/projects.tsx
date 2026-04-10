import { PageSeo } from '../src/components/common/PageSeo'
import ProjectScreen from '../src/screens/ProjectScreen'
import { getPortfolioPageStaticProps } from '../src/services/portfolioStaticProps'

const ProjectsPage = () => {
  return (
    <>
      <PageSeo
        title="Projects"
        description="View selected projects with summaries, highlights, technologies, and links."
        path="/projects"
      />
      <ProjectScreen />
    </>
  )
}

export const getStaticProps = getPortfolioPageStaticProps

export default ProjectsPage
