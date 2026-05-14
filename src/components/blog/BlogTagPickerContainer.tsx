import { useTagOptions } from '@/hooks/tagPicker/useTagOptions'
import type { BlogPost } from '@app-types/portfolio'
import React from 'react'
import { useTranslation } from '@localization/localize'
import { TagMultiSelectPicker } from '../tagPicker/TagMultiSelectPicker'
import { projectFilterBar, projectFilterControl } from '../projects/projects.css'

interface Props {
  selectedTags: string[]
  posts: BlogPost[]
  onSelectedTagsChange: (values: string[]) => void
}

export const BlogTagPickerContainer: React.FC<Props> = ({
  selectedTags,
  posts,
  onSelectedTagsChange,
}) => {
  const { t } = useTranslation()

  const tagOptions = useTagOptions({ selectedTags, items: posts })

  const showTagFilter = tagOptions.length > 0 || selectedTags.length > 0

  return (
    <div className={projectFilterBar}>
      {showTagFilter ? (
        <div className={projectFilterControl}>
          <TagMultiSelectPicker
            options={tagOptions}
            selectedValues={selectedTags}
            onChange={onSelectedTagsChange}
            maxVisibleTags={3}
            placeholder={t('blog.tagFilter.placeholder')}
            ariaLabel={t('blog.tagFilter.label')}
            emptyLabel={t('blog.tagFilter.empty')}
          />
        </div>
      ) : null}
    </div>
  )
}
