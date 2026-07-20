import { RichText } from '@components/common/richText/RichText'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('RichText', () => {
  it('renders inline code from backticks', () => {
    render(<RichText content="Use `map` for transforms." variant="inline" />)

    expect(screen.getByText('map')).toContainHTML('<code')
    expect(screen.getByText(/Use/i)).toBeInTheDocument()
  })

  it('renders fenced code blocks', () => {
    render(<RichText content={'Before\n\n```js\nconst x = 1\n```\n\nAfter'} />)

    expect(screen.getByText('Before')).toBeInTheDocument()
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
    expect(screen.getByText('const x = 1').closest('pre')).toBeInTheDocument()
    expect(screen.getByText('After')).toBeInTheDocument()
  })
})
