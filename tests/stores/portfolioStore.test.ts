import { beforeEach, describe, expect, it } from 'vitest'
import { usePortfolioStore } from '@stores/portfolioStore'
import { mockPortfolioData } from '@tests/helpers/mockPortfolioData'

describe('portfolioStore', () => {
  beforeEach(() => {
    usePortfolioStore.getState().reset()
  })

  it('has the correct initial state', () => {
    const state = usePortfolioStore.getState()
    expect(state.data).toBeNull()
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('setData updates data, clears loading and error', () => {
    const { setData } = usePortfolioStore.getState()
    setData(mockPortfolioData)

    const state = usePortfolioStore.getState()
    expect(state.data).toEqual(mockPortfolioData)
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('setLoading updates loading flag', () => {
    const { setLoading } = usePortfolioStore.getState()
    setLoading(true)
    expect(usePortfolioStore.getState().loading).toBe(true)

    setLoading(false)
    expect(usePortfolioStore.getState().loading).toBe(false)
  })

  it('setError updates error, clears loading', () => {
    usePortfolioStore.getState().setLoading(true)
    usePortfolioStore.getState().setError('Network error')

    const state = usePortfolioStore.getState()
    expect(state.error).toBe('Network error')
    expect(state.loading).toBe(false)
  })

  it('reset restores initial state', () => {
    usePortfolioStore.getState().setData(mockPortfolioData)
    usePortfolioStore.getState().reset()

    const state = usePortfolioStore.getState()
    expect(state.data).toBeNull()
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })
})
