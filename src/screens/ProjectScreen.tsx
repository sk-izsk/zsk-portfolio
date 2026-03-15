import React from "react"
import { ProjectCard } from "../components/projects/ProjectCard"
import {
  projectGrid,
  projectHeading,
  projectHeadingTitle,
} from "../components/projects/projects.css"
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

  return (
    <Screen
      sectionId="projects"
      sectionClassName="projects"
      isLoading={loading}
      isError={Boolean(error || !projects)}
      title="Projects"
    >
      {projects && (
        <>
          <div className="row">
            <div className={`${projectHeading} padd-15`}>
              <h2 className={projectHeadingTitle}>My Recent Projects :</h2>
            </div>
          </div>
          <div className={`${projectGrid} padd-15`}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </Screen>
  )
}

export default ProjectScreen
