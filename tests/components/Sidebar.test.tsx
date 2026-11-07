import { Sidebar } from '@components/sidebar/Sidebar'
import { useSidebarStore } from '@stores/sidebarStore'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AllProviders } from '@tests/helpers/AllProviders'
import { beforeEach, describe, expect, it } from 'vitest'

const renderSidebar = () =>
  render(
    <AllProviders>
      <Sidebar />
    </AllProviders>,
  )

describe('Sidebar', () => {
  beforeEach(() => {
    useSidebarStore.setState({ isCollapsed: false })
  })

  it('links every page and marks the current one, trailing slash included', () => {
    window.history.pushState({}, '', '/about/')
    renderSidebar()

    for (const name of ['Home', 'About', 'Services', 'Skills', 'Projects', 'Blog', 'Contact']) {
      expect(screen.getByRole('link', { name })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
    window.history.pushState({}, '', '/')
  })

  it('collapses to its icons from the button at the bottom, and expands again', async () => {
    const user = userEvent.setup()
    const { container } = renderSidebar()

    await user.click(screen.getByRole('button', { name: /collapse sidebar/i }))

    expect(screen.getByRole('button', { name: /expand sidebar/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(container.querySelector('[data-collapsed]')).not.toBeNull()
    expect(useSidebarStore.getState().isCollapsed).toBe(true)

    await user.click(screen.getByRole('button', { name: /expand sidebar/i }))

    expect(container.querySelector('[data-collapsed]')).toBeNull()
  })

  it('switches the language from EN | FR under the name', async () => {
    const user = userEvent.setup()
    renderSidebar()

    expect(screen.getByRole('button', { name: 'en' })).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'fr' }))
    expect(screen.getByRole('button', { name: 'fr' })).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'en' }))
    expect(screen.getByRole('button', { name: 'en' })).toHaveAttribute('aria-pressed', 'true')
  })
})
