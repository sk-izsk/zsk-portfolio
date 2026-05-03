export const HASH_NODE_PUBLICATION_POSTS_QUERY = `
  query PublicationPosts(
    $host: String!
    $first: Int!
    $after: String
    $filter: PublicationPostConnectionFilter
  ) {
    publication(host: $host) {
      id
      title
      posts(first: $first, after: $after, filter: $filter) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            brief
            url
            slug
            publishedAt
            coverImage {
              url
            }
            tags {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`

export const HASH_NODE_TAG_BY_SLUG_QUERY = `
  query TagBySlug($slug: String!) {
    tag(slug: $slug) {
      id
      name
      slug
    }
  }
`
