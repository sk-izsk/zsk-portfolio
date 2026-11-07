import { AskAiWidget } from '@components/askAi/AskAiWidget'
import { useAskAiWidgetStore } from '@stores/askAiWidgetStore'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AllProviders } from '@tests/helpers/AllProviders'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@services/api', () => ({
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
