interface HashNodeGraphQLError {
  message: string
}

export interface HashNodeTagNode {
  id: string
  name: string
  slug: string
}

export interface HashNodePostNode {
  id: string
  title: string
  brief: string
  url: string
  slug: string
  publishedAt: string
  coverImage: {
    url: string
  } | null
  tags: HashNodeTagNode[]
}

interface HashNodePageInfo {
  hasNextPage: boolean
  endCursor: string | null
}

export interface HashNodePublicationPostsResponse {
  publication: {
    id: string
    title: string
    posts: {
      pageInfo: HashNodePageInfo
      edges: Array<{
        node: HashNodePostNode
      }>
    }
  } | null
}

export interface HashNodeTagResponse {
  tag: HashNodeTagNode | null
}

export interface HashNodeGraphQLResponse<TData> {
  data?: TData
  errors?: HashNodeGraphQLError[]
}

export interface BlogPostSummary {
  id: string
  title: string
  brief: string
  url: string
  slug: string
  publishedAt: string
  coverImageUrl: string | null
  tags: HashNodeTagNode[]
}

export interface BlogPostsPage {
  posts: BlogPostSummary[]
  pageInfo: HashNodePageInfo
}

export interface HashNodePostsPageParams {
  host: string
  first?: number
  after?: string | null
  tagSlugs?: string[]
}
