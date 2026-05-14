import type { BlogFilterType } from '@app-types/portfolio'
import { useHandleParams } from '@hooks/useHandleParams'

export const blogFilterValues = [
  'all',
  'frontend',
  'backend',
  'architecture',
  'state-management',
] as const satisfies readonly BlogFilterType[]

export const useSelectedBlogType = (): [BlogFilterType, (value: BlogFilterType) => void] => {
  const { currentParams, updateParams, clearParams } = useHandleParams<{
    blogType: BlogFilterType
  }>()

  const selectedBlogType: BlogFilterType = blogFilterValues.includes(
    currentParams.blogType as BlogFilterType,
  )
    ? (currentParams.blogType as BlogFilterType)
    : 'all'

  const setSelectedBlogType = (value: BlogFilterType) => {
    if (value === 'all') {
      clearParams(['blogType'])
      return
    }

    updateParams({ blogType: value })
  }

  return [selectedBlogType, setSelectedBlogType]
}
