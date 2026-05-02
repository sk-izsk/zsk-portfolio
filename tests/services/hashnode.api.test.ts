import {
  hashnodeApi,
  mapHashnodePostToBlogPostSummary,
  mapHashnodePublicationPostsResponse,
} from '@services/hashnode/hashnode.api'
import { hashnodeQueryKeys } from '@services/hashnode/hashnode.queryKeys'
import type { HashnodePostNode } from '@services/hashnode/hashnode.types'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@services/hashnode/hashnode.client', () => ({
  hashnodeGraphqlRequest: vi.fn(),
}))

const makePostNode = (): HashnodePostNode => ({
  id: 'post-1',
  title: 'I Ditched Axios for Ky',
  brief: 'Short post summary',
  url: 'https://izsk.hashnode.dev/post',
  slug: 'post',
  publishedAt: '2026-05-02T19:30:53.107Z',
  coverImage: {
    url: 'https://cdn.hashnode.com/cover.jpg',
  },
  tags: [
    {
      id: 'tag-1',
      name: 'React',
      slug: 'react',
    },
  ],
})

describe('hashnodeApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('maps a Hashnode post to a blog summary', () => {
    expect(mapHashnodePostToBlogPostSummary(makePostNode())).toEqual({
      id: 'post-1',
      title: 'I Ditched Axios for Ky',
      brief: 'Short post summary',
      url: 'https://izsk.hashnode.dev/post',
      slug: 'post',
      publishedAt: '2026-05-02T19:30:53.107Z',
      coverImageUrl: 'https://cdn.hashnode.com/cover.jpg',
      tags: [
        {
          id: 'tag-1',
          name: 'React',
          slug: 'react',
        },
      ],
    })
  })

  it('handles missing cover image and empty tags', () => {
    const post = makePostNode()
    post.coverImage = null
    post.tags = []

    expect(mapHashnodePostToBlogPostSummary(post)).toEqual({
      id: 'post-1',
      title: 'I Ditched Axios for Ky',
      brief: 'Short post summary',
      url: 'https://izsk.hashnode.dev/post',
      slug: 'post',
      publishedAt: '2026-05-02T19:30:53.107Z',
      coverImageUrl: null,
      tags: [],
    })
  })

  it('throws when publication is missing', () => {
    expect(() =>
      mapHashnodePublicationPostsResponse({
        publication: null,
      }),
    ).toThrowError('Hashnode publication not found')
  })

  it('returns mapped posts from API response', async () => {
    const { hashnodeGraphqlRequest } = await import('@services/hashnode/hashnode.client')

    vi.mocked(hashnodeGraphqlRequest).mockResolvedValue({
      publication: {
        id: 'publication-1',
        title: 'Blog',
        posts: {
          pageInfo: {
            hasNextPage: true,
            endCursor: 'cursor-1',
          },
          edges: [{ node: makePostNode() }],
        },
      },
    })

    await expect(
      hashnodeApi.getPublicationPostsPage({
        host: 'izsk.hashnode.dev',
        first: 6,
        after: 'cursor-0',
        tagSlugs: ['react'],
      }),
    ).resolves.toEqual({
      posts: [
        {
          id: 'post-1',
          title: 'I Ditched Axios for Ky',
          brief: 'Short post summary',
          url: 'https://izsk.hashnode.dev/post',
          slug: 'post',
          publishedAt: '2026-05-02T19:30:53.107Z',
          coverImageUrl: 'https://cdn.hashnode.com/cover.jpg',
          tags: [
            {
              id: 'tag-1',
              name: 'React',
              slug: 'react',
            },
          ],
        },
      ],
      pageInfo: {
        hasNextPage: true,
        endCursor: 'cursor-1',
      },
    })
  })
})

describe('hashnodeQueryKeys', () => {
  it('returns stable query key tuples', () => {
    expect(hashnodeQueryKeys.publicationPosts('izsk.hashnode.dev', 6, 'all')).toEqual([
      'hashnode',
      'publication-posts',
      'izsk.hashnode.dev',
      6,
      'all',
    ])
  })
})
