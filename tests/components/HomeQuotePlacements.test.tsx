import { HomeQuotePlacements } from '@components/home/HomeQuotePlacements'
import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { QuoteItem } from '@utils/githubHighlights'

const { useRandomDeveloperQuote } = vi.hoisted(() => ({
  useRandomDeveloperQuote: vi.fn(),
}))

vi.mock('@hooks/useRandomDeveloperQuote', () => ({
  useRandomDeveloperQuote,
}))

describe('HomeQuotePlacements', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('renders the current query quote', () => {
    const quote: QuoteItem = {
      text: 'Talk is cheap. Show me the code.',
      author: 'Linus Torvalds',
    }
    useRandomDeveloperQuote.mockReturnValue({
      data: quote,
    })

    render(<HomeQuotePlacements />)

    expect(screen.getByText(/Talk is cheap\. Show me the code\./)).toBeInTheDocument()
    expect(screen.getByText(/Linus Torvalds/)).toBeInTheDocument()
  })

  it('renders nothing while the remote quote catalog is still loading', () => {
    useRandomDeveloperQuote.mockReturnValue({
      data: undefined,
      isError: false,
    })

    const { container } = render(<HomeQuotePlacements />)

    expect(container).toBeEmptyDOMElement()
  })

  it('keeps a local fallback quote when query data is unavailable because the request failed', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    useRandomDeveloperQuote.mockReturnValue({
      data: undefined,
      isError: true,
    })

    render(<HomeQuotePlacements />)

    expect(
      screen.getByText((_, element) =>
        element?.tagName === 'P' &&
        (element.textContent?.includes('Simplicity is prerequisite for reliability.') ?? false),
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(/Edsger W\. Dijkstra/)).toBeInTheDocument()
  })
})
