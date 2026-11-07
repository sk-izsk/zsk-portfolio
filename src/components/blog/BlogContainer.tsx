import type { BlogPost } from '@app-types/portfolio'
import { BlogCardContainer } from '@components/blog/BlogCardContainer'
import { BlogFilterBar } from '@components/blog/BlogFilterBar'
import { Button } from '@components/common/button/Button'
import {
  projectGrid,
  projectHeading,
  projectSeeAll,
  projectToolbar,
} from '@components/projects/projects.css'
import { usePreview } from '@hooks/usePreview'
import { useTranslation } from '@localization/localize'
import { cx } from '@utils/cn'
import React from 'react'
import { useSelectedBlogTagFilters } from '../../hooks/blog/useSelectedBlogTagFilters'
import type { FilterBlogPostType } from '@hooks/blog/useBlogTypeFilteredPosts'

const PREVIEW_COUNT = 6
const PREVIEW_COUNT_PHONE = 3

interface BlogContainerProps {
  posts: FilterBlogPostType[]
  allPosts: BlogPost[]
  onReadMoreClick: (post: FilterBlogPostType) => void
}

export const BlogContainer: React.FC<BlogContainerProps> = ({
  posts,
  allPosts,
  onReadMoreClick,
}) => {
  const [selectedTags, setSelectedTags] = useSelectedBlogTagFilters()
  const { t } = useTranslation()
  const { visibleItems, hasMore, showAll } = usePreview(posts, PREVIEW_COUNT_PHONE, PREVIEW_COUNT)

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
        {visibleItems.map((post) => (
          <BlogCardContainer key={post.id} post={post} onReadMoreClick={onReadMoreClick} />
        ))}
      </div>
      {hasMore ? (
        <div className={projectSeeAll}>
          <Button variant="secondary" size="large" onClick={showAll}>
            {t('blog.seeAll', { count: posts.length })}
          </Button>
        </div>
      ) : null}
    </>
  )
}
