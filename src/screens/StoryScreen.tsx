import { SeoHead } from '@components/common/SeoHead'
import { storyPage, storyPageDim, storyPageInner } from '@components/story/story.css'
import { StoryContext } from '@components/story/storyContext'
import { useAnalytics } from '@hooks/useAnalytics'
import { useStoryMotion } from '@hooks/useStoryMotion'
import { useStoryScroll } from '@hooks/useStoryScroll'
import { useTranslation } from '@localization/localize'
import HomeScreen from '@screens/HomeScreen'
import { getStoryIndex, STORY_PATHS } from '@utils/storyScroll'
import { useTitle } from 'ahooks'
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

const IDLE_LOAD_DELAY_MS = 600

const pageLoaders = [
  () => import('@screens/AboutScreen'),
  () => import('@screens/ServiceScreen'),
  () => import('@screens/SkillScreen'),
  () => import('@screens/ProjectScreen'),
  () => import('@screens/ContactScreen'),
]

const lazyPages = pageLoaders.map((loader) => lazy(loader))
const pages = [HomeScreen, ...lazyPages]

const StoryHead: React.FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  useAnalytics()

  const pageMeta = [
    { title: t('home.pageTitle'), description: t('home.seoDescription') },
    { title: t('about.title'), description: t('about.seoDescription') },
    { title: t('services.title'), description: t('services.seoDescription') },
    { title: t('skills.title'), description: t('skills.seoDescription') },
    { title: t('projects.title'), description: t('projects.seoDescription') },
    { title: t('contact.title'), description: t('contact.seoDescription') },
  ]
  const index = getStoryIndex(pathname)
  const { title, description } = pageMeta[index] ?? pageMeta[0]!

  useTitle(title)

  return <SeoHead title={title} description={description} canonical={STORY_PATHS[index]} />
}

const StoryScreen: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null)
  const [isEveryPageLoaded, setIsEveryPageLoaded] = useState(false)

  useStoryScroll(storyRef, isEveryPageLoaded)
  useStoryMotion(storyRef)

  useEffect(() => {
    let isCurrent = true

    const loadPages = () => {
      // A page that fails to load is left for its lazy boundary to report when it renders.
      void Promise.allSettled(pageLoaders.map((loader) => loader())).then(() => {
        if (isCurrent) {
          setIsEveryPageLoaded(true)
        }
      })
    }

    // Home paints first. A deep link cannot wait, it needs the pages above it to find its place.
    const timerId = window.setTimeout(
      loadPages,
      getStoryIndex(window.location.pathname) > 0 ? 0 : IDLE_LOAD_DELAY_MS,
    )

    return () => {
      isCurrent = false
      window.clearTimeout(timerId)
    }
  }, [])

  return (
    <>
      <StoryHead />
      <StoryContext.Provider value={true}>
        <div ref={storyRef}>
          {pages.map((Page, index) => (
            <div key={STORY_PATHS[index]} className={storyPage}>
              <div className={storyPageInner}>
                {index === 0 || isEveryPageLoaded ? (
                  <Suspense fallback={null}>
                    <Page />
                  </Suspense>
                ) : null}
                <span className={storyPageDim} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </StoryContext.Provider>
    </>
  )
}

export default StoryScreen
