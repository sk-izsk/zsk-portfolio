import {
  flowSceneQuery,
  homeActions,
  homeBracketEnd,
  homeBracketStart,
  homeEyebrow,
  homeHeadline,
  homeImg,
  homeImgImg,
  homeInfoP,
  homeQuoteShelf,
  homeScrollCue,
  homeShelfQuote,
  homeTaglineWord,
  pinnedSceneQuery,
} from '@components/home/home.css'
import { HOME_SCENE_BEATS } from '@utils/storyFrame'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useHomeScrollScene = (
  sceneRef: RefObject<HTMLDivElement | null>,
  // Text changes move the headline, so the scene rebuilds per language.
  contentKey: string | null,
) => {
  useLayoutEffect(() => {
    const scene = sceneRef.current

    if (!scene || !contentKey) {
      return
    }

    const find = (className: string) => scene.querySelector(`.${className}`)
    const bracketStart = find(homeBracketStart)
    const bracketEnd = find(homeBracketEnd)
    const headline = find(homeHeadline)
    const shelf = find(homeQuoteShelf)
    const stage = scene.firstElementChild

    if (!bracketStart || !bracketEnd || !headline || !shelf || !stage) {
      return
    }

    const words = scene.querySelectorAll(`.${homeTaglineWord}`)
    const quote = find(homeShelfQuote)
    const media = gsap.matchMedia()

    media.add(pinnedSceneQuery, () => {
      gsap
        .timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        .to(find(homeScrollCue), { autoAlpha: 0, duration: 0.3 }, 0)
        .to(find(homeImgImg), { autoAlpha: 0, scale: 0.96, duration: 1 }, 0)
        .to(
          [find(homeEyebrow), find(homeInfoP), find(homeActions)],
          { autoAlpha: 0, y: -24, stagger: 0.08, duration: 0.7 },
          0,
        )
        .to(headline, { autoAlpha: 0, y: -32, duration: 0.7 }, HOME_SCENE_BEATS.headlineLeave)
        .set(shelf, { autoAlpha: 1 }, 1.8)
        .fromTo(
          words,
          { opacity: 0.25 },
          { opacity: 1, stagger: { amount: 1.1 }, duration: 0.2 },
          1.9,
        )
        .fromTo(quote, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 3.3)
        // Fixes the length, so the frame's stops stay in time with these beats.
        .to({}, { duration: 0.001 }, HOME_SCENE_BEATS.length)

      gsap.set(shelf, { autoAlpha: 0 })
    })

    media.add(flowSceneQuery, () => {
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: find(homeImg),
            start: 'top 80%',
            end: 'bottom 30%',
            scrub: 0.6,
          },
        })
        .fromTo(bracketStart, { x: -16, y: -16 }, { x: 16, y: 16 }, 0)
        .fromTo(bracketEnd, { x: 16, y: 16 }, { x: -16, y: -16 }, 0)

      gsap.fromTo(
        words,
        { opacity: 0.25 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: shelf,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.6,
          },
        },
      )
    })

    let isCurrent = true

    void document.fonts?.ready.then(() => {
      if (isCurrent) {
        ScrollTrigger.refresh()
      }
    })

    return () => {
      isCurrent = false
      media.revert()
    }
  }, [sceneRef, contentKey])
}
