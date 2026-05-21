import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import AboutScreen from '@screens/AboutScreen'
import { usePortfolioStore } from '@stores/portfolioStore'
import { AllProviders } from '@tests/helpers/AllProviders'
import { mockPortfolioData } from '@tests/helpers/mockPortfolioData'

const renderScreen = () =>
  render(
    <AllProviders>
      <AboutScreen />
    </AllProviders>,
  )

describe('AboutScreen', () => {
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

  it('renders the About section with title when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    // Section title heading rendered
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders the about section element with correct id', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    const { container } = renderScreen()

    expect(container.querySelector('#about')).toBeInTheDocument()
  })

  it('shows personal info (city) when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.getByText(mockPortfolioData.personalInfo.location.city)).toBeInTheDocument()
  })

  it('shows the contact email when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.getByText(mockPortfolioData.contact.email)).toBeInTheDocument()
  })

  it('shows the GitHub activity block when GitHub data is available', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.getByText('Code activity and dev signals')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View Profile' })).toHaveAttribute(
      'href',
      mockPortfolioData.contact.social.github.url,
    )
  })
})
