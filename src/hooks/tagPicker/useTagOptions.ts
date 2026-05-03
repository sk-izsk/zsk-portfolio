import { useMemo } from 'react'
import type { TagPickerOption } from '@/types/tagPickerTypes'
import type { BlogPostSummary } from '@/services/hash-node/types'

interface UseTagOptionsProps {
  selectedTags: string[]
  posts: BlogPostSummary[]
}

export const useTagOptions = ({ selectedTags, posts }: UseTagOptionsProps) => {
  const tagOptions = useMemo<TagPickerOption[]>(() => {
    const tagMap = new Map<string, string>()

    for (const post of posts) {
      for (const tag of post.tags) {
        tagMap.set(tag.slug, tag.name)
      }
    }

    const options = Array.from(tagMap.entries())
      .sort((left, right) => left[1].localeCompare(right[1]))
      .map(([slug, name]) => ({
        value: slug,
        label: name,
      }))

    for (const selectedTag of selectedTags) {
      if (!options.some((option) => option.value === selectedTag)) {
        options.push({
          value: selectedTag,
          label: selectedTag,
        })
      }
    }

    return options
  }, [selectedTags, posts])

  return tagOptions
}
