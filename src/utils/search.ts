interface Searchable {
  title: string
  shortDescription: string
  category: string
  tags: string[]
}

// Lowercased text per item, built once. Items are memoized upstream, so the cache stays warm
// across keystrokes and drops entries when the data reloads.
const haystacks = new WeakMap<Searchable, string>()

const toHaystack = (item: Searchable) => {
  let haystack = haystacks.get(item)
  if (haystack === undefined) {
    haystack = [item.title, item.shortDescription, item.category, ...item.tags]
      .join(' ')
      .toLowerCase()
    haystacks.set(item, haystack)
  }
  return haystack
}

// Every word in the query has to appear somewhere in the item, in any order.
export const filterBySearch = <T extends Searchable>(items: T[], query: string): T[] => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) {
    return items
  }

  return items.filter((item) => {
    const haystack = toHaystack(item)
    return terms.every((term) => haystack.includes(term))
  })
}
