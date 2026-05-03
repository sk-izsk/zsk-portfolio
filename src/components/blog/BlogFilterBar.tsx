import type { BlogSortValue } from '@hooks/blog/useSelectedBlogSort'
import type { BlogPostSummary } from '@services/hash-node/types'
import React from 'react'
import { blogFilterBar, blogFilterControl } from './blog.css'
import { BlogSortDropdown } from './BlogSortDropdown'
import { BlogTagPickerContainer } from './BlogTagPickerContainer'

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
  return (
    <div className={blogFilterBar}>
      <BlogTagPickerContainer
        selectedTags={selectedTags}
        posts={posts}
        onSelectedTagsChange={onSelectedTagsChange}
      />
      <div className={blogFilterControl}>
        <BlogSortDropdown value={selectedSort} onChange={onSelectedSortChange} />
      </div>
    </div>
  )
}
