import { useLayoutEffect, type RefObject } from 'react'

// Slides the glass lens under the current link. The labels' widths change with the language.
export const useNavLens = (
  navRef: RefObject<HTMLElement | null>,
  lensRef: RefObject<HTMLElement | null>,
  activeId: string,
  contentKey: string,
) => {
  useLayoutEffect(() => {
    const nav = navRef.current
    const lens = lensRef.current

    if (!nav || !lens) {
      return
    }

    const place = () => {
      const active = nav.querySelector<HTMLElement>('[aria-current="page"]')

      lens.style.opacity = active ? '1' : '0'

      if (active) {
        lens.style.width = `${active.offsetWidth}px`
        lens.style.transform = `translateX(${active.offsetLeft}px)`
      }
    }

    place()
    window.addEventListener('resize', place, { passive: true })
    void document.fonts?.ready.then(place)

    return () => window.removeEventListener('resize', place)
  }, [navRef, lensRef, activeId, contentKey])
}
