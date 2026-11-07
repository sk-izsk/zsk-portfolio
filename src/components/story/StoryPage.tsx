import { storyPage, storyPageDim, storyPageInner } from '@components/story/story.css'
import { StoryPageError } from '@components/story/StoryPageError'
import React, { Suspense, type ElementType } from 'react'
import { ErrorBoundary } from 'zsk-react-error'

interface StoryPageProps {
  page: ElementType
  isLoaded: boolean
}

export const StoryPage: React.FC<StoryPageProps> = ({ page: Page, isLoaded }) => (
  <div className={storyPage}>
    <div className={storyPageInner}>
      {isLoaded ? (
        // Its own boundary, so one page failing to load leaves the rest of the story readable.
        <ErrorBoundary fallbackRender={() => <StoryPageError />}>
          <Suspense fallback={null}>
            <Page />
          </Suspense>
        </ErrorBoundary>
      ) : null}
      <span className={storyPageDim} aria-hidden="true" />
    </div>
  </div>
)
