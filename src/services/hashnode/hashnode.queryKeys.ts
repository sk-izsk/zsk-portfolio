export const hashnodeQueryKeys = {
  publicationPosts: (host: string, first: number) =>
    ['hashnode', 'publication-posts', host, first] as const,
}
