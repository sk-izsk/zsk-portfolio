import { useEffect, useState, type RefObject } from 'react'

interface UseScrollableOverflowOptions {
  isEnabled: boolean
  viewportRef: RefObject<HTMLElement | null>
  contentRef?: RefObject<HTMLElement | null>
  dependencies?: readonly unknown[]
}

export const useScrollableOverflow = ({
  isEnabled,
  viewportRef,
  contentRef,
  dependencies = [],
}: UseScrollableOverflowOptions) => {
  const [hasMoreBelow, setHasMoreBelow] = useState(false)

  useEffect(() => {
    if (!isEnabled) {
      setHasMoreBelow(false)
      return
    }

    const viewport = viewportRef.current
    const content = contentRef?.current

    if (!viewport) {
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
  }, [contentRef, isEnabled, viewportRef, ...dependencies])

  return { hasMoreBelow }
}
