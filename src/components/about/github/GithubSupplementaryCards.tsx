import {
  githubQuoteAuthor,
  githubQuoteBox,
  githubQuoteText,
  githubStatsBottomGrid,
  githubStatsCard,
  githubStatsCardTitle,
  githubStatsImage,
  githubStatsMedia,
} from '@components/about/about.css'
import type { QuoteItem } from '@utils/githubHighlights'
import React from 'react'

type GithubSupplementaryCardsProps = {
  streakTitle: string
  streakAlt: string
  streakStatsUrl: string
  quoteTitle: string
  quote: QuoteItem
}

export const GithubSupplementaryCards: React.FC<GithubSupplementaryCardsProps> = ({
  streakTitle,
  streakAlt,
  streakStatsUrl,
  quoteTitle,
  quote,
}) => (
  <div className={githubStatsBottomGrid}>
    <article className={githubStatsCard}>
      <h4 className={githubStatsCardTitle}>{streakTitle}</h4>
      <div className={githubStatsMedia}>
        <img
          src={streakStatsUrl}
          alt={streakAlt}
          loading="lazy"
          decoding="async"
          className={githubStatsImage}
        />
      </div>
    </article>
    <article className={githubStatsCard}>
      <h4 className={githubStatsCardTitle}>{quoteTitle}</h4>
      <div className={githubQuoteBox}>
        <p className={githubQuoteText}>&ldquo;{quote.text}&rdquo;</p>
        <p className={githubQuoteAuthor}>- {quote.author}</p>
      </div>
    </article>
  </div>
)
