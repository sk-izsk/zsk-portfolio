import {
  githubContributionDayLabel,
  githubContributionDays,
  githubContributionFrame,
  githubContributionGraph,
  githubContributionImage,
  githubContributionLegend,
  githubContributionLegendSwatch,
  githubContributionLegendSwatches,
  githubContributionLoading,
  githubContributionMonthLabel,
  githubContributionMonths,
  githubContributionPanel,
  githubStatsCard,
  githubStatsCardHeader,
  githubStatsCardTitle,
  githubStatsMedia,
  githubStatsSelect,
} from '@components/about/about.css'
import { Dropdown } from '@components/common/dropdown/Dropdown'
import type { ContributionLayout } from '@utils/githubHighlights'
import React from 'react'

const toPercent = (value: number, total: number) => `${(value / total) * 100}%`

type GithubContributionPickerProps = {
  selectedYear: string
  yearOptions: string[]
  yearSelectorLabel: string
  onYearChange: (year: string) => void
}

type GithubContributionStatusProps = {
  isLoading: boolean
  hasError: boolean
  loadingText: string
  errorText: string
}

type GithubContributionGraphProps = {
  contributionLayout: ContributionLayout
  contributionGraphSvg: string
  contributionColors: string[]
  emptyCellColor: string
  isMobileGraph: boolean
}

type GithubContributionCardProps = {
  title: string
  picker: GithubContributionPickerProps
  status: GithubContributionStatusProps
  graph: GithubContributionGraphProps
}

export const GithubContributionCard: React.FC<GithubContributionCardProps> = ({
  title,
  picker,
  status,
  graph,
}) => (
  <article className={githubStatsCard}>
    <div className={githubStatsCardHeader}>
      <h4 className={githubStatsCardTitle}>{title}</h4>
      <div className={githubStatsSelect}>
        <Dropdown
          value={picker.selectedYear}
          options={picker.yearOptions.map((year) => ({
            value: year,
            label: year,
          }))}
          onChange={picker.onYearChange}
          ariaLabel={picker.yearSelectorLabel}
        />
      </div>
    </div>
    <div className={githubStatsMedia}>
      <div className={githubContributionPanel}>
        {status.isLoading ? (
          <div className={githubContributionLoading}>{status.loadingText}</div>
        ) : null}
        {status.hasError ? (
          <div className={githubContributionLoading}>{status.errorText}</div>
        ) : (
          <div
            className={githubContributionFrame}
            style={{
              width: `${graph.contributionLayout.contentWidth + (graph.isMobileGraph ? 24 : 34)}px`,
            }}
          >
            {/* Labels are placed as shares of the graph's size, so they stay on their weeks and
                days when the graph stretches to fill the card. */}
            <div className={githubContributionMonths}>
              {graph.contributionLayout.monthLabels.map((month) => (
                <span
                  key={month.key}
                  className={githubContributionMonthLabel}
                  style={{ left: toPercent(month.x, graph.contributionLayout.contentWidth) }}
                >
                  {month.label}
                </span>
              ))}
            </div>
            <div className={githubContributionGraph}>
              <div className={githubContributionDays}>
                {graph.contributionLayout.dayLabels.map((day) => (
                  <span
                    key={day.key}
                    className={githubContributionDayLabel}
                    style={{ top: toPercent(day.y, graph.contributionLayout.contentHeight) }}
                  >
                    {day.label}
                  </span>
                ))}
              </div>
              <div
                className={githubContributionImage}
                dangerouslySetInnerHTML={{ __html: graph.contributionGraphSvg }}
              />
            </div>
            <div className={githubContributionLegend}>
              <span>Less</span>
              <div className={githubContributionLegendSwatches}>
                {[graph.emptyCellColor, ...graph.contributionColors].map((shade, index) => (
                  <span
                    key={`${shade}-${index}`}
                    className={githubContributionLegendSwatch}
                    style={{ backgroundColor: shade }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        )}
      </div>
    </div>
  </article>
)
