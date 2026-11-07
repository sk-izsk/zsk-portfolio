import { StoryFrame } from '@components/story/StoryFrame'
import { StoryContext } from '@components/story/storyContext'
import { StoryHead } from '@components/story/StoryHead'
import { StoryPage } from '@components/story/StoryPage'
import { storyPages } from '@components/story/storyPages'
import { useLoadStoryPages } from '@hooks/story/useLoadStoryPages'
import { useStoryFrame } from '@hooks/story/useStoryFrame'
import { useStoryMotion } from '@hooks/story/useStoryMotion'
import { useStoryScroll } from '@hooks/story/useStoryScroll'
import { useTranslation } from '@localization/localize'
import { STORY_PATHS } from '@utils/storyScroll'
import React, { useRef } from 'react'

const StoryScreen: React.FC = () => {
  const { i18n } = useTranslation()
  const storyRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const isEveryPageLoaded = useLoadStoryPages()

  useStoryScroll(storyRef, isEveryPageLoaded)
  useStoryMotion(storyRef)
  useStoryFrame(storyRef, frameRef, i18n.resolvedLanguage)

  return (
    <>
      <StoryHead />
      <StoryFrame frameRef={frameRef} />
      <StoryContext.Provider value={true}>
        <div ref={storyRef}>
          {storyPages.map((page, index) => (
            <StoryPage
              key={STORY_PATHS[index]}
              page={page}
              isLoaded={index === 0 || isEveryPageLoaded}
            />
          ))}
        </div>
      </StoryContext.Provider>
    </>
  )
}

export default StoryScreen
