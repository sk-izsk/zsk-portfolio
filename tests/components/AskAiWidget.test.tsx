import { AskAiWidget } from '@components/askAi/AskAiWidget'
import { askAiUsageApi } from '@services/api'
import { useAskAiWidgetStore } from '@stores/askAiWidgetStore'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AllProviders } from '@tests/helpers/AllProviders'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@services/api', () => ({
  queryKeys: { askAiUsage: () => ['ask-ai-usage'] },
  askAiUsageApi: vi.fn(),
  askAiHealthApi: vi.fn().mockResolvedValue(undefined),
  askAiApi: vi.fn().mockResolvedValue({
    answer: 'He has built several React applications.',
    sources: [],
    cached: false,
    remaining: 2,
    reset_in_seconds: 0,
  }),
}))

const renderWidget = () =>
  render(
    <AllProviders>
      <AskAiWidget />
    </AllProviders>,
  )

describe('AskAiWidget', () => {
  beforeEach(() => {
    useAskAiWidgetStore.setState({ isOpen: false, hasOpened: false })
    vi.mocked(askAiUsageApi).mockReset().mockResolvedValue({
      remaining: 3,
      reset_in_seconds: 0,
      allowed: true,
    })
  })

  const openChat = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole('button', { name: 'Ask AI about me' }))
    return screen.getByRole('region', { name: 'Ask AI' })
  }

  it('shows the remaining requests from the server, and reads them from the cache on reopen', async () => {
    vi.mocked(askAiUsageApi).mockResolvedValue({
      remaining: 1,
      reset_in_seconds: 900,
      allowed: true,
    })
    const user = userEvent.setup()
    renderWidget()

    const panel = await openChat(user)
    expect(await within(panel).findByText('1')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await openChat(user)

    expect(askAiUsageApi).toHaveBeenCalledTimes(1)
  })

  it('locks the input, send button and prompts once no requests are left', async () => {
    vi.mocked(askAiUsageApi).mockResolvedValue({
      remaining: 0,
      reset_in_seconds: 3180,
      allowed: false,
    })
    const user = userEvent.setup()
    renderWidget()

    await openChat(user)

    expect(await screen.findByText(/used all your questions for this hour/i)).toHaveTextContent(
      'Resets in 53m',
    )
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'What AI projects has he built?' })).toBeDisabled()
  })

  it('updates the count from each answer without fetching again', async () => {
    const user = userEvent.setup()
    renderWidget()

    const panel = await openChat(user)
    expect(await within(panel).findByText('3')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'What AI projects has he built?' }))

    expect(await within(panel).findByText('2')).toBeInTheDocument()
    expect(askAiUsageApi).toHaveBeenCalledTimes(1)
  })

  it('opens from the button and closes with Escape', async () => {
    const user = userEvent.setup()
    renderWidget()

    await user.click(screen.getByRole('button', { name: 'Ask AI about me' }))
    expect(useAskAiWidgetStore.getState().isOpen).toBe(true)

    await user.keyboard('{Escape}')
    expect(useAskAiWidgetStore.getState().isOpen).toBe(false)
  })

  it('keeps the conversation after closing and opening again', async () => {
    const user = userEvent.setup()
    renderWidget()

    await user.click(screen.getByRole('button', { name: 'Ask AI about me' }))
    await user.click(screen.getByRole('button', { name: 'What AI projects has he built?' }))
    expect(await screen.findByText('He has built several React applications.')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await user.click(screen.getByRole('button', { name: 'Ask AI about me' }))

    expect(screen.getAllByText('What AI projects has he built?').length).toBeGreaterThan(0)
    expect(screen.getByText('He has built several React applications.')).toBeInTheDocument()
  })

  it('keeps what was typed after closing and opening again', async () => {
    const user = userEvent.setup()
    renderWidget()

    await user.click(screen.getByRole('button', { name: 'Ask AI about me' }))
    const input = screen.getByRole('textbox')
    await user.type(input, 'Tell me about React')

    await user.keyboard('{Escape}')
    await user.click(screen.getByRole('button', { name: 'Ask AI about me' }))

    expect(screen.getByRole('textbox')).toHaveValue('Tell me about React')
  })
})
