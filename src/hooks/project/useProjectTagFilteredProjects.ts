import { useMemo } from 'react'
import {
  useProjectTypeFilteredProjects,
  type FilterProjectType,
} from './useProjectTypeFilteredProjects'
import { normalizeProjectTag } from './useSelectedProjectTagFilters'

export const useProjectTagFilteredProjects = (selectedTags: string[]): FilterProjectType[] => {
  const typeFilteredProjects = useProjectTypeFilteredProjects()

  return useMemo(() => {
    if (selectedTags.length === 0) {
      return typeFilteredProjects
    }

    return typeFilteredProjects.filter((project) =>
      selectedTags.some((selectedTag) =>
        project.tags.some((tag) => normalizeProjectTag(tag) === selectedTag),
      ),
    )
  }, [typeFilteredProjects, selectedTags])
}
