import { hashnodeGraphqlRequest } from './hashnode.client'
import { HASHNODE_PUBLICATION_POSTS_QUERY } from './hashnode.queries'
import type {
  BlogPostSummary,
  BlogPostsPage,
  HashnodePostNode,
  HashnodePostsPageParams,
  HashnodePublicationPostsResponse,
} from './hashnode.types'

export const HASHNODE_PUBLICATION_HOST = 'izsk.hashnode.dev'
export const HASHNODE_DEFAULT_POSTS_LIMIT = 6

export const mapHashnodePostToBlogPostSummary = (post: HashnodePostNode): BlogPostSummary => ({
  id: post.id,
  title: post.title,
  brief: post.brief,
  url: post.url,
  slug: post.slug,
  publishedAt: post.publishedAt,
  coverImageUrl: post.coverImage?.url ?? null,
  tags: post.tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
  })),
})

export const mapHashnodePublicationPostsResponse = (
  response: HashnodePublicationPostsResponse,
): BlogPostsPage => {
  if (!response.publication) {
    throw new Error('Hashnode publication not found')
  }

  return {
    posts: response.publication.posts.edges.map((edge) =>
      mapHashnodePostToBlogPostSummary(edge.node),
    ),
    pageInfo: response.publication.posts.pageInfo,
  }
}

export const hashnodeApi = {
  getPublicationPostsPage: async ({
    host,
    first = HASHNODE_DEFAULT_POSTS_LIMIT,
    after,
    tagSlugs,
  }: HashnodePostsPageParams): Promise<BlogPostsPage> => {
    const response = await hashnodeGraphqlRequest<HashnodePublicationPostsResponse>({
      query: HASHNODE_PUBLICATION_POSTS_QUERY,
      variables: {
        host,
        first,
        after,
        filter: tagSlugs?.length
          ? {
              tagSlugs,
              excludePinnedPost: true,
            }
          : {
              excludePinnedPost: true,
            },
      },
    })

    return mapHashnodePublicationPostsResponse(response)
  },
}
