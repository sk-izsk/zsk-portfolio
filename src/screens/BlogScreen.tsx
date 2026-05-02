import React from 'react'
import { BlogCardContainer } from '@components/blog/BlogCardContainer'
import { blogContent, blogGrid, blogState, blogStateError } from '@components/blog/blog.css'
import { Screen } from '@components/Screen'
import { useAnalytics } from '@hooks/useAnalytics'
import { useHashnodePosts } from '@hooks/useHashnodePosts'
import { useTranslation } from '@localization/localize'
import {
  HASHNODE_DEFAULT_POSTS_LIMIT,
  HASHNODE_PUBLICATION_HOST,
} from '@services/hashnode/hashnode.api'

const BlogScreen: React.FC = () => {
  const { t } = useTranslation()
  const {
    data: posts,
    isLoading,
    isError,
  } = useHashnodePosts(HASHNODE_PUBLICATION_HOST, HASHNODE_DEFAULT_POSTS_LIMIT)
  useAnalytics()

  return (
    <Screen
      sectionId="blog"
      isLoading={false}
      isError={false}
      title={t('blog.title')}
      description={t('blog.seoDescription')}
      canonical="/blog"
    >
      <div className="row">
        <div className={`${blogContent} padd-15`}>
          {isLoading ? <div className={blogState}>Loading...</div> : null}
          {!isLoading && isError ? (
            <div className={`${blogState} ${blogStateError}`}>{t('blog.error')}</div>
          ) : null}
          {!isLoading && !isError && posts?.length === 0 ? (
            <div className={blogState}>{t('blog.empty')}</div>
          ) : null}
          {!isLoading && !isError && posts?.length ? (
            <div className={blogGrid}>
              {posts.map((post) => (
                <BlogCardContainer key={post.id} post={post} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Screen>
  )
}

export default BlogScreen
