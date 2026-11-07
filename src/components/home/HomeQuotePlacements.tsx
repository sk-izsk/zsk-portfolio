import React, { useLayoutEffect, useRef } from 'react'
import {
  homeQuoteAuthor,
  homeQuoteAuthorHighlight,
  homeQuoteBottom,
  homeQuoteBottomBody,
  homeQuoteChar,
  homeQuoteMark,
  homeQuoteRain,
  homeQuoteSrOnly,
  homeQuoteText,
} from '@components/home/home.css'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { useRandomDeveloperQuote } from '@hooks/useRandomDeveloperQuote'
import { useQuoteRainStore } from '@stores/quoteRainStore'
import { createMatrixRain } from '@utils/matrixRain'

export const HomeQuotePlacements: React.FC = () => {
  const quoteQuery = useRandomDeveloperQuote()
  const phase = useQuoteRainStore((state) => state.phase)
  const canAnimate = useMediaQuery('(prefers-reduced-motion: no-preference)')
  const textRef = useRef<HTMLParagraphElement>(null)
  const quote = quoteQuery.data
  const text = quote?.text

  // The quotes rotate, so each new one gets its own rain.
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
  }, [text, phase, canAnimate])

  if (!quote) {
    return null
  }

  return (
    <div className={homeQuoteBottom}>
      <div className={homeQuoteBottomBody}>
        <p ref={textRef} className={homeQuoteText}>
          <span className={homeQuoteMark} aria-hidden="true">
            &ldquo;
          </span>{' '}
          {/* Screen readers would otherwise spell out the letters the rain needs as spans. */}
          <span className={homeQuoteSrOnly}>{quote.text}</span>
          <span aria-hidden="true">
            {quote.text.split(' ').map((word, wordIndex) => (
              // Words repeat and the list never reorders, so the position is the identity.
              <React.Fragment key={`${word}-${wordIndex}`}>
                {word.split('').map((char, charIndex) => (
                  <span key={charIndex} className={homeQuoteChar}>
                    {char}
                  </span>
                ))}{' '}
              </React.Fragment>
            ))}
          </span>
          <span className={homeQuoteMark} aria-hidden="true">
            &rdquo;
          </span>
        </p>
        <div className={homeQuoteAuthor}>
          <span className={homeQuoteAuthorHighlight}>- {quote.author}</span>
        </div>
      </div>
    </div>
  )
}
