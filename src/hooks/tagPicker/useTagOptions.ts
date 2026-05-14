import { useMemo } from 'react'
import type { TagPickerOption } from '@/types/tagPickerTypes'
import { buildTagOptions } from '@utils/tagFilters'

interface UseTagOptionsProps {
  selectedTags: string[]
  items: Array<{ tags: string[] }>
}

export const useTagOptions = ({ selectedTags, items }: UseTagOptionsProps) => {
  const tagOptions = useMemo<TagPickerOption[]>(() => {
    return buildTagOptions({ selectedTags, items })
  }, [items, selectedTags])

  return tagOptions
}
