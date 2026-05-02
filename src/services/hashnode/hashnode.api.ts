import { hashnodeGraphqlRequest } from './hashnode.client'
import { HASHNODE_PUBLICATION_POSTS_QUERY } from './hashnode.queries'
import type {
  BlogPostSummary,
  HashnodePostNode,
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
  tags: post.tags.map((tag) => tag.name),
})

export const mapHashnodePublicationPostsResponse = (
  response: HashnodePublicationPostsResponse,
): BlogPostSummary[] => {
  if (!response.publication) {
    throw new Error('Hashnode publication not found')
  }

  return response.publication.posts.edges.map((edge) => mapHashnodePostToBlogPostSummary(edge.node))
}

export const hashnodeApi = {
  getPublicationPosts: async (
    host: string,
    first = HASHNODE_DEFAULT_POSTS_LIMIT,
  ): Promise<BlogPostSummary[]> => {
    const response = await hashnodeGraphqlRequest<HashnodePublicationPostsResponse>({
      query: HASHNODE_PUBLICATION_POSTS_QUERY,
      variables: {
        host,
        first,
      },
    })

    return mapHashnodePublicationPostsResponse(response)
  },
}
