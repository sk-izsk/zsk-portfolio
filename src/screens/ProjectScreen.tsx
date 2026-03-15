import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
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
  const { t } = useTranslation()

  const projectViewModels = useMemo(
    () =>
      (projects ?? []).map((project) => {
        const projectHref = project.url || "#"

        return {
          ...project,
          projectHref,
          isExternal: projectHref.startsWith("http"),
        }
      }),
    [projects],
  )

  return (
    <Screen
      sectionId="projects"
      sectionClassName="projects"
      isLoading={loading}
      isError={Boolean(error || !projects)}
      title={t("projects.title")}
    >
      {projects && (
        <>
          <div className="row">
            <div className={`${projectHeading} padd-15`}>
              <h2 className={projectHeadingTitle}>{t("projects.heading")}</h2>
            </div>
          </div>
          <div className={`${projectGrid} padd-15`}>
            {projectViewModels.map((project) => {
              return (
                <ProjectCard key={project.id}>
                  <ProjectCard.TimeLink
                    category={project.category}
                    publishDate={project.publishDate}
                    href={project.projectHref}
                    isExternal={project.isExternal}
                  />
                  <ProjectCard.Title
                    href={project.projectHref}
                    isExternal={project.isExternal}
                  >
                    {project.title}
                  </ProjectCard.Title>
                  <ProjectCard.Body>{project.excerpt}</ProjectCard.Body>
                  <ProjectCard.Tags
                    projectId={project.id}
                    tags={project.tags}
                  />
                  <ProjectCard.ReadMore
                    href={project.projectHref}
                    isExternal={project.isExternal}
                  />
                </ProjectCard>
              )
            })}
          </div>
        </>
      )}
    </Screen>
  )
}

export default ProjectScreen
