import { useHandleParams } from '@hooks/useHandleParams'

export const normalizeProjectTag = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, '-')

const normalizeTags = (values: string[]) =>
  [...new Set(values.map(normalizeProjectTag).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  )

export const useSelectedProjectTagFilters = (): [string[], (values: string[]) => void] => {
  const { currentParams, updateParams, clearParams } = useHandleParams<{
    projectTags: string
  }>()

  const selectedTags = normalizeTags((currentParams.projectTags || '').split(','))

  const setSelectedTags = (values: string[]) => {
    const normalized = normalizeTags(values)

    if (normalized.length === 0) {
      clearParams(['projectTags'])
      return
    }

    updateParams({ projectTags: normalized.join(',') })
  }

  return [selectedTags, setSelectedTags]
}
