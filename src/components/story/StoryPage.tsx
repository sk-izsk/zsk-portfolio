import { storyPage, storyPageDim, storyPageInner } from '@components/story/story.css'
import React, { Suspense, type ElementType } from 'react'

interface StoryPageProps {
  page: ElementType
  isLoaded: boolean
}

export const StoryPage: React.FC<StoryPageProps> = ({ page: Page, isLoaded }) => (
  <div className={storyPage}>
    <div className={storyPageInner}>
      {isLoaded ? (
        <Suspense fallback={null}>
          <Page />
        </Suspense>
      ) : null}
      <span className={storyPageDim} aria-hidden="true" />
    </div>
  </div>
)
