import {
  HASH_NODE_DEFAULT_POSTS_LIMIT,
  HASH_NODE_PUBLICATION_HOST,
  hashNodeApi,
} from '@/services/hash-node/api'
import { hashNodeQueryKeys } from '@/services/hash-node/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'

interface UseHashNodePostsOptions {
  host?: string
  first?: number
  tagFilter?: string
}

export const useHashNodePosts = ({
  host = HASH_NODE_PUBLICATION_HOST,
  first = HASH_NODE_DEFAULT_POSTS_LIMIT,
  tagFilter = 'all',
}: UseHashNodePostsOptions) => {
  const query = useInfiniteQuery({
    queryKey: hashNodeQueryKeys.publicationPosts(host, first, tagFilter),
    queryFn: ({ pageParam }) =>
      hashNodeApi.getPublicationPostsPage({
        host,
        first,
        after: pageParam,
        tagSlugs: tagFilter !== 'all' ? [tagFilter] : undefined,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: host.trim().length > 0,
  })

  return {
    ...query,
    posts: query.data?.pages.flatMap((page) => page.posts) ?? [],
  }
}
