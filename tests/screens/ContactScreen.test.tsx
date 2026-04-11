import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import ContactScreen from '@screens/ContactScreen'
import { usePortfolioStore } from '@stores/portfolioStore'
import { AllProviders } from '@tests/helpers/AllProviders'
import { mockPortfolioData } from '@tests/helpers/mockPortfolioData'

const renderScreen = () =>
  render(
    <AllProviders>
      <ContactScreen />
    </AllProviders>,
  )

describe('ContactScreen', () => {
  beforeEach(() => usePortfolioStore.getState().reset())

  it('renders loading state', () => {
    usePortfolioStore.getState().setLoading(true)
    renderScreen()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    usePortfolioStore.getState().setError('error')
    renderScreen()

    expect(screen.getByText('Error loading data')).toBeInTheDocument()
  })

  it('renders the contact section element', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    const { container } = renderScreen()

    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  it('shows phone number when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.getByText(mockPortfolioData.contact.phone)).toBeInTheDocument()
  })

  it('shows email address when data is loaded', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.getByText(mockPortfolioData.contact.email)).toBeInTheDocument()
  })

  it('shows a contact form with input fields', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0)
  })

  it('allows typing in the contact form fields', async () => {
    const user = userEvent.setup()
    usePortfolioStore.getState().setData(mockPortfolioData)
    renderScreen()

    // Find the name input (first text input)
    const inputs = screen.getAllByRole('textbox')
    const nameInput = inputs[0]!

    await user.type(nameInput, 'Alice')
    expect(nameInput).toHaveValue('Alice')
  })
})
