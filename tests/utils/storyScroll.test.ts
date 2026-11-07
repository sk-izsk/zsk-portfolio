import { describe, expect, it } from 'vitest'
import { findActiveIndex, getPageTops, getStoryIndex } from '@utils/storyScroll'

describe('getStoryIndex', () => {
  it('finds stacked pages and treats anything else, like /home, as the first page', () => {
    expect(getStoryIndex('/about')).toBe(1)
    expect(getStoryIndex('/contact')).toBe(5)
    expect(getStoryIndex('/home')).toBe(0)
  })
})

describe('getPageTops', () => {
  it('adds up the heights above each page', () => {
    expect(getPageTops(10, [100, 200, 50])).toEqual([10, 110, 310])
  })
})

describe('findActiveIndex', () => {
  const tops = [0, 100, 300]

  it('picks the last page that starts at or above the line', () => {
    expect(findActiveIndex(tops, 0)).toBe(0)
    expect(findActiveIndex(tops, 99)).toBe(0)
    expect(findActiveIndex(tops, 100)).toBe(1)
    expect(findActiveIndex(tops, 999)).toBe(2)
  })

  it('falls back to the first page above the story', () => {
    expect(findActiveIndex(tops, -5)).toBe(0)
  })
})
