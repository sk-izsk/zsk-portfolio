import { useHashnodePosts } from '@/hooks/useHashNodePosts'
import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { createTestQueryClient } from '@tests/helpers/AllProviders'
import type { PropsWithChildren } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@services/hashnode/hashnode.api', () => ({
  HASHNODE_DEFAULT_POSTS_LIMIT: 6,
  hashnodeApi: {
    getPublicationPostsPage: vi.fn(),
  },
}))

const createWrapper = () => {
  const queryClient = createTestQueryClient()

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useHashnodePosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns posts on success', async () => {
    const { hashNodeApi: hashnodeApi } = await import('@/services/hash-node/api')

    vi.mocked(hashnodeApi.getPublicationPostsPage).mockResolvedValue({
      posts: [
        {
          id: 'post-1',
          title: 'Post title',
          brief: 'Post brief',
          url: 'https://izsk.hashnode.dev/post',
          slug: 'post',
          publishedAt: '2026-05-02T19:30:53.107Z',
          coverImageUrl: null,
          tags: [{ id: 'tag-1', name: 'React', slug: 'react' }],
        },
      ],
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    })

    const { result } = renderHook(() => useHashnodePosts('izsk.hashnode.dev', 6, 'all'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.posts).toHaveLength(1)
    expect(hashnodeApi.getPublicationPostsPage).toHaveBeenCalledWith({
      host: 'izsk.hashnode.dev',
      first: 6,
      after: null,
      tagSlugs: undefined,
    })
  })

  it('returns error state when request fails', async () => {
    const { hashNodeApi: hashnodeApi } = await import('@/services/hash-node/api')

    vi.mocked(hashnodeApi.getPublicationPostsPage).mockRejectedValue(new Error('Request failed'))

    const { result } = renderHook(() => useHashnodePosts('izsk.hashnode.dev', 6, 'all'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 3000 })
    expect(result.current.error?.message).toBe('Request failed')
  })

  it('returns an empty array when Hashnode has no posts', async () => {
    const { hashNodeApi: hashnodeApi } = await import('@/services/hash-node/api')

    vi.mocked(hashnodeApi.getPublicationPostsPage).mockResolvedValue({
      posts: [],
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    })

    const { result } = renderHook(() => useHashnodePosts('izsk.hashnode.dev', 6, 'all'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.posts).toEqual([])
  })
})
