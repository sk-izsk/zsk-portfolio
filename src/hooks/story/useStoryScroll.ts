import { useStoryDeepLink } from '@hooks/story/useStoryDeepLink'
import { useStoryLinkGlide } from '@hooks/story/useStoryLinkGlide'
import { useStoryLinkSync } from '@hooks/story/useStoryLinkSync'
import { getStoryIndex } from '@utils/storyScroll'
import { useCallback, useRef, type RefObject } from 'react'

/**
 * Keeps the address bar and the scroll position in step:
 * scrolling updates the link in place, and following a link glides to its page.
 */
export const useStoryScroll = (
  storyRef: RefObject<HTMLDivElement | null>,
  isEveryPageLoaded: boolean,
) => {
  // Set while the page is moved for a link, when the scroll position must not rewrite that link.
  const isAutoScrolling = useRef(getStoryIndex(window.location.pathname) > 0)
  const setAutoScrolling = useCallback((value: boolean) => {
    isAutoScrolling.current = value
  }, [])

  useStoryDeepLink(storyRef, isEveryPageLoaded, setAutoScrolling)
  useStoryLinkGlide(storyRef, setAutoScrolling)
  useStoryLinkSync(storyRef, isAutoScrolling)
}
