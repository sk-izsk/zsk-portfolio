import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { HomeDetailBio } from '../../src/components/home/HomeDetailBio'
import { HomeDownloadCv } from '../../src/components/home/HomeDownloadCv'
import { usePortfolioStore } from '../../src/stores/portfolioStore'
import { AllProviders } from '../helpers/AllProviders'
import { mockPortfolioData } from '../helpers/mockPortfolioData'

describe('HomeDetailBio', () => {
  beforeEach(() => usePortfolioStore.getState().reset())

  it('renders nothing when portfolio data is not loaded', () => {
    const { container } = render(
      <AllProviders>
        <HomeDetailBio />
      </AllProviders>,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders the bio text when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)

    render(
      <AllProviders>
        <HomeDetailBio />
      </AllProviders>,
    )

    expect(screen.getByText(mockPortfolioData.personalInfo.bio)).toBeInTheDocument()
  })
})

describe('HomeDownloadCv', () => {
  beforeEach(() => usePortfolioStore.getState().reset())

  it('renders nothing when portfolio data is not loaded', () => {
    const { container } = render(
      <AllProviders>
        <HomeDownloadCv />
      </AllProviders>,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders a link to the resume when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)

    render(
      <AllProviders>
        <HomeDownloadCv />
      </AllProviders>,
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', mockPortfolioData.personalInfo.resume_link)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
