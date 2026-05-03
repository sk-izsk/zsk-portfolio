import { TagMultiSelectPicker, type TagPickerOption } from '@components/tagPicker/TagMultiSelectPicker'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

class ResizeObserverMock {
  observe() {}
  disconnect() {}
  unobserve() {}
}

const options: TagPickerOption[] = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fetch', label: 'Fetch' },
  { value: 'axios', label: 'Axios' },
  { value: 'ky', label: 'Ky' },
]

const renderPicker = ({
  selectedValues = [],
  resolveOptionByQuery,
}: {
  selectedValues?: string[]
  resolveOptionByQuery?: (query: string) => Promise<TagPickerOption | null>
} = {}) => {
  const onChange = vi.fn()

  render(
    <TagMultiSelectPicker
      options={options}
      selectedValues={selectedValues}
      onChange={onChange}
      placeholder="Search tags"
      ariaLabel="Filter posts by tag"
      emptyLabel="No matching tags found."
      resolveOptionByQuery={resolveOptionByQuery}
    />,
  )

  return { onChange }
}

describe('TagMultiSelectPicker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.ResizeObserver = ResizeObserverMock as typeof ResizeObserver
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  it('adds tags and keeps selected items indicated', async () => {
    const user = userEvent.setup()
    const { onChange } = renderPicker()

    await user.click(screen.getByRole('button', { name: 'Filter posts by tag' }))
    await user.click(screen.getByRole('option', { name: /React/i }))

    expect(onChange).toHaveBeenCalledWith(['react'])
  })

  it('keeps search input inside open panel only', async () => {
    const user = userEvent.setup()
    renderPicker()

    expect(screen.queryByRole('textbox', { name: 'Filter posts by tag' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Filter posts by tag' }))

    expect(screen.getByRole('textbox', { name: 'Filter posts by tag' })).toBeInTheDocument()
  })

  it('removes a selected chip', async () => {
    const user = userEvent.setup()
    const { onChange } = renderPicker({ selectedValues: ['react'] })

    await user.click(screen.getByRole('button', { name: /Remove React/i }))

    expect(onChange).toHaveBeenCalledWith([])
  })

  it('shows at most three visible chips in closed state', () => {
    renderPicker({
      selectedValues: ['axios', 'backend', 'fetch', 'frontend'],
    })

    expect(screen.getByText('Axios')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Fetch')).toBeInTheDocument()
    expect(screen.getByText('+1')).toBeInTheDocument()
    expect(screen.queryByText('Frontend')).not.toBeInTheDocument()
  })

  it('disables new additions after five selected tags', async () => {
    const user = userEvent.setup()
    const { onChange } = renderPicker({
      selectedValues: ['axios', 'backend', 'fetch', 'frontend', 'react'],
    })

    await user.click(screen.getByRole('button', { name: 'Filter posts by tag' }))
    await user.click(screen.getByRole('option', { name: /TypeScript/i }))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('can surface exact remote tag lookup results', async () => {
    const user = userEvent.setup()
    const { onChange } = renderPicker({
      resolveOptionByQuery: vi.fn().mockResolvedValue({
        value: 'nodejs',
        label: 'Node.js',
      }),
    })

    await user.click(screen.getByRole('button', { name: 'Filter posts by tag' }))
    await user.type(screen.getByRole('textbox', { name: 'Filter posts by tag' }), 'nodejs')

    await waitFor(() => expect(screen.getByRole('option', { name: /Node\.js/i })).toBeInTheDocument())

    await user.click(screen.getByRole('option', { name: /Node\.js/i }))

    expect(onChange).toHaveBeenCalledWith(['nodejs'])
  })

  it('marks selected options with a check icon while keeping them visible', async () => {
    const user = userEvent.setup()
    renderPicker({ selectedValues: ['react'] })

    await user.click(screen.getByRole('button', { name: 'Filter posts by tag' }))

    const option = screen.getByRole('option', { name: /React/i })
    expect(option).toHaveAttribute('aria-selected', 'true')
    expect(option.querySelector('svg')).not.toBeNull()
  })

  it('shows scroll cue only when content overflows', async () => {
    const user = userEvent.setup()
    renderPicker()

    await user.click(screen.getByRole('button', { name: 'Filter posts by tag' }))

    const listbox = screen.getByRole('listbox', { name: 'Filter posts by tag' })
    Object.defineProperties(listbox, {
      clientHeight: {
        configurable: true,
        get: () => 220,
      },
      scrollHeight: {
        configurable: true,
        get: () => 440,
      },
      scrollTop: {
        configurable: true,
        get: () => 0,
      },
    })
    fireEvent.scroll(listbox)

    const scrollCue = screen.getByRole('button', { name: 'Scroll for more tags' })
    await waitFor(() => expect(scrollCue).toHaveAttribute('data-visible', 'true'))
  })
})
