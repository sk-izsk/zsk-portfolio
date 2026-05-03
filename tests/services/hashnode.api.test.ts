import {
  hashNodeApi,
  mapHashNodePostToBlogPostSummary,
  mapHashNodePublicationPostsResponse,
} from '@/services/hash-node/api'
import { hashNodeQueryKeys } from '@/services/hash-node/queryKeys'
import type { HashNodePostNode } from '@/services/hash-node/types'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/services/hash-node/client', () => ({
  hashNodeGraphqlRequest: vi.fn(),
}))

const makePostNode = (): HashNodePostNode => ({
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
    expect(mapHashNodePostToBlogPostSummary(makePostNode())).toEqual({
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

    expect(mapHashNodePostToBlogPostSummary(post)).toEqual({
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
      mapHashNodePublicationPostsResponse({
        publication: null,
      }),
    ).toThrowError('HashNode publication not found')
  })

  it('returns mapped posts from API response', async () => {
    const { hashNodeGraphqlRequest } =
      await import('@/services/hash-node/client')

    vi.mocked(hashNodeGraphqlRequest).mockResolvedValue({
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
      hashNodeApi.getPublicationPostsPage({
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

  it('returns tag by slug when requested', async () => {
    const { hashNodeGraphqlRequest } =
      await import('@/services/hash-node/client')

    vi.mocked(hashNodeGraphqlRequest).mockResolvedValue({
      tag: {
        id: 'tag-2',
        name: 'TypeScript',
        slug: 'typescript',
      },
    })

    await expect(hashNodeApi.getTagBySlug('typescript')).resolves.toEqual({
      id: 'tag-2',
      name: 'TypeScript',
      slug: 'typescript',
    })
  })
})

describe('hashnodeQueryKeys', () => {
  it('returns stable query key tuples', () => {
    expect(hashNodeQueryKeys.publicationPosts('izsk.hashnode.dev', 6, ['react', 'typescript'])).toEqual([
      'hash-node',
      'publication-posts',
      'izsk.hashnode.dev',
      6,
      'react,typescript',
    ])
  })
})
