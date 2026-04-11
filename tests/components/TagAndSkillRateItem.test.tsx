import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SkillRateItem } from '@components/skills/SkillRateItem'
import { Tag } from '@components/tag/Tag'

describe('Tag', () => {
  it('renders the label text', () => {
    render(<Tag label="React" />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders as a span element', () => {
    const { container } = render(<Tag label="TypeScript" />)
    expect(container.querySelector('span')).toBeInTheDocument()
  })
})

describe('SkillRateItem', () => {
  it('renders the skill name', () => {
    render(<SkillRateItem name="React" level={90} />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders the skill level as a percentage', () => {
    render(<SkillRateItem name="React" level={85} />)
    expect(screen.getByText('85%')).toBeInTheDocument()
  })

  it('sets the progress bar width to the correct percentage', () => {
    const { container } = render(<SkillRateItem name="Node.js" level={70} />)
    const progressBar = container.querySelector('[style*="width: 70%"]')
    expect(progressBar).toBeInTheDocument()
  })
})
