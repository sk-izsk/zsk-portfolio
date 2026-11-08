import { githubStatsBottomGrid } from '@components/about/about.css'
import { GithubStatCard, type GithubStatCardProps } from '@components/about/github/GithubStatCard'
import React from 'react'

export const GithubSupplementaryCards: React.FC<{ cards: GithubStatCardProps[] }> = ({ cards }) => (
  <div className={githubStatsBottomGrid}>
    {cards.map((card) => (
      <GithubStatCard key={card.title} {...card} />
    ))}
  </div>
)
