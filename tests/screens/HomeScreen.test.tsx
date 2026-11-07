import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import HomeScreen from '@screens/HomeScreen'
import { usePortfolioStore } from '@stores/portfolioStore'
import { AllProviders } from '@tests/helpers/AllProviders'
import { mockPortfolioData } from '@tests/helpers/mockPortfolioData'

const renderScreen = () =>
  render(
    <AllProviders>
      <HomeScreen />
    </AllProviders>,
  )

describe('HomeScreen', () => {
  beforeEach(() => usePortfolioStore.getState().reset())

  it('renders the loading message when data is loading', () => {
    usePortfolioStore.getState().setLoading(true)
    renderScreen()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders the error message on error', () => {
    usePortfolioStore.getState().setError('fetch failed')
    renderScreen()

    expect(screen.getByText('Error loading data')).toBeInTheDocument()
  })

  it('renders the bio when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.getByText(mockPortfolioData.personalInfo.bio)).toBeInTheDocument()
  })

  it('renders the download CV link with the correct href', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    const link = screen.getByRole('link', { name: 'Download CV' })
    expect(link).toHaveAttribute('href', mockPortfolioData.personalInfo.resume_link)
  })

  it('renders one page heading and a link to Ask AI', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Senior Frontend Engineer building React and TypeScript apps',
    )
    expect(screen.getByRole('link', { name: 'Ask AI about me' })).toHaveAttribute('href', '/ask-ai')
  })

  it('renders the home section element', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    const { container } = renderScreen()

    expect(container.querySelector('#home')).toBeInTheDocument()
  })
})
