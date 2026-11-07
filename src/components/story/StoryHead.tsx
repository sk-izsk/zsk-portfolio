import { SeoHead } from '@components/common/SeoHead'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { getStoryIndex, STORY_PATHS } from '@utils/storyScroll'
import { useTitle } from 'ahooks'
import React from 'react'
import { useLocation } from 'react-router'

export const StoryHead: React.FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  useAnalytics()

  const pageMeta = [
    { title: t('home.pageTitle'), description: t('home.seoDescription') },
    { title: t('about.title'), description: t('about.seoDescription') },
    { title: t('services.title'), description: t('services.seoDescription') },
    { title: t('skills.title'), description: t('skills.seoDescription') },
    { title: t('projects.title'), description: t('projects.seoDescription') },
    { title: t('blog.title'), description: t('blog.seoDescription') },
    { title: t('contact.title'), description: t('contact.seoDescription') },
  ]
  const index = getStoryIndex(pathname)
  const { title, description } = pageMeta[index] ?? pageMeta[0]!

  useTitle(title)

  return <SeoHead title={title} description={description} canonical={STORY_PATHS[index]} />
}
