export const hashnodeQueryKeys = {
  publicationPosts: (host: string, first: number, tagFilter: string) =>
    ['hashnode', 'publication-posts', host, first, tagFilter] as const,
}
