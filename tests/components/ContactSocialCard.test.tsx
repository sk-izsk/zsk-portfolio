import { render, screen } from '@testing-library/react'
import { Mail } from 'lucide-react'
import { describe, expect, it } from 'vitest'
import { ContactSocialCard } from '@components/contact/ContactSocialCard'

describe('ContactSocialCard', () => {
  it('renders title and details', () => {
    render(<ContactSocialCard icon={Mail} title="Email" details="john@example.com" />)

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('renders as a plain div when no url is provided', () => {
    const { container } = render(
      <ContactSocialCard icon={Mail} title="Email" details="john@example.com" />,
    )

    expect(container.querySelector('a')).not.toBeInTheDocument()
  })

  it('renders as an anchor tag when a url is provided', () => {
    render(
      <ContactSocialCard
        icon={Mail}
        title="Email"
        details="john@example.com"
        url="mailto:john@example.com"
      />,
    )

    expect(screen.getByRole('link')).toHaveAttribute('href', 'mailto:john@example.com')
  })

  it('opens external URLs in a new tab', () => {
    render(
      <ContactSocialCard
        icon={Mail}
        title="GitHub"
        details="github.com/johndoe"
        url="https://github.com/johndoe"
      />,
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does NOT open internal/mailto URLs in a new tab', () => {
    render(
      <ContactSocialCard
        icon={Mail}
        title="Email"
        details="john@example.com"
        url="mailto:john@example.com"
      />,
    )

    const link = screen.getByRole('link')
    expect(link).not.toHaveAttribute('target', '_blank')
  })
})
