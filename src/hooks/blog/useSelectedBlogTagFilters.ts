import { useHandleParams } from '@hooks/useHandleParams'
import { normalizeTagSlugs } from '@utils/tagFilters'

export const useSelectedBlogTagFilters = (): [string[], (values: string[]) => void] => {
  const { currentParams, updateParams, clearParams } = useHandleParams<{
    blogTags: string
  }>()

  const selectedTags = normalizeTagSlugs((currentParams.blogTags || '').split(','))

  const setSelectedTags = (values: string[]) => {
    const normalizedValues = normalizeTagSlugs(values)

    if (normalizedValues.length === 0) {
      clearParams(['blogTags'])
      return
    }

    updateParams({ blogTags: normalizedValues.join(',') })
  }

  return [selectedTags, setSelectedTags]
}
