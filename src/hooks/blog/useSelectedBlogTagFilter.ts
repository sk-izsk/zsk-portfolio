import { useHandleParams } from '@hooks/useHandleParams'

export const useSelectedBlogTagFilter = (): [string, (value: string) => void] => {
  const { currentParams, updateParams, clearParams } = useHandleParams<{
    blogTag: string
  }>()

  const selectedTag = currentParams.blogTag || 'all'

  const setSelectedTag = (value: string) => {
    if (value === 'all') {
      clearParams(['blogTag'])
      return
    }

    updateParams({ blogTag: value })
  }

  return [selectedTag, setSelectedTag]
}
