import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'
import { ProjectCard } from '../../src/components/projects/ProjectCard'
import { AllProviders } from '../helpers/AllProviders'

const renderCard = (ui: React.ReactElement) => render(<AllProviders>{ui}</AllProviders>)

describe('ProjectCard', () => {
  it('renders the project title', () => {
    renderCard(
      <ProjectCard>
        <ProjectCard.TimeLink
          category="Web"
          publishDate="2024-01-01"
          href="https://example.com"
          isExternal={true}
        />
        <ProjectCard.Title href="https://example.com" isExternal={true}>
          My Awesome Project
        </ProjectCard.Title>
        <ProjectCard.Body>A great project description.</ProjectCard.Body>
      </ProjectCard>,
    )

    expect(screen.getByText('My Awesome Project')).toBeInTheDocument()
  })

  it('renders the project body text', () => {
    renderCard(
      <ProjectCard>
        <ProjectCard.Title href="#" isExternal={false}>
          Title
        </ProjectCard.Title>
        <ProjectCard.Body>A great project description.</ProjectCard.Body>
      </ProjectCard>,
    )

    expect(screen.getByText('A great project description.')).toBeInTheDocument()
  })

  it('renders tags', () => {
    renderCard(
      <ProjectCard>
        <ProjectCard.Title href="#" isExternal={false}>
          Title
        </ProjectCard.Title>
        <ProjectCard.Body>Body</ProjectCard.Body>
        <ProjectCard.Tags projectId={1} tags={['React', 'TypeScript']} />
      </ProjectCard>,
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders nothing for Tags when tags array is empty', () => {
    const { container } = renderCard(
      <ProjectCard>
        <ProjectCard.Title href="#" isExternal={false}>
          Title
        </ProjectCard.Title>
        <ProjectCard.Tags projectId={1} tags={[]} />
      </ProjectCard>,
    )

    // No tag elements rendered
    expect(container.querySelectorAll('.tag, [class*="tag"]').length).toBe(0)
  })

  it('sets target=_blank on external title links', () => {
    renderCard(
      <ProjectCard>
        <ProjectCard.Title href="https://example.com" isExternal={true}>
          External Project
        </ProjectCard.Title>
        <ProjectCard.Body>Body</ProjectCard.Body>
      </ProjectCard>,
    )

    const link = screen.getByRole('link', { name: /External Project/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does not set target=_blank on internal links', () => {
    renderCard(
      <ProjectCard>
        <ProjectCard.Title href="#" isExternal={false}>
          Internal Project
        </ProjectCard.Title>
        <ProjectCard.Body>Body</ProjectCard.Body>
      </ProjectCard>,
    )

    const link = screen.getByRole('link', { name: /Internal Project/i })
    expect(link).not.toHaveAttribute('target')
  })
})
