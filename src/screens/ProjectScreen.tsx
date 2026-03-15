import { useTitle } from "ahooks"
import React from "react"
import { ProjectCard } from "../components/Projects/ProjectCard"
import {
  blogContainer,
  blogGrid,
  blogHeading,
  blogHeadingH2,
} from "../components/Projects/projects.css"
import { Screen } from "../components/Screen"
import {
  usePortfolioError,
  usePortfolioLoading,
  useProjects,
} from "../stores/portfolioStore"

const ProjectScreen: React.FC = () => {
  const projects = useProjects()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  useTitle("Projects - ZSK Portfolio")

  return (
    <section className="blog section active" id="projects">
      <div className={`container ${blogContainer}`}>
        <Screen
          isLoading={loading}
          isError={Boolean(error || !projects)}
          title="Projects"
        >
          {projects && (
            <>
              <div className="row">
                <div className={`${blogHeading} padd-15`}>
                  <h2 className={blogHeadingH2}>My Recent Projects :</h2>
                </div>
              </div>
              <div className={`${blogGrid} padd-15`}>
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          )}
        </Screen>
      </div>
    </section>
  )
}

export default ProjectScreen
