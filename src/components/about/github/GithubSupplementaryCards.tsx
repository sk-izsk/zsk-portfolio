import { githubStatsBottomGrid } from '@components/about/about.css'
import { GithubStatCard, type GithubStatCardProps } from '@components/about/github/GithubStatCard'
import React from 'react'

type GithubSupplementaryCardsProps = {
  cards: GithubStatCardProps[]
  label: string
}

// Focusable, because on phones it scrolls sideways and keyboard users must be able to reach it.
export const GithubSupplementaryCards: React.FC<GithubSupplementaryCardsProps> = ({
  cards,
  label,
}) => (
  <div className={githubStatsBottomGrid} role="region" aria-label={label} tabIndex={0}>
    {cards.map((card) => (
      <GithubStatCard key={card.title} {...card} />
    ))}
  </div>
)
