import { pageLoaders } from '@components/story/storyPages'
import { getStoryIndex } from '@utils/storyScroll'
import { useEffect, useState } from 'react'

const IDLE_LOAD_DELAY_MS = 600

export const useLoadStoryPages = () => {
  const [isEveryPageLoaded, setIsEveryPageLoaded] = useState(false)

  useEffect(() => {
    let isCurrent = true

    const loadPages = () => {
      // A page that fails to load is left for its lazy boundary to report when it renders.
      void Promise.allSettled(pageLoaders.map((loader) => loader())).then(() => {
        if (isCurrent) {
          setIsEveryPageLoaded(true)
        }
      })
    }

    // Home paints first. A deep link cannot wait, it needs the pages above it to find its place.
    const timerId = window.setTimeout(
      loadPages,
      getStoryIndex(window.location.pathname) > 0 ? 0 : IDLE_LOAD_DELAY_MS,
    )

    return () => {
      isCurrent = false
      window.clearTimeout(timerId)
    }
  }, [])

  return isEveryPageLoaded
}
