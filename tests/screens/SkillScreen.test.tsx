import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import SkillScreen from '../../src/screens/SkillScreen'
import { usePortfolioStore } from '../../src/stores/portfolioStore'
import { AllProviders } from '../helpers/AllProviders'
import { mockPortfolioData } from '../helpers/mockPortfolioData'

const renderScreen = () =>
  render(
    <AllProviders>
      <SkillScreen />
    </AllProviders>,
  )

describe('SkillScreen', () => {
  beforeEach(() => usePortfolioStore.getState().reset())

  it('renders loading state', () => {
    usePortfolioStore.getState().setLoading(true)
    renderScreen()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    usePortfolioStore.getState().setError('error')
    renderScreen()

    expect(screen.getByText('Error loading data')).toBeInTheDocument()
  })

  it('renders the portfolio section element', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    const { container } = renderScreen()

    expect(container.querySelector('#portfolio')).toBeInTheDocument()
  })

  it('renders skill names with their levels when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    // Use getAllByText because a skill name may also appear in the tag section
    for (const skill of mockPortfolioData.skills.technical) {
      expect(screen.getAllByText(skill.name).length).toBeGreaterThan(0)
    }
  })

  it('renders skill percentage values for displayed categories', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    // SkillsRateSection only renders frontend/backend/language/tools — not 'testing'
    const renderedCategories = new Set(['frontend', 'backend', 'language', 'tools'])
    for (const skill of mockPortfolioData.skills.technical) {
      if (renderedCategories.has(skill.category)) {
        expect(screen.getByText(`${skill.level}%`)).toBeInTheDocument()
      }
    }
  })

  it('renders skill tag categories', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    // Some tag names (e.g. 'React') also appear in the rate section, use getAllByText
    for (const tag of mockPortfolioData.skills.categories.frontend) {
      expect(screen.getAllByText(tag).length).toBeGreaterThan(0)
    }
  })
})
