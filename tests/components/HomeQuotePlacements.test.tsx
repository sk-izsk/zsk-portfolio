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
    })

    const { container } = render(<HomeQuotePlacements />)

    expect(container).toBeEmptyDOMElement()
  })
})
