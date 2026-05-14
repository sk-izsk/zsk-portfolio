import type { TagPickerOption } from '@app-types/tagPickerTypes'

export const normalizeTagSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')

export const normalizeTagSlugs = (values: string[]) =>
  [...new Set(values.map(normalizeTagSlug).filter(Boolean))].sort((left, right) =>
    left.localeCompare(right),
  )

export const buildTagOptions = ({
  selectedTags,
  items,
}: {
  selectedTags: string[]
  items: Array<{ tags: string[] }>
}): TagPickerOption[] => {
  const tagMap = new Map<string, string>()

  for (const item of items) {
    for (const tag of item.tags) {
      if (tag) {
        tagMap.set(normalizeTagSlug(tag), tag)
      }
    }
  }

  const options = Array.from(tagMap.entries())
    .sort(([, left], [, right]) => left.localeCompare(right))
    .map(([value, label]) => ({ value, label }))

  for (const selectedTag of selectedTags) {
    if (!options.some((option) => option.value === selectedTag)) {
      options.push({
        value: selectedTag,
        label: selectedTag,
      })
    }
  }

  return options
}
