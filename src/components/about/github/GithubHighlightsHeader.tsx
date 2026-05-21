import {
  githubStatsDescription,
  githubStatsEyebrow,
  githubStatsHeader,
  githubStatsLink,
  githubStatsTitle,
} from '@components/about/about.css'
import { Button } from '@components/common/button/Button'
import React from 'react'

type GithubHighlightsHeaderProps = {
  eyebrow: string
  title: string
  description: string
  profileLabel: string
  githubUrl: string
}

export const GithubHighlightsHeader: React.FC<GithubHighlightsHeaderProps> = ({
  eyebrow,
  title,
  description,
  profileLabel,
  githubUrl,
}) => (
  <div className={githubStatsHeader}>
    <div>
      <p className={githubStatsEyebrow}>{eyebrow}</p>
      <h3 className={githubStatsTitle}>{title}</h3>
      <p className={githubStatsDescription}>{description}</p>
    </div>
    <Button
      as="a"
      href={githubUrl}
      variant="secondary"
      size="small"
      className={githubStatsLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      {profileLabel}
    </Button>
  </div>
)
