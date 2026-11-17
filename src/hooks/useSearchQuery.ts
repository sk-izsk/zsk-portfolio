import { useHandleParams } from './useHandleParams'

type SearchKey = 'projectSearch' | 'blogSearch'

// Kept in the URL so the search survives reloads, back/forward and shared links. Each page has
// its own key: every story page renders at once, so a shared key would filter (and shrink) the
// other page too and shift the scroll.
export const useSearchQuery = (key: SearchKey): [string, (value: string) => void] => {
  const { currentParams, updateParams } = useHandleParams<Record<SearchKey, string>>()

  return [currentParams[key] ?? '', (value: string) => updateParams({ [key]: value })]
}
