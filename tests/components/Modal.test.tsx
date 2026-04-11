import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from '../../src/components/common/modal/Modal'

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
})
