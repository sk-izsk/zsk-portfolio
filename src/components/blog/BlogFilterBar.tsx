import type { BlogPost } from '@app-types/portfolio'
import { SearchInput } from '@components/common/searchInput/SearchInput'
import { useTranslation } from '@localization/localize'
import React from 'react'
import { projectFilterBar, projectFilterControl } from '@components/projects/projects.css'
import { BlogTypeDropdown } from './BlogTypeDropdown'
import { BlogTagPickerContainer } from './BlogTagPickerContainer'

interface BlogFilterBarProps {
  posts: BlogPost[]
  selectedTags: string[]
  onSelectedTagsChange: (values: string[]) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

export const BlogFilterBar: React.FC<BlogFilterBarProps> = ({
  posts,
  selectedTags,
  onSelectedTagsChange,
  searchQuery,
  onSearchQueryChange,
}) => {
  const { t } = useTranslation()

  return (
    <div className={projectFilterBar}>
      <div className={projectFilterControl}>
        <SearchInput
          value={searchQuery}
          onChange={onSearchQueryChange}
          placeholder={t('blog.search.placeholder')}
          ariaLabel={t('blog.search.label')}
        />
      </div>
      <BlogTagPickerContainer
        selectedTags={selectedTags}
        posts={posts}
        onSelectedTagsChange={onSelectedTagsChange}
      />
      <div className={projectFilterControl}>
        <BlogTypeDropdown />
      </div>
    </div>
  )
}
