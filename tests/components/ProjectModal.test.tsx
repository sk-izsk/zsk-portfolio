import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ProjectModal } from '../../src/components/common/ProjectModal'
import { AllProviders } from '../helpers/AllProviders'

const mockProject = {
  id: 1,
  title: 'Test Project',
  url: 'https://example.com',
  excerpt: 'Excerpt',
  shortDescription: 'Short description',
  highlights: ['Highlight 1', 'Highlight 2'],
  category: 'Web',
  tags: ['React'],
  publishDate: '2024-01-01',
}

describe('ProjectModal', () => {
  it('renders when open', () => {
    render(
      <AllProviders>
        <ProjectModal open project={mockProject} onClose={vi.fn()}>
          <ProjectModal.Title>Title</ProjectModal.Title>
          <ProjectModal.Body>Body</ProjectModal.Body>
          <ProjectModal.Description>Description</ProjectModal.Description>
          <ProjectModal.Highlights>
            <li>Highlight 1</li>
            <li>Highlight 2</li>
          </ProjectModal.Highlights>
          <ProjectModal.Footer link="https://example.com" onClose={vi.fn()} />
        </ProjectModal>
      </AllProviders>,
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Highlight 1')).toBeInTheDocument()
    expect(screen.getByText('Highlight 2')).toBeInTheDocument()
  })

  it('does not render when not open', () => {
    const { container } = render(
      <AllProviders>
        <ProjectModal open={false} project={mockProject} onClose={vi.fn()}>
          <ProjectModal.Title>Title</ProjectModal.Title>
        </ProjectModal>
      </AllProviders>,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    render(
      <AllProviders>
        <ProjectModal open project={mockProject} onClose={onClose}>
          <ProjectModal.Title>Title</ProjectModal.Title>
        </ProjectModal>
      </AllProviders>,
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when clicking outside modal', () => {
    const onClose = vi.fn()
    render(
      <AllProviders>
        <ProjectModal open project={mockProject} onClose={onClose}>
          <ProjectModal.Title>Title</ProjectModal.Title>
        </ProjectModal>
      </AllProviders>,
    )
    fireEvent.mouseDown(document.body)
    expect(onClose).toHaveBeenCalled()
  })

  it('renders footer buttons and calls onClose', () => {
    const onClose = vi.fn()
    render(
      <AllProviders>
        <ProjectModal open project={mockProject} onClose={onClose}>
          <ProjectModal.Footer link="https://example.com" onClose={onClose} />
        </ProjectModal>
      </AllProviders>,
    )
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /project link/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalled()
  })
})
