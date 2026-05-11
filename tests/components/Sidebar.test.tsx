import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { Sidebar } from '@components/sidebar/Sidebar'
import { usePortfolioStore } from '@stores/portfolioStore'
import { useSidebarStore } from '@stores/sidebarStore'
import { AllProviders } from '@tests/helpers/AllProviders'
import { mockPortfolioData } from '@tests/helpers/mockPortfolioData'

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

  it('opens from the hamburger button and closes from the backdrop', async () => {
    const user = userEvent.setup()
    renderSidebar()

    const toggler = screen.getByRole('button', { name: /open navigation/i })
    await user.click(toggler)

    expect(useSidebarStore.getState().isOpen).toBe(true)

    const backdrop = screen.getByRole('button', { name: /close navigation/i })
    await user.click(backdrop)

    expect(useSidebarStore.getState().isOpen).toBe(false)
  })

  it('renders language switcher buttons', () => {
    renderSidebar()

    // Language buttons render lowercase labels from the translation config
    expect(screen.getByText('en')).toBeInTheDocument()
    expect(screen.getByText('fr')).toBeInTheDocument()
  })
})
