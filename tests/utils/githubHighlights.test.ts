import { buildContributionStreakStats, type ContributionYearData } from '@utils/githubHighlights'
import { describe, expect, it } from 'vitest'

describe('buildContributionStreakStats', () => {
  it('summarizes current and longest streaks from contribution days', () => {
    const yearData: ContributionYearData = {
      startDate: '2026-01-01',
      endDate: '2026-01-07',
      days: [
        { date: '2026-01-01', contributionCount: 1 },
        { date: '2026-01-02', contributionCount: 2 },
        { date: '2026-01-03', contributionCount: 0 },
        { date: '2026-01-04', contributionCount: 3 },
        { date: '2026-01-05', contributionCount: 4 },
        { date: '2026-01-06', contributionCount: 1 },
        { date: '2026-01-07', contributionCount: 0 },
      ],
    }

    expect(buildContributionStreakStats(yearData, new Date('2026-01-06T12:00:00Z'))).toEqual({
      currentStreak: 3,
      longestStreak: 3,
      activeDays: 5,
      totalContributions: 11,
    })
  })
})
