import { useMediaQuery } from '@hooks/useMediaQuery'
import { fullBarQuery } from '@components/topBar/topBar.css'
import { getLensMapUrl } from '@utils/glassLens'
import { useLayoutEffect, type RefObject } from 'react'

/**
 * Fits the glass lens filter to the bar. Only Chromium can apply an SVG filter to a backdrop,
 * and only Chromium has `userAgentData`, so other browsers keep the plain frosted glass. It is
 * also left off the compact phone bar, where the extra rendering is not worth the battery.
 */
export const useGlassLens = (
  barRef: RefObject<HTMLElement | null>,
  mapRef: RefObject<SVGFEImageElement | null>,
) => {
  const isFullBar = useMediaQuery(fullBarQuery)

  useLayoutEffect(() => {
    const bar = barRef.current
    const map = mapRef.current

    if (!bar || !map || !isFullBar || !('userAgentData' in navigator)) {
      return
    }

    const fit = () => {
      const { offsetWidth: width, offsetHeight: height } = bar

      map.setAttribute('href', getLensMapUrl(width, height))
      map.setAttribute('width', String(width))
      map.setAttribute('height', String(height))
    }

    fit()
    bar.setAttribute('data-lens', '')

    const resizes = new ResizeObserver(fit)
    resizes.observe(bar)

    return () => {
      resizes.disconnect()
      bar.removeAttribute('data-lens')
    }
  }, [barRef, mapRef, isFullBar])
}
