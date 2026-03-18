import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { Sidebar } from '../../src/components/sidebar/Sidebar'
import { usePortfolioStore } from '../../src/stores/portfolioStore'
import { useSidebarStore } from '../../src/stores/sidebarStore'
import { AllProviders } from '../helpers/AllProviders'
import { mockPortfolioData } from '../helpers/mockPortfolioData'

const renderSidebar = () =>
  render(
    <AllProviders>
      <Sidebar />
    </AllProviders>,
  )

describe('Sidebar', () => {
  beforeEach(() => {
    usePortfolioStore.getState().reset()
    useSidebarStore.setState({ isOpen: false })
  })

  it('renders all navigation links', () => {
    renderSidebar()

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /skills/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('shows a logo text derived from the personal name when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderSidebar()

    // getLogoText() takes the second word of the name and title-cases it
    // 'John Doe' -> 'Doe' -> renders as '<span>D</span>oe'
    const secondWord = mockPortfolioData.personalInfo.name.split(' ')[1]!.toLowerCase()
    // The slice after the first character ('oe') is a standalone text node
    expect(screen.getByText(secondWord.slice(1))).toBeInTheDocument()
  })

  it('toggles sidebar open/close when the hamburger button is clicked', async () => {
    const user = userEvent.setup()
    const { container } = renderSidebar()

    // The nav toggler is a div element (not a button)
    const toggler = container.querySelector('[class*="navToggler"]')!
    await user.click(toggler)

    expect(useSidebarStore.getState().isOpen).toBe(true)

    await user.click(toggler)
    expect(useSidebarStore.getState().isOpen).toBe(false)
  })

  it('renders language switcher buttons', () => {
    renderSidebar()

    // Language buttons render lowercase labels from the translation config
    expect(screen.getByText('en')).toBeInTheDocument()
    expect(screen.getByText('fr')).toBeInTheDocument()
  })
})
