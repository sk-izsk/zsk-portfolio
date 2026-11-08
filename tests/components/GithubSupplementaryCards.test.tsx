import { GithubSupplementaryCards } from '@components/about/github/GithubSupplementaryCards'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('GithubSupplementaryCards', () => {
  it('renders each card with its figures and optional details', () => {
    render(
      <GithubSupplementaryCards
        cards={[
          {
            title: 'Streak Snapshot',
            unavailableText: 'Streak unavailable',
            metrics: [{ label: 'Current streak', value: '3 days' }],
          },
          {
            title: 'Activity Insights',
            unavailableText: 'Insights unavailable',
            metrics: [{ label: 'Busiest month', value: 'March', detail: '92 contributions' }],
          },
        ]}
      />,
    )

    const insights = screen.getByRole('heading', { name: 'Activity Insights' }).closest('article')!
    expect(screen.getByText('3 days')).toBeInTheDocument()
    expect(within(insights).getByText('March')).toBeInTheDocument()
    expect(within(insights).getByText('92 contributions')).toBeInTheDocument()
  })

  it('shows a card’s fallback when it has no figures', () => {
    render(
      <GithubSupplementaryCards
        cards={[
          { title: 'Activity Insights', unavailableText: 'Insights unavailable', metrics: null },
        ]}
      />,
    )

    expect(screen.getByText('Insights unavailable')).toBeInTheDocument()
  })
})
