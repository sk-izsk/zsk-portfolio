import { flowSceneQuery, pinnedSceneQuery } from '@components/home/home.css'
import { buildFlowScene, buildPinnedScene, getHomeSceneParts } from '@utils/homeScene'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, type RefObject } from 'react'

export const useHomeScrollScene = (
  sceneRef: RefObject<HTMLDivElement | null>,
  // Text changes move the headline, so the scene rebuilds per language.
  contentKey: string | null,
) => {
  useLayoutEffect(() => {
    const parts = sceneRef.current && contentKey ? getHomeSceneParts(sceneRef.current) : null

    if (!parts) {
      return
    }

    const media = gsap.matchMedia()

    media.add(pinnedSceneQuery, () => buildPinnedScene(parts))
    media.add(flowSceneQuery, () => buildFlowScene(parts))

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
