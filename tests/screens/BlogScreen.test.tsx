import BlogScreen from '@screens/BlogScreen'
import { render, screen } from '@testing-library/react'
import { AllProviders } from '@tests/helpers/AllProviders'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@hooks/useAnalytics', () => ({
  useAnalytics: vi.fn(),
}))

vi.mock('@hooks/useHashnodePosts', () => ({
  useHashnodePosts: vi.fn(),
}))

const makeHookResult = (value: Record<string, unknown>) =>
  value as unknown as ReturnType<typeof import('@hooks/useHashnodePosts').useHashnodePosts>

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
    const { useHashnodePosts } = await import('@hooks/useHashnodePosts')

    vi.mocked(useHashnodePosts).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as unknown as ReturnType<typeof useHashnodePosts>)

    renderScreen()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state when query fails', async () => {
    const { useHashnodePosts } = await import('@hooks/useHashnodePosts')

    vi.mocked(useHashnodePosts).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof useHashnodePosts>)

    renderScreen()

    expect(screen.getByText('Could not load blog posts right now.')).toBeInTheDocument()
  })

  it('renders empty state when there are no posts', async () => {
    const { useHashnodePosts } = await import('@hooks/useHashnodePosts')

    vi.mocked(useHashnodePosts).mockReturnValue(
      makeHookResult({
        data: [],
        isLoading: false,
        isError: false,
      }),
    )

    renderScreen()

    expect(
      screen.getByText('No published posts yet. New write-ups will show here automatically.'),
    ).toBeInTheDocument()
  })

  it('renders blog post content and links to Hashnode from read-article CTA', async () => {
    const { useHashnodePosts } = await import('@hooks/useHashnodePosts')

    vi.mocked(useHashnodePosts).mockReturnValue(
      makeHookResult({
        data: [
          {
            id: 'post-1',
            title: 'I Ditched Axios for Ky',
            brief: 'Network layer notes from a real migration.',
            url: 'https://izsk.hashnode.dev/post',
            slug: 'post',
            publishedAt: '2026-05-02T19:30:53.107Z',
            coverImageUrl: null,
            tags: ['ky', 'react-query'],
          },
        ],
        isLoading: false,
        isError: false,
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
})
