import { filterBySearch } from '@utils/search'
import { describe, expect, it } from 'vitest'

const item = (title: string, tags: string[] = []) => ({
  title,
  shortDescription: 'A small app',
  category: 'Frontend',
  tags,
})

describe('filterBySearch', () => {
  const items = [item('Tubewise', ['React', 'Redis']), item('Z-Graph', ['Canvas'])]

  it('returns the same list for a blank query', () => {
    expect(filterBySearch(items, '   ')).toBe(items)
  })

  it('needs every word to match, across fields and case', () => {
    expect(filterBySearch(items, 'redis TUBE').map((i) => i.title)).toEqual(['Tubewise'])
    expect(filterBySearch(items, 'frontend canvas').map((i) => i.title)).toEqual(['Z-Graph'])
    expect(filterBySearch(items, 'redis canvas')).toEqual([])
  })
})
