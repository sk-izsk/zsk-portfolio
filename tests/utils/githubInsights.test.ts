import { describe, expect, it } from 'vitest'
import { buildContributionInsights } from '@utils/githubInsights'

const year = (days: Array<[string, number]>) => ({
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  days: days.map(([date, contributionCount]) => ({ date, contributionCount })),
})

describe('buildContributionInsights', () => {
  it('finds the busiest month and weekday, the best day and the average per active day', () => {
    const insights = buildContributionInsights(
      year([
        ['2026-03-03', 4], // Tuesday
        ['2026-03-10', 6], // Tuesday
        ['2026-05-08', 9], // Friday
        ['2026-05-09', 0],
      ]),
      'en-US',
    )

    expect(insights).toEqual({
      busiestMonth: { label: 'March', count: 10 },
      busiestWeekday: { label: 'Tuesday', count: 10 },
      bestDay: { label: 'May 8', count: 9 },
      averagePerActiveDay: 6.3,
    })
  })

  it('names months and days in the reader’s language', () => {
    const insights = buildContributionInsights(year([['2026-03-03', 2]]), 'fr-FR')

    expect(insights?.busiestMonth.label).toBe('mars')
    expect(insights?.busiestWeekday.label).toBe('mardi')
  })

  it('returns null for a year with no contributions', () => {
    expect(buildContributionInsights(year([['2026-01-01', 0]]), 'en-US')).toBeNull()
  })
})
