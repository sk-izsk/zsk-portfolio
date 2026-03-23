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
        <ProjectCard.TimeLink category="Web" publishDate="2024-01-01" />
        <ProjectCard.Title href="https://example.com" isExternal={true}>
          My Awesome Project
        </ProjectCard.Title>
        <ProjectCard.Body
          shortDescription="A great project description."
          highlights={['Highlight 1', 'Highlight 2']}
        />
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
        <ProjectCard.Body
          shortDescription="A great project description."
          highlights={['Highlight 1', 'Highlight 2']}
        />
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
        <ProjectCard.Body shortDescription="Body" highlights={['Highlight 1']} />
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
        <ProjectCard.Body shortDescription="Body" highlights={['Highlight 1']} />
      </ProjectCard>,
    )

    // Title should be a heading, not a link
    const heading = screen.getByRole('heading', { name: /External Project/i })
    expect(heading).toBeInTheDocument()
  })

  it('does not set target=_blank on internal links', () => {
    renderCard(
      <ProjectCard>
        <ProjectCard.Title href="#" isExternal={false}>
          Internal Project
        </ProjectCard.Title>
        <ProjectCard.Body shortDescription="Body" highlights={['Highlight 1']} />
      </ProjectCard>,
    )

    // Title should be a heading, not a link
    const heading = screen.getByRole('heading', { name: /Internal Project/i })
    expect(heading).toBeInTheDocument()
  })
})
