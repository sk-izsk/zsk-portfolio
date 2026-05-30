import React from 'react'
import {
  homeQuoteAuthor,
  homeQuoteAuthorHighlight,
  homeQuoteBottom,
  homeQuoteBottomBody,
  homeQuoteMark,
  homeQuoteText,
} from '@components/home/home.css'
import { useRandomDeveloperQuote } from '@hooks/useRandomDeveloperQuote'

export const HomeQuotePlacements: React.FC = () => {
  const quoteQuery = useRandomDeveloperQuote()

  if (!quoteQuery.data) {
    return null
  }

  const quote = quoteQuery.data

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
