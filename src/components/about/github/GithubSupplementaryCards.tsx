import {
  githubStatsBottomGrid,
  githubStatsCard,
  githubStatsCardTitle,
  githubStatsFallback,
  githubStatsMedia,
} from '@components/about/about.css'
import React from 'react'

type GithubSupplementaryCardsProps = {
  streakTitle: string
  streakUnavailableText: string
}

export const GithubSupplementaryCards: React.FC<GithubSupplementaryCardsProps> = ({
  streakTitle,
  streakUnavailableText,
}) => (
  <div className={githubStatsBottomGrid}>
    <article className={githubStatsCard}>
      <h4 className={githubStatsCardTitle}>{streakTitle}</h4>
      <div className={githubStatsMedia}>
        <div className={githubStatsFallback}>{streakUnavailableText}</div>
      </div>
    </article>
  </div>
)
