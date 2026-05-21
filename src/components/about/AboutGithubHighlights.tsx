import {
  githubStatsCard,
  githubStatsCardTitle,
  githubStatsDescription,
  githubStatsEyebrow,
  githubStatsGrid,
  githubStatsHeader,
  githubStatsImage,
  githubStatsImageLink,
  githubStatsLink,
  githubStatsTitle,
} from '@components/about/about.css'
import { Button } from '@components/common/button/Button'
import { useTranslation } from '@localization/localize'
import { useContactInfo } from '@stores/portfolioStore'
import React from 'react'

const GITHUB_THEME_COLOR = '37b182'

const getGithubUsername = (githubUrl?: string): string | null => {
  if (!githubUrl) {
    return null
  }

  try {
    const { pathname } = new URL(githubUrl)
    const username = pathname.split('/').filter(Boolean)[0]
    return username || null
  } catch {
    return null
  }
}

export const AboutGithubHighlights: React.FC = () => {
  const { t } = useTranslation()
  const contact = useContactInfo()
  const githubUrl = contact?.social.github?.url
  const githubUsername = getGithubUsername(githubUrl)

  if (!githubUrl || !githubUsername) {
    return null
  }

  const contributionChartUrl = `https://ghchart.rshah.org/${GITHUB_THEME_COLOR}/${githubUsername}`
  const streakStatsUrl = `https://streak-stats.demolab.com?user=${githubUsername}&theme=transparent&hide_border=true&ring=${GITHUB_THEME_COLOR}&fire=${GITHUB_THEME_COLOR}&currStreakLabel=${GITHUB_THEME_COLOR}&sideNums=${GITHUB_THEME_COLOR}&currStreakNum=${GITHUB_THEME_COLOR}&dates=6b7280`
  const randomQuoteUrl =
    'https://quotes-github-readme.vercel.app/api?type=horizontal&theme=light'

  const cards = [
    {
      title: t('about.github.cards.contributions'),
      href: githubUrl,
      imageUrl: contributionChartUrl,
      alt: t('about.github.alt.contributions', { username: githubUsername }),
    },
    {
      title: t('about.github.cards.streak'),
      href: githubUrl,
      imageUrl: streakStatsUrl,
      alt: t('about.github.alt.streak', { username: githubUsername }),
    },
    {
      title: t('about.github.cards.quote'),
      href: githubUrl,
      imageUrl: randomQuoteUrl,
      alt: t('about.github.alt.quote'),
    },
  ]

  return (
    <>
      <div className={githubStatsHeader}>
        <div>
          <p className={githubStatsEyebrow}>{t('about.github.eyebrow')}</p>
          <h3 className={githubStatsTitle}>{t('about.github.title')}</h3>
          <p className={githubStatsDescription}>{t('about.github.description')}</p>
        </div>
        <Button
          as="a"
          href={githubUrl}
          variant="secondary"
          size="small"
          className={githubStatsLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('about.github.profileLink')}
        </Button>
      </div>
      <div className={githubStatsGrid}>
        {cards.map((card) => (
          <article key={card.title} className={githubStatsCard}>
            <h4 className={githubStatsCardTitle}>{card.title}</h4>
            <a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className={githubStatsImageLink}
            >
              <img
                src={card.imageUrl}
                alt={card.alt}
                loading="lazy"
                decoding="async"
                className={githubStatsImage}
              />
            </a>
          </article>
        ))}
      </div>
    </>
  )
}
