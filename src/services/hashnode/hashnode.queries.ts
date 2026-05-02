export const HASHNODE_PUBLICATION_POSTS_QUERY = `
  query PublicationPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      id
      title
      posts(first: $first) {
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
