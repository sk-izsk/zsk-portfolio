import { QueryClientProvider } from '@tanstack/react-query'
import { useHashnodePosts } from '@hooks/useHashnodePosts'
import { renderHook, waitFor } from '@testing-library/react'
import { createTestQueryClient } from '@tests/helpers/AllProviders'
import type { PropsWithChildren } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@services/hashnode/hashnode.api', () => ({
  HASHNODE_DEFAULT_POSTS_LIMIT: 6,
  hashnodeApi: {
    getPublicationPosts: vi.fn(),
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
    const { hashnodeApi } = await import('@services/hashnode/hashnode.api')

    vi.mocked(hashnodeApi.getPublicationPosts).mockResolvedValue([
      {
        id: 'post-1',
        title: 'Post title',
        brief: 'Post brief',
        url: 'https://izsk.hashnode.dev/post',
        slug: 'post',
        publishedAt: '2026-05-02T19:30:53.107Z',
        coverImageUrl: null,
        tags: ['React'],
      },
    ])

    const { result } = renderHook(() => useHashnodePosts('izsk.hashnode.dev', 6), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(1)
    expect(hashnodeApi.getPublicationPosts).toHaveBeenCalledWith('izsk.hashnode.dev', 6)
  })

  it('returns error state when request fails', async () => {
    const { hashnodeApi } = await import('@services/hashnode/hashnode.api')

    vi.mocked(hashnodeApi.getPublicationPosts).mockRejectedValue(new Error('Request failed'))

    const { result } = renderHook(() => useHashnodePosts('izsk.hashnode.dev', 6), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 3000 })
    expect(result.current.error?.message).toBe('Request failed')
  })

  it('returns an empty array when Hashnode has no posts', async () => {
    const { hashnodeApi } = await import('@services/hashnode/hashnode.api')

    vi.mocked(hashnodeApi.getPublicationPosts).mockResolvedValue([])

    const { result } = renderHook(() => useHashnodePosts('izsk.hashnode.dev', 6), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual([])
  })
})
