import { storyCardQuery, storyPageDim } from '@components/story/story.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

const REFRESH_DELAY_MS = 200
const REVEAL_LINE = '0px 0px -15% 0px'

export const useStoryMotion = (storyRef: RefObject<HTMLDivElement | null>) => {
  // Pages stick when their end reaches the bottom of the screen, which depends on their height.
  useEffect(() => {
    const story = storyRef.current

    if (!story) {
      return
    }

    const pages = Array.from(story.children) as HTMLElement[]
    let refreshTimer = 0

    const measure = () => {
      pages.forEach((page) => {
        page.style.setProperty(
          '--stick-top',
          `${Math.min(0, window.innerHeight - page.offsetHeight)}px`,
        )
      })
      window.clearTimeout(refreshTimer)
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), REFRESH_DELAY_MS)
    }

    const resizes = new ResizeObserver(measure)
    pages.forEach((page) => resizes.observe(page))
    window.addEventListener('resize', measure, { passive: true })

    return () => {
      window.clearTimeout(refreshTimer)
      resizes.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [storyRef])

  useEffect(() => {
    const story = storyRef.current

    if (!story) {
      return
    }

    const pagesToReveal = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-seen', '')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: REVEAL_LINE },
    )

    Array.from(story.children).forEach((page) => pagesToReveal.observe(page))

    return () => pagesToReveal.disconnect()
  }, [storyRef])

  // A page dims as the next one covers it, then stops being painted once it is fully hidden.
  useLayoutEffect(() => {
    const story = storyRef.current

    if (!story) {
      return
    }

    const media = gsap.matchMedia()

    media.add(storyCardQuery, () => {
      const pages = Array.from(story.children) as HTMLElement[]

      pages.slice(0, -1).forEach((page, index) => {
        const nextPage = pages[index + 1]

        gsap.to(page.querySelector(`.${storyPageDim}`), {
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: nextPage, start: 'top bottom', end: 'top top', scrub: true },
        })

        ScrollTrigger.create({
          trigger: nextPage,
          start: 'top top',
          end: 'max',
          onToggle: ({ isActive }) => {
            page.style.visibility = isActive ? 'hidden' : ''
          },
        })
      })

      return () => {
        pages.forEach((page) => {
          page.style.visibility = ''
        })
      }
    })

    return () => media.revert()
  }, [storyRef])
}
