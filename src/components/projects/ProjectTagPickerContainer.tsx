import type { Project } from '@app-types/portfolio'
import { useTagOptions } from '@hooks/tagPicker/useTagOptions'
import { useTranslation } from '@localization/localize'
import React from 'react'
import { TagMultiSelectPicker } from '../tagPicker/TagMultiSelectPicker'
import { projectFilterBar, projectFilterControl } from './projects.css'

interface Props {
  selectedTags: string[]
  projects: Project[]
  onSelectedTagsChange: (values: string[]) => void
}

export const ProjectTagPickerContainer: React.FC<Props> = ({
  selectedTags,
  projects,
  onSelectedTagsChange,
}) => {
  const { t } = useTranslation()
  const tagOptions = useTagOptions({ selectedTags, items: projects })

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
            placeholder={t('projects.tagFilter.placeholder')}
            ariaLabel={t('projects.tagFilter.label')}
            emptyLabel={t('projects.tagFilter.empty')}
          />
        </div>
      ) : null}
    </div>
  )
}
