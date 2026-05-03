import BlogScreen from '@screens/BlogScreen'
import { render, screen } from '@testing-library/react'
import { AllProviders } from '@tests/helpers/AllProviders'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@hooks/useAnalytics', () => ({
  useAnalytics: vi.fn(),
}))

vi.mock('@hooks/useHashnodePosts', () => ({
  useHashNodePosts: vi.fn(),
}))

const makeHookResult = (value: Record<string, unknown>) =>
  value as unknown as ReturnType<typeof import('@/hooks/useHashnodePosts').useHashNodePosts>

const renderScreen = () =>
  render(
    <AllProviders>
      <BlogScreen />
    </AllProviders>,
  )

describe('BlogScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.history.pushState({}, '', '/blog')
  })

  it('renders loading state', async () => {
    const { useHashNodePosts } = await import('@/hooks/useHashnodePosts')

    vi.mocked(useHashNodePosts).mockReturnValue({
      posts: [],
      isLoading: true,
      isError: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    } as unknown as ReturnType<typeof useHashNodePosts>)

    renderScreen()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state when query fails', async () => {
    const { useHashNodePosts } = await import('@/hooks/useHashnodePosts')

    vi.mocked(useHashNodePosts).mockReturnValue({
      posts: [],
      isLoading: false,
      isError: true,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    } as unknown as ReturnType<typeof useHashNodePosts>)

    renderScreen()

    expect(screen.getByText('Could not load blog posts right now.')).toBeInTheDocument()
  })

  it('renders empty state when there are no posts', async () => {
    const { useHashNodePosts } = await import('@/hooks/useHashnodePosts')

    vi.mocked(useHashNodePosts).mockReturnValue(
      makeHookResult({
        posts: [],
        isLoading: false,
        isError: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      }),
    )

    renderScreen()

    expect(
      screen.getByText('No published posts yet. New write-ups will show here automatically.'),
    ).toBeInTheDocument()
  })

  it('renders blog post content and links to Hashnode from read-article CTA', async () => {
    const { useHashNodePosts } = await import('@/hooks/useHashnodePosts')

    vi.mocked(useHashNodePosts).mockReturnValue(
      makeHookResult({
        posts: [
          {
            id: 'post-1',
            title: 'I Ditched Axios for Ky',
            brief: 'Network layer notes from a real migration.',
            url: 'https://izsk.hashnode.dev/post',
            slug: 'post',
            publishedAt: '2026-05-02T19:30:53.107Z',
            coverImageUrl: null,
            tags: [
              { id: 'tag-1', name: 'ky', slug: 'ky' },
              { id: 'tag-2', name: 'react-query', slug: 'react-query' },
            ],
          },
        ],
        isLoading: false,
        isError: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      }),
    )

    renderScreen()

    expect(screen.getByRole('heading', { name: 'I Ditched Axios for Ky' })).toBeInTheDocument()
    expect(screen.getByText('Network layer notes from a real migration.')).toBeInTheDocument()

    const link = screen.getByRole('link', { name: 'Open article: I Ditched Axios for Ky' })
    expect(link).toHaveAttribute('href', 'https://izsk.hashnode.dev/post')
    expect(link).toHaveAttribute('target', '_blank')
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  it('reads selected tags from url and passes them to blog query hook', async () => {
    const { useHashNodePosts } = await import('@/hooks/useHashnodePosts')

    vi.mocked(useHashNodePosts).mockReturnValue(
      makeHookResult({
        posts: [],
        isLoading: false,
        isError: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      }),
    )

    window.history.pushState({}, '', '/blog?blog-tags=react,typescript')

    renderScreen()

    expect(useHashNodePosts).toHaveBeenCalledWith(
      expect.objectContaining({
        tagFilter: ['react', 'typescript'],
      }),
    )
  })
})
