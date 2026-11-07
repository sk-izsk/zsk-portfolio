import { StoryPage } from '@components/story/StoryPage'
import { render, screen } from '@testing-library/react'
import { AllProviders } from '@tests/helpers/AllProviders'
import { lazy } from 'react'
import { describe, expect, it, vi } from 'vitest'

describe('StoryPage', () => {
  it('keeps a page that fails to load from taking down the pages around it', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const Broken = lazy(() => Promise.reject(new Error('Loading chunk failed')))

    render(
      <AllProviders>
        <StoryPage page={Broken} isLoaded={true} />
        <StoryPage page={() => <p>Next page</p>} isLoaded={true} />
      </AllProviders>,
    )

    expect(await screen.findByText(/could not load/i)).toBeInTheDocument()
    expect(screen.getByText('Next page')).toBeInTheDocument()

    consoleError.mockRestore()
  })
})
