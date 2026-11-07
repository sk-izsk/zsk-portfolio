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
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

const FRAME_GAP = 16
const STAGE_INSET = 48
// Leaves the floating top bar clear when the brackets open to the edges of the stage.
const STAGE_TOP_INSET = 96

type Frame = Pick<DOMRect, 'left' | 'top' | 'right' | 'bottom'>

const translation = (element: Element, axis: 'x' | 'y') => Number(gsap.getProperty(element, axis))

// Rests are measured without the bracket's own transform, so these stay correct on refresh mid scroll.
const startCornerTo = (bracket: Element, getFrame: () => Frame) => ({
  x: () =>
    getFrame().left -
    FRAME_GAP -
    (bracket.getBoundingClientRect().left - translation(bracket, 'x')),
  y: () =>
    getFrame().top - FRAME_GAP - (bracket.getBoundingClientRect().top - translation(bracket, 'y')),
})

const endCornerTo = (bracket: Element, getFrame: () => Frame) => ({
  x: () =>
    getFrame().right +
    FRAME_GAP -
    (bracket.getBoundingClientRect().right - translation(bracket, 'x')),
  y: () =>
    getFrame().bottom +
    FRAME_GAP -
    (bracket.getBoundingClientRect().bottom - translation(bracket, 'y')),
})

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
      const headlineFrame = (): Frame => {
        const { left, top, right, bottom } = headline.getBoundingClientRect()
        const y = translation(headline, 'y')

        return { left, right, top: top - y, bottom: bottom - y }
      }

      const stageFrame = (): Frame => {
        const { left, top, right, bottom } = stage.getBoundingClientRect()
        const inset = STAGE_INSET + FRAME_GAP

        return {
          left: left + inset,
          top: top + STAGE_TOP_INSET + FRAME_GAP,
          right: right - inset,
          bottom: bottom - inset,
        }
      }

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
        .to(bracketStart, { ...startCornerTo(bracketStart, headlineFrame), duration: 1 }, 0)
        .to(bracketEnd, { ...endCornerTo(bracketEnd, headlineFrame), duration: 1 }, 0)
        .to(headline, { autoAlpha: 0, y: -32, duration: 0.7 }, 1.4)
        .to(bracketStart, { ...startCornerTo(bracketStart, stageFrame), duration: 1 }, 1.4)
        .to(bracketEnd, { ...endCornerTo(bracketEnd, stageFrame), duration: 1 }, 1.4)
        .set(shelf, { autoAlpha: 1 }, 1.8)
        .fromTo(words, { opacity: 0.25 }, { opacity: 1, stagger: 0.08, duration: 0.3 }, 1.9)
        .fromTo(quote, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .to({}, { duration: 0.6 })

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
