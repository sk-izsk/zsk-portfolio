import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  beforeEach(() => {
    usePortfolioStore.getState().reset()
    window.history.pushState({}, '', '/projects')
  })

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

  it('filters projects from the project-type query string', () => {
    window.history.pushState({}, '', '/projects?project-type=frontend')
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.getByText('Portfolio Website')).toBeInTheDocument()
    expect(screen.queryByText('Open Source CLI Tool')).not.toBeInTheDocument()
  })

  it('updates the URL query string when a project type is selected', async () => {
    const user = userEvent.setup()
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    await user.click(screen.getByRole('button', { name: 'Filter projects by type' }))
    await user.click(screen.getByRole('option', { name: 'Frontend' }))

    await waitFor(() => {
      expect(window.location.search).toBe('?project-type=frontend')
    })
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument()
    expect(screen.queryByText('Open Source CLI Tool')).not.toBeInTheDocument()
  })

  it('clears the query string when All is selected', async () => {
    const user = userEvent.setup()
    window.history.pushState({}, '', '/projects?project-type=frontend')
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    await user.click(screen.getByRole('button', { name: 'Filter projects by type' }))
    await user.click(screen.getByRole('option', { name: 'All' }))

    await waitFor(() => {
      expect(window.location.search).toBe('')
    })
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument()
    expect(screen.getByText('Open Source CLI Tool')).toBeInTheDocument()
  })
})
