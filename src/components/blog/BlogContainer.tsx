import type { BlogPost } from '@app-types/portfolio'
import { BlogCardContainer } from '@components/blog/BlogCardContainer'
import { BlogFilterBar } from '@components/blog/BlogFilterBar'
import { projectGrid, projectHeading, projectToolbar } from '@components/projects/projects.css'
import { useTranslation } from '@localization/localize'
import { cx } from '@utils/cn'
import React from 'react'
import { useSelectedBlogTagFilters } from '../../hooks/blog/useSelectedBlogTagFilters'
import type { FilterBlogPostType } from '@hooks/blog/useBlogTypeFilteredPosts'

interface BlogContainerProps {
  posts: FilterBlogPostType[]
  allPosts: BlogPost[]
  onReadMoreClick: (post: FilterBlogPostType) => void
}

export const BlogContainer: React.FC<BlogContainerProps> = ({ posts, allPosts, onReadMoreClick }) => {
  const [selectedTags, setSelectedTags] = useSelectedBlogTagFilters()
  const { t } = useTranslation()

  return (
    <>
      <div className="row">
        <div className={cx(projectHeading, 'padd-15')}>
          <div className={projectToolbar}>
            <BlogFilterBar
              posts={allPosts}
              selectedTags={selectedTags}
              onSelectedTagsChange={setSelectedTags}
            />
          </div>
        </div>
      </div>
      <div className={cx(projectGrid, 'padd-15')}>
        {posts.length === 0 ? <div>{t('blog.empty')}</div> : null}
        {posts.map((post) => (
          <BlogCardContainer key={post.id} post={post} onReadMoreClick={onReadMoreClick} />
        ))}
      </div>
    </>
  )
}
