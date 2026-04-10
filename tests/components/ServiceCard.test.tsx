import { render, screen } from '@testing-library/react'
import { Code } from 'lucide-react'
import { describe, expect, it } from 'vitest'
import { ServiceCard } from '../../src/components/services/ServiceCard'

describe('ServiceCard', () => {
  it('renders the title', () => {
    render(
      <ServiceCard>
        <ServiceCard.Icon icon={Code} />
        <ServiceCard.Title>Web Development</ServiceCard.Title>
        <ServiceCard.Body>We build modern web applications.</ServiceCard.Body>
      </ServiceCard>,
    )

    expect(screen.getByText('Web Development')).toBeInTheDocument()
  })

  it('renders the body text', () => {
    render(
      <ServiceCard>
        <ServiceCard.Icon icon={Code} />
        <ServiceCard.Title>Web Development</ServiceCard.Title>
        <ServiceCard.Body>We build modern web applications.</ServiceCard.Body>
      </ServiceCard>,
    )

    expect(screen.getByText('We build modern web applications.')).toBeInTheDocument()
  })

  it('renders an SVG icon', () => {
    const { container } = render(
      <ServiceCard>
        <ServiceCard.Icon icon={Code} />
        <ServiceCard.Title>Web Development</ServiceCard.Title>
        <ServiceCard.Body>Description</ServiceCard.Body>
      </ServiceCard>,
    )

    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
