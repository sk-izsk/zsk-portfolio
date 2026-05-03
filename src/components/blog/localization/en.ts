export const blogEn = {
  title: 'Blog',
  seoDescription:
    'Blog posts and articles by Shaikh Zeeshan Murshed on software engineering, web development, and technology.',
  readArticle: 'Read article',
  sourceLabel: 'Hashnode',
  coverFallback: 'New post',
  empty: 'No published posts yet. New write-ups will show here automatically.',
  error: 'Could not load blog posts right now.',
  loadingMore: 'Loading more posts...',
  openArticleAriaLabel: 'Open article: {{title}}',
  filter: {
    label: 'Filter posts by tag',
    placeholder: 'Search tags',
    empty: 'No matching tags found.',
    loading: 'Loading tags...',
    options: {
      all: 'All tags',
    },
  },
  sort: {
    label: 'Sort blog posts',
    options: {
      latest: 'Latest first',
      oldest: 'Oldest first',
      'title-asc': 'Title A-Z',
    },
  },
} as const
