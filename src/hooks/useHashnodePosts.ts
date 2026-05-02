import { useInfiniteQuery } from '@tanstack/react-query'
import {
  HASHNODE_DEFAULT_POSTS_LIMIT,
  HASHNODE_PUBLICATION_HOST,
  hashnodeApi,
} from '@services/hashnode/hashnode.api'
import { hashnodeQueryKeys } from '@services/hashnode/hashnode.queryKeys'

export const useHashnodePosts = (
  host = HASHNODE_PUBLICATION_HOST,
  first = HASHNODE_DEFAULT_POSTS_LIMIT,
  tagFilter = 'all',
) => {
  const query = useInfiniteQuery({
    queryKey: hashnodeQueryKeys.publicationPosts(host, first, tagFilter),
    queryFn: ({ pageParam }) =>
      hashnodeApi.getPublicationPostsPage({
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
