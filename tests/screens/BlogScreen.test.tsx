import BlogScreen from '@screens/BlogScreen'
import { usePortfolioStore } from '@stores/portfolioStore'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AllProviders } from '@tests/helpers/AllProviders'
import { mockPortfolioData } from '@tests/helpers/mockPortfolioData'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@hooks/useAnalytics', () => ({
  useAnalytics: vi.fn(),
}))

const renderScreen = () =>
  render(
    <AllProviders>
      <BlogScreen />
    </AllProviders>,
  )

describe('BlogScreen', () => {
  beforeEach(() => {
    usePortfolioStore.getState().reset()
    window.history.pushState({}, '', '/blog')
  })

  it('renders loading state', () => {
    usePortfolioStore.getState().setLoading(true)
    renderScreen()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state when there is an error', () => {
    usePortfolioStore.getState().setError('error')
    renderScreen()

    expect(screen.getByText('Could not load blog posts right now.')).toBeInTheDocument()
  })

  it('renders all blog titles when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    for (const post of mockPortfolioData.blog) {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    }
  })

  it('renders all blog excerpts when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    for (const post of mockPortfolioData.blog) {
      expect(screen.getByText(post.excerpt)).toBeInTheDocument()
    }
  })

  it('renders the blog section element', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    const { container } = renderScreen()

    expect(container.querySelector('#blog')).toBeInTheDocument()
  })

  it('filters posts from the blog-type query string', () => {
    window.history.pushState({}, '', '/blog?blog-type=state-management')
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(
      screen.getByText('Context vs Redux Toolkit vs Zustand: Picking the Right State Tool for the Job'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText('I Ditched Axios for Ky And My Dependabot Finally Stopped Screaming'),
    ).not.toBeInTheDocument()
  })

  it('shows posts that match any selected tag', () => {
    window.history.pushState({}, '', '/blog?blog-tags=ky,zustand')
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(
      screen.getByText('I Ditched Axios for Ky And My Dependabot Finally Stopped Screaming'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Context vs Redux Toolkit vs Zustand: Picking the Right State Tool for the Job'),
    ).toBeInTheDocument()
  })

  it('updates the URL query string when a blog category is selected', async () => {
    const user = userEvent.setup()
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    await user.click(screen.getByRole('button', { name: 'Filter blog posts by category' }))
    await user.click(screen.getByRole('option', { name: 'State Management' }))

    await waitFor(() => {
      expect(window.location.search).toBe('?blog-type=state-management')
    })
  })

  it('opens the modal and exposes the article link from the footer', async () => {
    const user = userEvent.setup()
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    await user.click(screen.getAllByRole('link', { name: 'Read More...' })[0]!)

    expect(
      screen.getByText(
        "A production-minded comparison of React Context, Redux Toolkit, and Zustand, focused on re-render behavior, boilerplate, team scaling, and the tradeoffs that matter months after launch.",
      ),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Read article' })).toHaveAttribute(
      'href',
      'https://izsk.hashnode.dev/context-vs-redux-toolkit-vs-zustand-picking-the-right-state-tool-for-the-job',
    )
  })
})
