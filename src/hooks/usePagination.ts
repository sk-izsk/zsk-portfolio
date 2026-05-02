import { useEffect, useRef } from 'react'

interface UsePaginationProps {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export const usePagination = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UsePaginationProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    if (!hasNextPage || isFetchingNextPage) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage()
        }
      },
      { threshold: 1 },
    )

    const currentElement = loadMoreRef.current

    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return loadMoreRef
}
