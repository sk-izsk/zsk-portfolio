import { useHandleParams } from '@hooks/useHandleParams'

export const blogSortValues = ['latest', 'oldest', 'title-asc'] as const

export type BlogSortValue = (typeof blogSortValues)[number]

export const useSelectedBlogSort = (): [BlogSortValue, (value: BlogSortValue) => void] => {
  const { currentParams, updateParams, clearParams } = useHandleParams<{
    blogSort: BlogSortValue
  }>()

  const selectedSort = blogSortValues.includes(currentParams.blogSort as BlogSortValue)
    ? (currentParams.blogSort as BlogSortValue)
    : 'latest'

  const setSelectedSort = (value: BlogSortValue) => {
    if (value === 'latest') {
      clearParams(['blogSort'])
      return
    }

    updateParams({ blogSort: value })
  }

  return [selectedSort, setSelectedSort]
}
