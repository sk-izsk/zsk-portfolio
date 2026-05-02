import { useHashNodePosts } from '@/hooks/useHashnodePosts'
import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { createTestQueryClient } from '@tests/helpers/AllProviders'
import type { PropsWithChildren } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/services/hash-node/api', () => ({
  HASH_NODE_DEFAULT_POSTS_LIMIT: 6,
  hashNodeApi: {
    getPublicationPostsPage: vi.fn(),
  },
}))

const createWrapper = () => {
  const queryClient = createTestQueryClient()

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useHashNodePosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns posts on success', async () => {
    const { hashNodeApi } = await import('@/services/hash-node/api')

    vi.mocked(hashNodeApi.getPublicationPostsPage).mockResolvedValue({
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

    const { result } = renderHook(
      () => useHashNodePosts({ host: 'izsk.hashnode.dev', first: 6, tagFilter: 'all' }),
      {
        wrapper: createWrapper(),
      },
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.posts).toHaveLength(1)
    expect(hashNodeApi.getPublicationPostsPage).toHaveBeenCalledWith({
      host: 'izsk.hashnode.dev',
      first: 6,
      after: null,
      tagSlugs: undefined,
    })
  })

  it('returns error state when request fails', async () => {
    const { hashNodeApi } = await import('@/services/hash-node/api')

    vi.mocked(hashNodeApi.getPublicationPostsPage).mockRejectedValue(new Error('Request failed'))

    const { result } = renderHook(
      () => useHashNodePosts({ host: 'izsk.hashnode.dev', first: 6, tagFilter: 'all' }),
      {
        wrapper: createWrapper(),
      },
    )

    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 3000 })
    expect(result.current.error?.message).toBe('Request failed')
  })

  it('returns an empty array when Hashnode has no posts', async () => {
    const { hashNodeApi } = await import('@/services/hash-node/api')

    vi.mocked(hashNodeApi.getPublicationPostsPage).mockResolvedValue({
      posts: [],
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    })

    const { result } = renderHook(
      () => useHashNodePosts({ host: 'izsk.hashnode.dev', first: 6, tagFilter: 'all' }),
      {
        wrapper: createWrapper(),
      },
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.posts).toEqual([])
  })
})
