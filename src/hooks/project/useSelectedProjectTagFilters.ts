import { useHandleParams } from '@hooks/useHandleParams'
import { normalizeTagSlug, normalizeTagSlugs } from '@utils/tagFilters'

export const normalizeProjectTag = normalizeTagSlug

export const useSelectedProjectTagFilters = (): [string[], (values: string[]) => void] => {
  const { currentParams, updateParams, clearParams } = useHandleParams<{
    projectTags: string
  }>()

  const selectedTags = normalizeTagSlugs((currentParams.projectTags || '').split(','))

  const setSelectedTags = (values: string[]) => {
    const normalized = normalizeTagSlugs(values)

    if (normalized.length === 0) {
      clearParams(['projectTags'])
      return
    }

    updateParams({ projectTags: normalized.join(',') })
  }

  return [selectedTags, setSelectedTags]
}
