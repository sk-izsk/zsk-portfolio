import React, { useEffect, useMemo, useState } from 'react'
import {
  homeQuoteAuthor,
  homeQuoteAuthorHighlight,
  homeQuoteBottom,
  homeQuoteBottomBody,
  homeQuoteHighlight,
  homeQuoteText,
} from '@components/home/home.css'
import { DEV_QUOTES } from '@utils/githubHighlights'

const ROTATE_INTERVAL_MS = 5600

const HIGHLIGHT_BY_TEXT: Record<string, string> = {
  'Simplicity is prerequisite for reliability.': 'Simplicity',
  'Programs must be written for people to read, and only incidentally for machines to execute.':
    'for people to read',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.':
    'humans can understand',
  'The most disastrous thing that you can ever learn is your first programming language.':
    'first programming language',
  'First, solve the problem. Then, write the code.': 'solve the problem',
}

const renderHighlightedQuote = (text: string) => {
  const highlight = HIGHLIGHT_BY_TEXT[text]

  if (!highlight || !text.includes(highlight)) {
    return text
  }

  const [before, after] = text.split(highlight)

  return (
    <>
      {before}
      <span className={homeQuoteHighlight}>{highlight}</span>
      {after}
    </>
  )
}

export const HomeQuotePlacements: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(2 % DEV_QUOTES.length)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % DEV_QUOTES.length)
    }, ROTATE_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [])

  const quote = DEV_QUOTES[quoteIndex] ?? DEV_QUOTES[0]
  const renderedQuote = useMemo(() => renderHighlightedQuote(quote.text), [quote.text])

  return (
    <div className={homeQuoteBottom}>
      <div className={homeQuoteBottomBody}>
        <p className={homeQuoteText}>&ldquo;{renderedQuote}&rdquo;</p>
        <div className={homeQuoteAuthor}>
          <span className={homeQuoteAuthorHighlight}>- {quote.author}</span>
        </div>
      </div>
    </div>
  )
}
