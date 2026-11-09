import { STORY_CARD_RADIUS, storyCardQuery, storyPageDim } from '@components/story/story.css'
import { getStoryPages } from '@utils/storyScroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

// A page dims as the next one covers it, then stops being painted once it is fully hidden.
export const useStoryCovering = (storyRef: RefObject<HTMLDivElement | null>) => {
  useLayoutEffect(() => {
    const story = storyRef.current

    if (!story) {
      return
    }

    const media = gsap.matchMedia()

    media.add(storyCardQuery, () => {
      const pages = getStoryPages(story)

      // The rounded top is for a page that is rising. Once it docks at the top of the screen the
      // corners would only show the background behind it, so they straighten as it arrives.
      pages.slice(1).forEach((page) => {
        gsap.fromTo(
          page.firstElementChild,
          { borderTopLeftRadius: STORY_CARD_RADIUS, borderTopRightRadius: STORY_CARD_RADIUS },
          {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            ease: 'none',
            scrollTrigger: { trigger: page, start: 'top 35%', end: 'top top', scrub: true },
          },
        )
      })

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
