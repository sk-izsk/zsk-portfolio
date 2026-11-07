import { useTitle } from 'ahooks'
import type { PropsWithChildren } from 'react'
import React, { useContext, useLayoutEffect } from 'react'
import { SeoHead } from '@components/common/SeoHead'
import { DotPattern } from '@components/common/dotPattern/DotPattern'
import { StoryContext } from '@components/story/storyContext'
import { cx } from '@utils/cn'

interface ScreenProps extends PropsWithChildren {
  sectionId: string
  sectionClassName?: string
  containerClassName?: string
  contentProtected?: boolean
  isLoading: boolean
  isError: boolean
  title?: string
  pageTitle?: string
  description?: string
  canonical?: string
  loadingMessage?: string
  errorMessage?: string
}

// Only a screen on its own owns these. In the story, the story sets them for the page in view.
const ScreenHead: React.FC<Pick<ScreenProps, 'description' | 'canonical'> & { title?: string }> = ({
  title,
  description,
  canonical,
}) => {
  useTitle(title ?? '')

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <SeoHead title={title} description={description} canonical={canonical} />
}

export const Screen: React.FC<ScreenProps> = ({
  sectionId,
  sectionClassName,
  containerClassName,
  contentProtected = false,
  isLoading,
  isError,
  title,
  pageTitle,
  description,
  canonical,
  loadingMessage = 'Loading...',
  errorMessage = 'Error loading data',
  children,
}) => {
  const isInStory = useContext(StoryContext)

  const state = isLoading
    ? {
        message: loadingMessage,
        className: 'screen-state screen-state--loading',
      }
    : isError
      ? {
          message: errorMessage,
          className: 'screen-state screen-state--error',
        }
      : null

  return (
    <section
      className={cx(sectionClassName ?? sectionId, 'section', !isInStory && 'active')}
      id={sectionId}
    >
      {isInStory ? null : (
        <ScreenHead title={pageTitle ?? title} description={description} canonical={canonical} />
      )}
      {isInStory ? null : <DotPattern />}
      <div
        className={cx('container', 'screen-container', containerClassName)}
        data-content-protected={contentProtected || undefined}
      >
        {title && (
          <div className="row">
            <div className="section-title padd-15">
              <h2>{title}</h2>
            </div>
          </div>
        )}
        {state ? <div className={state.className}>{state.message}</div> : children}
      </div>
    </section>
  )
}
