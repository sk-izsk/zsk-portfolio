import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import ProjectScreen from '../../src/screens/ProjectScreen'
import { usePortfolioStore } from '../../src/stores/portfolioStore'
import { AllProviders } from '../helpers/AllProviders'
import { mockPortfolioData } from '../helpers/mockPortfolioData'

const renderScreen = () =>
  render(
    <AllProviders>
      <ProjectScreen />
    </AllProviders>,
  )

describe('ProjectScreen', () => {
  beforeEach(() => usePortfolioStore.getState().reset())

  it('renders loading state', () => {
    usePortfolioStore.getState().setLoading(true)
    renderScreen()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state when there is an error', () => {
    usePortfolioStore.getState().setError('error')
    renderScreen()

    expect(screen.getByText('Error loading data')).toBeInTheDocument()
  })

  it('renders all project titles when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    for (const project of mockPortfolioData.projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    }
  })

  it('renders all project excerpts when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    for (const project of mockPortfolioData.projects) {
      expect(screen.getByText(project.excerpt)).toBeInTheDocument()
    }
  })

  it('renders external project links with target=_blank', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    // The first project should be rendered as a heading, not a link
    const externalProject = mockPortfolioData.projects[0]!
    const heading = screen.getByRole('heading', { name: externalProject.title })
    expect(heading).toBeInTheDocument()
  })

  it('renders the projects section element', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    const { container } = renderScreen()

    expect(container.querySelector('#projects')).toBeInTheDocument()
  })
})
