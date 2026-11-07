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
import { useQuoteRainStore } from '@stores/quoteRainStore'
import { HOME_SCENE_BEATS } from '@utils/storyFrame'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

const QUOTE_AT = 3.4
// Lower than QUOTE_AT, so resting right on that point cannot restart the rain over and over.
const QUOTE_RESET_AT = 3.2

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
    const { setPhase } = useQuoteRainStore.getState()

    media.add(pinnedSceneQuery, () => {
      setPhase('waiting')

      const timeline = gsap
        .timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
            onLeave: () => setPhase('resting'),
            onEnterBack: () => setPhase('raining'),
          },
          onUpdate: () => {
            // The scrub keeps easing after the scene is left, and must not undo onLeave.
            if (!timeline.scrollTrigger?.isActive) {
              return
            }

            const time = timeline.time()

            if (time >= QUOTE_AT) {
              setPhase('raining')
            } else if (time < QUOTE_RESET_AT) {
              setPhase('waiting')
            }
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
        // Waits for the headline to finish fading, so the two never share the screen.
        .set(shelf, { autoAlpha: 1 }, 2.2)
        .fromTo(
          words,
          { opacity: 0.25 },
          { opacity: 1, stagger: { amount: 0.8 }, duration: 0.2 },
          2.3,
        )
        // Quick, because a slower fade tied to the scroll could leave the rain too faint to see.
        .fromTo(quote, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, QUOTE_AT)
        // Fixes the length, so the frame's stops stay in time with these beats.
        .to({}, { duration: 0.001 }, HOME_SCENE_BEATS.length)

      gsap.set(shelf, { autoAlpha: 0 })

      return () => setPhase('resting')
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

      setPhase('waiting')
      ScrollTrigger.create({
        trigger: quote,
        start: 'top 80%',
        end: 'bottom top',
        onEnter: () => setPhase('raining'),
        onLeave: () => setPhase('resting'),
        onEnterBack: () => setPhase('raining'),
        onLeaveBack: () => setPhase('waiting'),
      })

      return () => setPhase('resting')
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
