import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import ServiceScreen from '@screens/ServiceScreen'
import { usePortfolioStore } from '@stores/portfolioStore'
import { AllProviders } from '@tests/helpers/AllProviders'
import { mockPortfolioData } from '@tests/helpers/mockPortfolioData'

const renderScreen = () =>
  render(
    <AllProviders>
      <ServiceScreen />
    </AllProviders>,
  )

describe('ServiceScreen', () => {
  beforeEach(() => usePortfolioStore.getState().reset())

  it('renders loading state', () => {
    usePortfolioStore.getState().setLoading(true)
    renderScreen()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state when error is set', () => {
    usePortfolioStore.getState().setError('error')
    renderScreen()

    expect(screen.getByText('Error loading data')).toBeInTheDocument()
  })

  it('renders all service titles when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    for (const service of mockPortfolioData.services) {
      expect(screen.getByText(service.title)).toBeInTheDocument()
    }
  })

  it('renders all service descriptions when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    for (const service of mockPortfolioData.services) {
      expect(screen.getByText(service.description)).toBeInTheDocument()
    }
  })

  it('renders the service section element with correct id', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    const { container } = renderScreen()

    expect(container.querySelector('#service')).toBeInTheDocument()
  })
})
