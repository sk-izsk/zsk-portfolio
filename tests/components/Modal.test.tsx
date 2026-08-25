import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Modal } from '@components/common/modal/Modal'

describe('Modal', () => {
  it('renders children when open', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Title>Test Title</Modal.Title>
        <Modal.Body>Test Body</Modal.Body>
        <Modal.Description>Test Description</Modal.Description>
        <Modal.Highlights>
          <li>Highlight 1</li>
        </Modal.Highlights>
        <Modal.Footer onClose={() => {}} />
      </Modal>,
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Body')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Highlight 1')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('does not render when open is false', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <Modal.Title>Should Not Render</Modal.Title>
      </Modal>,
    )
    expect(screen.queryByText('Should Not Render')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose}>
        <Modal.Title>Test</Modal.Title>
        <Modal.Footer onClose={onClose} />
      </Modal>,
    )
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalled()
  })

  it('renders project link button if link is provided', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Title>Test</Modal.Title>
        <Modal.Footer link="https://example.com" onClose={() => {}} />
      </Modal>,
    )
    expect(screen.getByRole('link', { name: /project/i })).toBeInTheDocument()
  })

  it('shows a scroll cue when modal body has more content below', async () => {
    const clientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    const scrollHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight')
    const scrollTop = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTop')
    const scrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo')
    const scrollToMock = vi.fn()
    let scrollTopValue = 0

    Object.defineProperties(HTMLElement.prototype, {
      clientHeight: { configurable: true, get: () => 100 },
      scrollHeight: { configurable: true, get: () => 250 },
      scrollTop: {
        configurable: true,
        get: () => scrollTopValue,
        set: (value) => {
          scrollTopValue = value
        },
      },
      scrollTo: { configurable: true, value: scrollToMock },
    })

    try {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Title>Test</Modal.Title>
          <Modal.Body>Long Body</Modal.Body>
          <Modal.Footer onClose={() => {}} />
        </Modal>,
      )

      const scrollCue = await screen.findByRole('button', { name: 'Scroll for more modal content' })
      await waitFor(() => expect(scrollCue).toHaveAttribute('data-visible', 'true'))
      expect(scrollCue).toHaveAttribute('data-visible', 'true')

      fireEvent.click(scrollCue)
      expect(scrollToMock).toHaveBeenCalledWith({ top: 70, behavior: 'smooth' })
    } finally {
      for (const [property, descriptor] of Object.entries({
        clientHeight,
        scrollHeight,
        scrollTop,
        scrollTo,
      })) {
        if (descriptor) {
          Object.defineProperty(HTMLElement.prototype, property, descriptor)
        } else {
          Reflect.deleteProperty(HTMLElement.prototype, property)
        }
      }
    }
  })
})
