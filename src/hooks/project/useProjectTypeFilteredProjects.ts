import type { Project } from '@app-types/portfolio'
import { useProjects } from '@stores/portfolioStore'
import { useMemo } from 'react'
import { useSelectedProjectType } from './useSelectedProjectType'

export type FilterProjectType = Project & {
  projectHref: string
  isExternal: boolean
  demoLink: string
}

export const useProjectTypeFilteredProjects = (): FilterProjectType[] => {
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

  const sortedProjects = useMemo(
    () =>
      [...projects].sort((a, b) => {
        const aIsAiSkill = a.projectTypes.includes('ai-skill')
        const bIsAiSkill = b.projectTypes.includes('ai-skill')

        if (aIsAiSkill !== bIsAiSkill) {
          return aIsAiSkill ? -1 : 1
        }

        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      }),
    [projects],
  )

  return useMemo(() => {
    if (selectedProjectType === 'all') {
      return sortedProjects
    }

    return sortedProjects.filter((project) => project.projectTypes.includes(selectedProjectType))
  }, [sortedProjects, selectedProjectType])
}
