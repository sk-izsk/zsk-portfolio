import { createEvent, fireEvent, render, screen } from '@testing-library/react'
import { ContentProtectionProvider } from '@components/ContentProtectionProvider'

const renderSubject = (enabled: boolean) => {
  render(
    <ContentProtectionProvider enabled={enabled}>
      <div data-content-protected="true">
        <p>Protected text</p>
      </div>
      <div>
        <p>Open text</p>
      </div>
      <div data-content-protected="true">
        <input aria-label="Name" defaultValue="Allowed input" />
      </div>
    </ContentProtectionProvider>,
  )
}

describe('ContentProtectionProvider', () => {
  it('does not block context menu when disabled', () => {
    renderSubject(false)

    const protectedText = screen.getByText('Protected text')
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true })

    protectedText.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(false)
  })

  it('blocks context menu inside protected content when enabled', () => {
    renderSubject(true)

    const protectedText = screen.getByText('Protected text')
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true })

    protectedText.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  it('allows context menu outside protected content', () => {
    renderSubject(true)

    const openText = screen.getByText('Open text')
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true })

    openText.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(false)
  })

  it('blocks copy shortcuts inside protected content', () => {
    renderSubject(true)

    const protectedText = screen.getByText('Protected text')
    const selection = window.getSelection()
    const range = document.createRange()

    range.selectNodeContents(protectedText)
    selection?.removeAllRanges()
    selection?.addRange(range)
    const event = createEvent.keyDown(protectedText, { key: 'c', ctrlKey: true })

    fireEvent(protectedText, event)

    expect(event.defaultPrevented).toBe(true)
  })

  it('allows copying from editable controls inside protected content', () => {
    renderSubject(true)

    const input = screen.getByLabelText('Name')
    const event = new Event('copy', { bubbles: true, cancelable: true })

    input.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(false)
  })

  it('blocks common devtools shortcuts inside protected content', () => {
    renderSubject(true)

    const protectedText = screen.getByText('Protected text')
    const event = createEvent.keyDown(protectedText, { key: 'I', ctrlKey: true, shiftKey: true })

    fireEvent(protectedText, event)

    expect(event.defaultPrevented).toBe(true)
  })

  it('blocks Mac inspector shortcuts inside protected content', () => {
    renderSubject(true)

    const protectedText = screen.getByText('Protected text')
    const event = createEvent.keyDown(protectedText, { key: 'i', metaKey: true, altKey: true })

    fireEvent(protectedText, event)

    expect(event.defaultPrevented).toBe(true)
  })
})
