import {
  githubStatsCard,
  githubStatsCardTitle,
  githubStatsFallback,
  githubStatsMedia,
  githubStreakGrid,
  githubStreakLabel,
  githubStreakMetric,
  githubStreakValue,
} from '@components/about/about.css'
import { statDetail } from '@components/about/github/githubStatCard.css'
import React from 'react'

type GithubStatMetric = {
  label: string
  value: string | number
  detail?: string
}

export type GithubStatCardProps = {
  title: string
  metrics: GithubStatMetric[] | null
  unavailableText: string
}

/** A titled 2×2 grid of figures, shared by the streak and activity insight cards. */
export const GithubStatCard: React.FC<GithubStatCardProps> = ({
  title,
  metrics,
  unavailableText,
}) => (
  <article className={githubStatsCard}>
    <h4 className={githubStatsCardTitle}>{title}</h4>
    <div className={githubStatsMedia}>
      {metrics ? (
        <dl className={githubStreakGrid}>
          {metrics.map((metric) => (
            <div key={metric.label} className={githubStreakMetric}>
              <dt className={githubStreakLabel}>{metric.label}</dt>
              <dd className={githubStreakValue}>{metric.value}</dd>
              {metric.detail ? <dd className={statDetail}>{metric.detail}</dd> : null}
            </div>
          ))}
        </dl>
      ) : (
        <div className={githubStatsFallback}>{unavailableText}</div>
      )}
    </div>
  </article>
)
