import { useMediaQuery } from '@hooks/useMediaQuery'
import { useState } from 'react'

const PHONE_QUERY = '(max-width: 767px)'

// Long lists would bury the pages after them, so they start short with a way to see the rest.
export const usePreview = <Item>(items: Item[], phoneCount: number, wideCount = items.length) => {
  const isPhone = useMediaQuery(PHONE_QUERY)
  const [isShowingAll, setIsShowingAll] = useState(false)
  const count = isPhone ? phoneCount : wideCount

  return {
    visibleItems: isShowingAll ? items : items.slice(0, count),
    hasMore: !isShowingAll && items.length > count,
    showAll: () => setIsShowingAll(true),
  }
}
