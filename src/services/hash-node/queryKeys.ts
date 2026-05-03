export const hashNodeQueryKeys = {
  publicationPosts: (host: string, first: number, tagFilter: string[]) =>
    ['hash-node', 'publication-posts', host, first, tagFilter.join(',')] as const,
  tagBySlug: (slug: string) => ['hash-node', 'tag-by-slug', slug] as const,
}
