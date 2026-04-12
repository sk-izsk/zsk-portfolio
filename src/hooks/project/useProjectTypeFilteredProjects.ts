import { useProjects } from '@stores/portfolioStore'
import { useMemo } from 'react'
import { useSelectedProjectType } from './useSelectedProjectType'

export const useProjectTypeFilteredProjects = () => {
  const projectsData = useProjects()
  const projects = useMemo(
    () =>
      (projectsData ?? []).map((project) => {
        const projectHref = project.url || '#'
        return {
          ...project,
          projectHref,
          isExternal: projectHref.startsWith('http'),
          demoLink: project.demo_link ?? '',
        }
      }),
    [projectsData],
  )
  const [selectedProjectType] = useSelectedProjectType()

  return useMemo(() => {
    if (selectedProjectType === 'all') {
      return projects
    }

    return projects.filter((project) => project.projectTypes.includes(selectedProjectType))
  }, [projects, selectedProjectType])
}
