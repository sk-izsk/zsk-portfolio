import React, { useState } from 'react'
import {
  homeQuoteAuthor,
  homeQuoteAuthorHighlight,
  homeQuoteBottom,
  homeQuoteBottomBody,
  homeQuoteMark,
  homeQuoteText,
} from '@components/home/home.css'
import { useRandomDeveloperQuote } from '@hooks/useRandomDeveloperQuote'
import { DEV_QUOTES } from '@utils/githubHighlights'

const getRandomFallbackQuote = () => DEV_QUOTES[Math.floor(Math.random() * DEV_QUOTES.length)] ?? DEV_QUOTES[0]

export const HomeQuotePlacements: React.FC = () => {
  const [fallbackQuote] = useState(getRandomFallbackQuote)
  const quoteQuery = useRandomDeveloperQuote()

  if (!quoteQuery.data && !quoteQuery.isError) {
    return null
  }

  const quote = quoteQuery.data ?? fallbackQuote

  return (
    <div className={homeQuoteBottom}>
      <div className={homeQuoteBottomBody}>
        <p className={homeQuoteText}>
          <span className={homeQuoteMark} aria-hidden="true">
            &ldquo;
          </span>{' '}
          {quote.text}{' '}
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
