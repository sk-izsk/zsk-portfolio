import type { DropdownOption } from '@components/common/dropdown/Dropdown'
import React from 'react'
import { useSelectedBlogSort } from '@hooks/blog/useSelectedBlogSort'
import { useSelectedBlogTagFilter } from '@hooks/blog/useSelectedBlogTagFilter'
import { blogFilterBar, blogFilterControl } from './blog.css'
import { BlogSortDropdown } from './BlogSortDropdown'
import { BlogTagFilterDropdown } from './BlogTagFilterDropdown'

interface BlogFilterBarProps {
  tagOptions: DropdownOption<string>[]
}

export const BlogFilterBar: React.FC<BlogFilterBarProps> = ({ tagOptions }) => {
  const [selectedTag, setSelectedTag] = useSelectedBlogTagFilter()
  const [selectedSort, setSelectedSort] = useSelectedBlogSort()
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
