import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { House } from 'lucide-react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { SidebarNavItem } from '../../src/components/sidebar/SidebarNavItem'

const homeItem = { id: 'home', label: 'Home', icon: House, path: '/' }

const renderItem = (isActive = false, onClick = vi.fn()) =>
  render(
    <BrowserRouter>
      <ul>
        <SidebarNavItem item={homeItem} isActive={isActive} onClick={onClick} />
      </ul>
    </BrowserRouter>,
  )

describe('SidebarNavItem', () => {
  it('renders the nav item label', () => {
    renderItem()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders a link pointing to the correct path', () => {
    renderItem()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })

  it('calls onClick when the link is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderItem(false, onClick)

    await user.click(screen.getByRole('link'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders an icon (svg)', () => {
    const { container } = renderItem()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
