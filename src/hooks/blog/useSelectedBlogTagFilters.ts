import { useHandleParams } from '@hooks/useHandleParams'

const normalizeTagSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')

const normalizeTagSlugs = (values: string[]) =>
  [...new Set(values.map(normalizeTagSlug).filter(Boolean))].sort((left, right) =>
    left.localeCompare(right),
  )

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
