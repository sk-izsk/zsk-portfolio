export const hashNodeQueryKeys = {
  publicationPosts: (host: string, first: number, tagFilter: string) =>
    ['hash-node', 'publication-posts', host, first, tagFilter] as const,
}
