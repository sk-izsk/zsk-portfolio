import { useStoryCovering } from '@hooks/story/useStoryCovering'
import { useStoryReveal } from '@hooks/story/useStoryReveal'
import { useStoryStickyOffsets } from '@hooks/story/useStoryStickyOffsets'
import { useStoryWheel } from '@hooks/story/useStoryWheel'
import type { RefObject } from 'react'

export const useStoryMotion = (storyRef: RefObject<HTMLDivElement | null>) => {
  useStoryStickyOffsets(storyRef)
  useStoryReveal(storyRef)
  useStoryCovering(storyRef)
  useStoryWheel(storyRef)
}
