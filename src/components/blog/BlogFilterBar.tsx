import type { BlogPost } from '@app-types/portfolio'
import React from 'react'
import { projectFilterBar, projectFilterControl } from '@components/projects/projects.css'
import { BlogTypeDropdown } from './BlogTypeDropdown'
import { BlogTagPickerContainer } from './BlogTagPickerContainer'

interface BlogFilterBarProps {
  posts: BlogPost[]
  selectedTags: string[]
  onSelectedTagsChange: (values: string[]) => void
}

export const BlogFilterBar: React.FC<BlogFilterBarProps> = ({
  posts,
  selectedTags,
  onSelectedTagsChange,
}) => {
  return (
    <div className={projectFilterBar}>
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
