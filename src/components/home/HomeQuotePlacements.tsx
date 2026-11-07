import React, { useRef } from 'react'
import {
  homeQuoteAuthor,
  homeQuoteAuthorHighlight,
  homeQuoteBottom,
  homeQuoteBottomBody,
  homeQuoteMark,
  homeQuoteText,
} from '@components/home/home.css'
import { HomeQuoteRainText } from '@components/home/HomeQuoteRainText'
import { useQuoteRain } from '@hooks/home/useQuoteRain'
import { useRandomDeveloperQuote } from '@hooks/useRandomDeveloperQuote'

export const HomeQuotePlacements: React.FC = () => {
  const quoteQuery = useRandomDeveloperQuote()
  const textRef = useRef<HTMLParagraphElement>(null)
  const quote = quoteQuery.data

  useQuoteRain(textRef, quote?.text)

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
          <HomeQuoteRainText text={quote.text} />
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
