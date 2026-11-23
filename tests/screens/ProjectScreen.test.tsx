import ProjectScreen from '@screens/ProjectScreen'
import { usePortfolioStore } from '@stores/portfolioStore'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AllProviders } from '@tests/helpers/AllProviders'
import { mockPortfolioData } from '@tests/helpers/mockPortfolioData'
import { beforeEach, describe, expect, it } from 'vitest'

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

  it('matches projects by any project type tag in the array', () => {
    window.history.pushState({}, '', '/projects?project-type=backend')
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

  it('filters open source projects from a direct URL', () => {
    window.history.pushState({}, '', '/projects?project-type=open-source')
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.getByText('Open Source CLI Tool')).toBeInTheDocument()
    expect(screen.queryByText('Portfolio Website')).not.toBeInTheDocument()
  })

  it('selects Open Source and restores all projects when cleared', async () => {
    const user = userEvent.setup()
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    await user.click(screen.getByRole('button', { name: 'Filter projects by type' }))
    await user.click(screen.getByRole('option', { name: 'Open Source' }))

    await waitFor(() => {
      expect(window.location.search).toBe('?project-type=open-source')
    })
    expect(screen.getByText('Open Source CLI Tool')).toBeInTheDocument()
    expect(screen.queryByText('Portfolio Website')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Filter projects by type' }))
    await user.click(screen.getByRole('option', { name: 'All' }))

    await waitFor(() => {
      expect(window.location.search).toBe('')
    })
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument()
    expect(screen.getByText('Open Source CLI Tool')).toBeInTheDocument()
  })

  it('combines the open source type with tag filters', () => {
    window.history.pushState({}, '', '/projects?project-type=open-source&project-tags=typescript')
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.queryByText('Open Source CLI Tool')).not.toBeInTheDocument()
    expect(screen.queryByText('Portfolio Website')).not.toBeInTheDocument()
    expect(screen.getByText('No projects match your search.')).toBeInTheDocument()
  })

  it('keeps full descriptions behind Read More', async () => {
    const user = userEvent.setup()
    const project = {
      ...mockPortfolioData.projects[0]!,
      excerpt: 'A short card summary.',
      shortDescription: 'Detailed project explanation for the modal.',
    }
    usePortfolioStore.getState().setData({ ...mockPortfolioData, projects: [project] })
    renderScreen()

    expect(screen.getByText(project.excerpt)).toBeInTheDocument()
    expect(screen.queryByText(project.shortDescription)).not.toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Read More...' }))

    expect(screen.getByText(project.shortDescription)).toBeInTheDocument()
  })
})
