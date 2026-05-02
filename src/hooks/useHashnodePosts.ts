import { useQuery } from '@tanstack/react-query'
import { HASHNODE_DEFAULT_POSTS_LIMIT, hashnodeApi } from '@services/hashnode/hashnode.api'
import { hashnodeQueryKeys } from '@services/hashnode/hashnode.queryKeys'

export const useHashnodePosts = (host: string, first = HASHNODE_DEFAULT_POSTS_LIMIT) => {
  return useQuery({
    queryKey: hashnodeQueryKeys.publicationPosts(host, first),
    queryFn: () => hashnodeApi.getPublicationPosts(host, first),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: host.trim().length > 0,
  })
}
