import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { TopBar } from '@components/topBar/TopBar'
import { usePortfolioStore } from '@stores/portfolioStore'
import { useNavMenuStore } from '@stores/navMenuStore'
import { AllProviders } from '@tests/helpers/AllProviders'
import { mockPortfolioData } from '@tests/helpers/mockPortfolioData'

const renderTopBar = () =>
  render(
    <AllProviders>
      <TopBar />
    </AllProviders>,
  )

describe('TopBar', () => {
  beforeEach(() => {
    usePortfolioStore.getState().reset()
    useNavMenuStore.setState({ isOpen: false })
  })

  it('renders all navigation links', () => {
    renderTopBar()

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /skills/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('shows a logo text derived from the personal name when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderTopBar()

    // The second word of the name, 'John Doe' -> 'Doe', renders as '<span>D</span>oe'
    const secondWord = mockPortfolioData.personalInfo.name.split(' ')[1]!.toLowerCase()
    expect(screen.getByText(secondWord.slice(1))).toBeInTheDocument()
  })

  it('opens the menu panel from the menu button and closes it again', async () => {
    const user = userEvent.setup()
    renderTopBar()

    await user.click(screen.getByRole('button', { name: /open navigation/i }))
    expect(useNavMenuStore.getState().isOpen).toBe(true)

    await user.click(screen.getByRole('button', { name: /close navigation/i }))
    expect(useNavMenuStore.getState().isOpen).toBe(false)
  })

  it('marks the current page in the bar', () => {
    window.history.pushState({}, '', '/about')
    renderTopBar()

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
    window.history.pushState({}, '', '/')
  })

  it('offers the languages inside the settings panel', () => {
    renderTopBar()

    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Français' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })
})
