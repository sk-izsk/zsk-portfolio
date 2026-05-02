export interface HashnodeGraphQLError {
  message: string
}

export interface HashnodeTagNode {
  id: string
  name: string
  slug: string
}

export interface HashnodePostNode {
  id: string
  title: string
  brief: string
  url: string
  slug: string
  publishedAt: string
  coverImage: {
    url: string
  } | null
  tags: HashnodeTagNode[]
}

export interface HashnodePublicationPostsResponse {
  publication: {
    id: string
    title: string
    posts: {
      edges: Array<{
        node: HashnodePostNode
      }>
    }
  } | null
}

export interface HashnodeGraphQLResponse<TData> {
  data?: TData
  errors?: HashnodeGraphQLError[]
}

export interface BlogPostSummary {
  id: string
  title: string
  brief: string
  url: string
  slug: string
  publishedAt: string
  coverImageUrl: string | null
  tags: string[]
}
