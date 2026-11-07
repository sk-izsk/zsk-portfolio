import { homeQuoteChar, homeQuoteRain } from '@components/home/home.css'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { useQuoteRainStore } from '@stores/quoteRainStore'
import { createMatrixRain } from '@utils/matrixRain'
import { MOTION_QUERY } from '@utils/motion'
import { useLayoutEffect, type RefObject } from 'react'

// The quotes rotate, so each new one gets its own rain.
export const useQuoteRain = (textRef: RefObject<HTMLElement | null>, text: string | undefined) => {
  const phase = useQuoteRainStore((state) => state.phase)
  const canAnimate = useMediaQuery(MOTION_QUERY)

  useLayoutEffect(() => {
    const element = textRef.current

    if (!element || !canAnimate || phase === 'resting') {
      return
    }

    const chars = Array.from(element.querySelectorAll<HTMLElement>(`.${homeQuoteChar}`))
    const rain = createMatrixRain(element, chars, homeQuoteRain)

    rain.reset()

    if (phase === 'raining') {
      rain.play()
    }

    return () => rain.destroy()
  }, [textRef, text, phase, canAnimate])
}
