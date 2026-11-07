import { useEffect, useState, type RefObject } from 'react'

interface UseScrollableOverflowOptions {
  isEnabled: boolean
  viewportRef: RefObject<HTMLElement | null>
  // Watched for size changes, so new content updates the result without being listed.
  contentRef?: RefObject<HTMLElement | null>
}

export const useScrollableOverflow = ({
  isEnabled,
  viewportRef,
  contentRef,
}: UseScrollableOverflowOptions) => {
  const [hasMoreBelow, setHasMoreBelow] = useState(false)

  useEffect(() => {
    const viewport = viewportRef.current
    const content = contentRef?.current

    if (!isEnabled || !viewport) {
      return
    }

    const updateScrollState = () => {
      setHasMoreBelow(viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 2)
    }

    updateScrollState()

    viewport.addEventListener('scroll', updateScrollState, { passive: true })

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            updateScrollState()
          })
        : null

    resizeObserver?.observe(viewport)

    if (content) {
      resizeObserver?.observe(content)
    }

    return () => {
      viewport.removeEventListener('scroll', updateScrollState)
      resizeObserver?.disconnect()
    }
  }, [contentRef, isEnabled, viewportRef])

  return { hasMoreBelow: isEnabled && hasMoreBelow }
}
