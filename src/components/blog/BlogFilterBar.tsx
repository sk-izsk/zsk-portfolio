import { TagMultiSelectPicker, type TagPickerOption } from '@components/tagPicker/TagMultiSelectPicker'
import type { BlogSortValue } from '@hooks/blog/useSelectedBlogSort'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from '@localization/localize'
import type { BlogPostSummary } from '@services/hash-node/types'
import { hashNodeApi } from '@services/hash-node/api'
import { hashNodeQueryKeys } from '@services/hash-node/queryKeys'
import React, { useMemo } from 'react'
import { blogFilterBar, blogFilterControl } from './blog.css'
import { BlogSortDropdown } from './BlogSortDropdown'

interface BlogFilterBarProps {
  posts: BlogPostSummary[]
  selectedTags: string[]
  onSelectedTagsChange: (values: string[]) => void
  selectedSort: BlogSortValue
  onSelectedSortChange: (value: BlogSortValue) => void
}

export const BlogFilterBar: React.FC<BlogFilterBarProps> = ({
  posts,
  selectedTags,
  onSelectedTagsChange,
  selectedSort,
  onSelectedSortChange,
}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

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
  }, [posts, selectedTags])

  const showTagFilter = tagOptions.length > 0 || selectedTags.length > 0

  return (
    <div className={blogFilterBar}>
      {showTagFilter ? (
        <div className={blogFilterControl}>
          <TagMultiSelectPicker
            options={tagOptions}
            selectedValues={selectedTags}
            onChange={onSelectedTagsChange}
            maxVisibleTags={3}
            placeholder={t('blog.filter.placeholder')}
            ariaLabel={t('blog.filter.label')}
            emptyLabel={t('blog.filter.empty')}
            loadingLabel={t('blog.filter.loading')}
            resolveOptionByQuery={async (query) => {
              const tag = await queryClient.fetchQuery({
                queryKey: hashNodeQueryKeys.tagBySlug(query),
                queryFn: () => hashNodeApi.getTagBySlug(query),
                staleTime: 1000 * 60 * 10,
                gcTime: 1000 * 60 * 15,
              })

              if (!tag) {
                return null
              }

              return {
                value: tag.slug,
                label: tag.name,
              }
            }}
          />
        </div>
      ) : null}
      <div className={blogFilterControl}>
        <BlogSortDropdown value={selectedSort} onChange={onSelectedSortChange} />
      </div>
    </div>
  )
}
