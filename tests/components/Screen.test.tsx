import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Screen } from '../../src/components/Screen'

describe('Screen', () => {
  it('renders children when not loading and no error', () => {
    render(
      <Screen sectionId="test" isLoading={false} isError={false}>
        <p>Content loaded</p>
      </Screen>,
    )

    expect(screen.getByText('Content loaded')).toBeInTheDocument()
  })

  it('renders loading message when isLoading is true', () => {
    render(
      <Screen sectionId="test" isLoading={true} isError={false} loadingMessage="Please wait...">
        <p>Should not show</p>
      </Screen>,
    )

    expect(screen.getByText('Please wait...')).toBeInTheDocument()
    expect(screen.queryByText('Should not show')).not.toBeInTheDocument()
  })

  it('renders default loading message', () => {
    render(
      <Screen sectionId="test" isLoading={true} isError={false}>
        <p>Hidden</p>
      </Screen>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error message when isError is true', () => {
    render(
      <Screen sectionId="test" isLoading={false} isError={true} errorMessage="Something went wrong">
        <p>Hidden</p>
      </Screen>,
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('renders a title heading when title prop is provided', () => {
    render(
      <Screen sectionId="about" isLoading={false} isError={false} title="About Me">
        <p>Content</p>
      </Screen>,
    )

    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument()
  })

  it('renders the section with the correct id', () => {
    const { container } = render(
      <Screen sectionId="portfolio" isLoading={false} isError={false}>
        <p>Content</p>
      </Screen>,
    )

    expect(container.querySelector('#portfolio')).toBeInTheDocument()
  })

  it('loading state has the loading CSS class', () => {
    const { container } = render(
      <Screen sectionId="test" isLoading={true} isError={false}>
        <p>Hidden</p>
      </Screen>,
    )

    expect(container.querySelector('.screen-state--loading')).toBeInTheDocument()
  })

  it('error state has the error CSS class', () => {
    const { container } = render(
      <Screen sectionId="test" isLoading={false} isError={true}>
        <p>Hidden</p>
      </Screen>,
    )

    expect(container.querySelector('.screen-state--error')).toBeInTheDocument()
  })
})
