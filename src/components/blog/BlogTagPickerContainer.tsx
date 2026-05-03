import { useTagOptions } from '@/hooks/tagPicker/useTagOptions'
import { hashNodeApi } from '@/services/hash-node/api'
import { hashNodeQueryKeys } from '@/services/hash-node/queryKeys'
import type { BlogPostSummary } from '@/services/hash-node/types'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useAppTranslation } from 'zsk-react-i18n'
import { TagMultiSelectPicker } from '../tagPicker/TagMultiSelectPicker'
import { blogFilterBar, blogFilterControl } from './blog.css'

interface Props {
  selectedTags: string[]
  posts: BlogPostSummary[]
  onSelectedTagsChange: (values: string[]) => void
}

export const BlogTagPickerContainer: React.FC<Props> = ({
  selectedTags,
  posts,
  onSelectedTagsChange,
}) => {
  const { t } = useAppTranslation()
  const queryClient = useQueryClient()

  const tagOptions = useTagOptions({ selectedTags, posts })

  const showTagFilter = tagOptions.length > 0 || selectedTags.length > 0

  const handleResolveOptionByQuery = async (query: string) => {
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
  }
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
            resolveOptionByQuery={handleResolveOptionByQuery}
          />
        </div>
      ) : null}
    </div>
  )
}
