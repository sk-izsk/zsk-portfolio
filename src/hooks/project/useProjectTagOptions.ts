import type { Project } from '@app-types/portfolio'
import type { TagPickerOption } from '@app-types/tagPickerTypes'
import { useMemo } from 'react'
import { normalizeProjectTag } from './useSelectedProjectTagFilters'

interface UseProjectTagOptionsProps {
  selectedTags: string[]
  projects: Project[]
}

export const useProjectTagOptions = ({ selectedTags, projects }: UseProjectTagOptionsProps) => {
  return useMemo<TagPickerOption[]>(() => {
    const tagMap = new Map<string, string>()

    for (const project of projects) {
      for (const tag of project.tags) {
        if (tag) {
          tagMap.set(normalizeProjectTag(tag), tag)
        }
      }
    }

    const options = Array.from(tagMap.entries())
      .sort(([, a], [, b]) => a.localeCompare(b))
      .map(([slug, label]) => ({ value: slug, label }))

    for (const selectedTag of selectedTags) {
      if (!options.some((opt) => opt.value === selectedTag)) {
        options.push({ value: selectedTag, label: selectedTag })
      }
    }

    return options
  }, [selectedTags, projects])
}
