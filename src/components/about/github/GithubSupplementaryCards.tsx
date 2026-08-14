import {
  githubStatsBottomGrid,
  githubStatsCard,
  githubStatsCardTitle,
  githubStatsFallback,
  githubStatsMedia,
  githubStreakGrid,
  githubStreakLabel,
  githubStreakMetric,
  githubStreakValue,
} from '@components/about/about.css'
import type { ContributionStreakStats } from '@utils/githubHighlights'
import React from 'react'

type GithubSupplementaryCardsProps = {
  streakTitle: string
  streakUnavailableText: string
  stats: ContributionStreakStats | null
  labels: {
    current: string
    longest: string
    activeDays: string
    contributions: string
    days: string
  }
}

export const GithubSupplementaryCards: React.FC<GithubSupplementaryCardsProps> = ({
  streakTitle,
  streakUnavailableText,
  stats,
  labels,
}) => (
  <div className={githubStatsBottomGrid}>
    <article className={githubStatsCard}>
      <h4 className={githubStatsCardTitle}>{streakTitle}</h4>
      <div className={githubStatsMedia}>
        {stats ? (
          <dl className={githubStreakGrid}>
            <div className={githubStreakMetric}>
              <dt className={githubStreakLabel}>{labels.current}</dt>
              <dd className={githubStreakValue}>
                {stats.currentStreak} {labels.days}
              </dd>
            </div>
            <div className={githubStreakMetric}>
              <dt className={githubStreakLabel}>{labels.longest}</dt>
              <dd className={githubStreakValue}>
                {stats.longestStreak} {labels.days}
              </dd>
            </div>
            <div className={githubStreakMetric}>
              <dt className={githubStreakLabel}>{labels.activeDays}</dt>
              <dd className={githubStreakValue}>{stats.activeDays}</dd>
            </div>
            <div className={githubStreakMetric}>
              <dt className={githubStreakLabel}>{labels.contributions}</dt>
              <dd className={githubStreakValue}>{stats.totalContributions}</dd>
            </div>
          </dl>
        ) : (
          <div className={githubStatsFallback}>{streakUnavailableText}</div>
        )}
      </div>
    </article>
  </div>
)
