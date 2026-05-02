import type { DropdownOption } from '@components/common/dropdown/Dropdown'
import { useSelectedBlogSort } from '@hooks/blog/useSelectedBlogSort'
import { useSelectedBlogTagFilter } from '@hooks/blog/useSelectedBlogTagFilter'
import { useTranslation } from '@localization/localize'
import type { BlogPostSummary } from '@services/hash-node/types'
import React from 'react'
import { blogFilterBar, blogFilterControl } from './blog.css'
import { BlogSortDropdown } from './BlogSortDropdown'
import { BlogTagFilterDropdown } from './BlogTagFilterDropdown'

interface BlogFilterBarProps {
  posts: BlogPostSummary[]
}

export const BlogFilterBar: React.FC<BlogFilterBarProps> = ({ posts }) => {
  const [selectedTag, setSelectedTag] = useSelectedBlogTagFilter()
  const [selectedSort, setSelectedSort] = useSelectedBlogSort()
  const { t } = useTranslation()

  const tagMap = new Map<string, string>()

  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag.slug, tag.name)
    }
  }

  const tagOptions: DropdownOption<string>[] = [
    {
      value: 'all',
      label: t('blog.filter.options.all'),
    },
    ...Array.from(tagMap.entries())
      .sort((left, right) => left[1].localeCompare(right[1]))
      .map(([slug, name]) => ({
        value: slug,
        label: name,
      })),
  ]

  if (selectedTag !== 'all' && !tagOptions.some((option) => option.value === selectedTag)) {
    tagOptions.push({
      value: selectedTag,
      label: selectedTag,
    })
  }

  const showTagFilter = tagOptions.length > 1 || selectedTag !== 'all'

  return (
    <div className={blogFilterBar}>
      {showTagFilter ? (
        <div className={blogFilterControl}>
          <BlogTagFilterDropdown
            options={tagOptions}
            value={selectedTag}
            onChange={setSelectedTag}
          />
        </div>
      ) : null}
      <div className={blogFilterControl}>
        <BlogSortDropdown value={selectedSort} onChange={setSelectedSort} />
      </div>
    </div>
  )
}
