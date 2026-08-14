import { GithubSupplementaryCards } from '@components/about/github/GithubSupplementaryCards'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

const labels = {
  current: 'Current streak',
  longest: 'Longest streak',
  activeDays: 'Active days',
  contributions: 'Contributions',
  days: 'days',
}

describe('GithubSupplementaryCards', () => {
  it('renders streak stats when contribution data is available', () => {
    render(
      <GithubSupplementaryCards
        streakTitle="Streak Snapshot"
        streakUnavailableText="Unavailable"
        labels={labels}
        stats={{
          currentStreak: 3,
          longestStreak: 9,
          activeDays: 42,
          totalContributions: 120,
        }}
      />,
    )

    expect(screen.getByText('Current streak')).toBeInTheDocument()
    expect(screen.getByText('3 days')).toBeInTheDocument()
    expect(screen.queryByText('Unavailable')).not.toBeInTheDocument()
  })

  it('renders the fallback when contribution data is unavailable', () => {
    render(
      <GithubSupplementaryCards
        streakTitle="Streak Snapshot"
        streakUnavailableText="Unavailable"
        labels={labels}
        stats={null}
      />,
    )

    expect(screen.getByText('Unavailable')).toBeInTheDocument()
  })
})
