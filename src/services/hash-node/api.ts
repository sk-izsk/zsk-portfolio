import { hashNodeGraphqlRequest } from './client'
import { HASH_NODE_PUBLICATION_POSTS_QUERY, HASH_NODE_TAG_BY_SLUG_QUERY } from './queries'
import type {
  BlogPostsPage,
  BlogPostSummary,
  HashNodePostNode,
  HashNodePostsPageParams,
  HashNodePublicationPostsResponse,
  HashNodeTagNode,
  HashNodeTagResponse,
} from './types'

export const HASH_NODE_PUBLICATION_HOST = 'izsk.hashnode.dev'
export const HASH_NODE_DEFAULT_POSTS_LIMIT = 6

export const mapHashNodePostToBlogPostSummary = (post: HashNodePostNode): BlogPostSummary => ({
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

export const mapHashNodePublicationPostsResponse = (
  response: HashNodePublicationPostsResponse,
): BlogPostsPage => {
  if (!response.publication) {
    throw new Error('HashNode publication not found')
  }

  return {
    posts: response.publication.posts.edges.map((edge) =>
      mapHashNodePostToBlogPostSummary(edge.node),
    ),
    pageInfo: response.publication.posts.pageInfo,
  }
}

export const hashNodeApi = {
  getPublicationPostsPage: async ({
    host,
    first = HASH_NODE_DEFAULT_POSTS_LIMIT,
    after,
    tagSlugs,
  }: HashNodePostsPageParams): Promise<BlogPostsPage> => {
    const response = await hashNodeGraphqlRequest<HashNodePublicationPostsResponse>({
      query: HASH_NODE_PUBLICATION_POSTS_QUERY,
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

    return mapHashNodePublicationPostsResponse(response)
  },
  getTagBySlug: async (slug: string): Promise<HashNodeTagNode | null> => {
    const response = await hashNodeGraphqlRequest<HashNodeTagResponse>({
      query: HASH_NODE_TAG_BY_SLUG_QUERY,
      variables: {
        slug,
      },
    })

    return response.tag
  },
}
