import {
  githubStatsBottomGrid,
  githubStatsCard,
  githubStatsCardTitle,
  githubStatsImage,
  githubStatsMedia,
} from '@components/about/about.css'
import React from 'react'

type GithubSupplementaryCardsProps = {
  streakTitle: string
  streakAlt: string
  streakStatsUrl: string
}

export const GithubSupplementaryCards: React.FC<GithubSupplementaryCardsProps> = ({
  streakTitle,
  streakAlt,
  streakStatsUrl,
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
  </div>
)
