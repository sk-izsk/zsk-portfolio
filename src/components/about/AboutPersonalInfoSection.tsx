import {
  btnMargin,
  buttons,
  buttonsCompactTop,
  githubStatsSection,
  infoItem,
  infoItemP,
  infoItemSpan,
  infoItemSpanLink,
  personalInfoSection,
} from '@components/about/about.css'
import { AboutGithubHighlights } from '@components/about/AboutGithubHighlights'
import { availabilityDot } from '@components/about/availabilityDot.css'
import { Button } from '@components/common/button/Button'
import { useTranslation } from '@localization/localize'
import { useContactInfo, usePersonalInfo } from '@stores/portfolioStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import { cx } from '@utils/cn'
import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router'

export const AboutPersonalInfoSection: React.FC = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const personalInfo = usePersonalInfo()
  const contact = useContactInfo()

  if (!personalInfo || !contact) {
    return null
  }

  const birthday = dayjs(personalInfo.birthday)
  const ageInYears = dayjs().diff(birthday, 'year')

  const personalInfoData = [
    {
      label: t('about.info.birthday'),
      value: birthday.isValid()
        ? new Date(personalInfo.birthday).toLocaleDateString(
            i18n.resolvedLanguage === 'fr' ? 'fr-FR' : 'en-US',
            {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            },
          )
        : t('about.info.notAvailable'),
    },
    { label: t('about.info.age'), value: ageInYears },
    {
      label: t('about.info.city'),
      value: `${personalInfo.location.city}, ${personalInfo.location.country}`,
    },
    {
      label: t('about.info.website'),
      value: contact.social.website.label,
      href: contact.social.website.url,
      openInNewTab: true,
    },
    {
      label: t('about.info.email'),
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      label: t('about.info.preferredLocations'),
      value: personalInfo.preferredLocation?.join(', ') || t('about.info.notAvailable'),
    },
    { label: t('about.info.phone'), value: contact.phone },
    {
      label: t('about.info.languages'),
      value: personalInfo.languages.join(', '),
    },
    {
      label: t('about.info.availability'),
      value: personalInfo.availability.join(', '),
      isOpenToWork: true,
    },
  ]

  return (
    <div className="row">
      <div className={cx(personalInfoSection, 'padd-15')}>
        <div className="row">
          {personalInfoData.map((item) => (
            <div key={item.label} className={cx(infoItem, 'padd-15')}>
              <p className={infoItemP}>
                {item.label} :{' '}
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.openInNewTab ? '_blank' : undefined}
                    rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                    className={infoItemSpanLink}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className={infoItemSpan}>
                    {item.isOpenToWork ? (
                      <span
                        className={availabilityDot}
                        role="img"
                        aria-label={t('about.info.openToWork')}
                        title={t('about.info.openToWork')}
                      />
                    ) : null}
                    {item.value}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
        <div className={cx(buttons, buttonsCompactTop)}>
          <Button
            as="a"
            href={personalInfo.resume_link}
            variant="primary"
            size="large"
            className={btnMargin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackGaEvent('About', 'download_cv_click', 'Download CV')
              trackMixpanelEvent('download_cv_click', 'About', 'Download CV')
            }}
          >
            {t('about.actions.downloadCv')}
          </Button>
          <Button
            as="a"
            href="/contact"
            variant="secondary"
            size="large"
            className={cx('hire-me', btnMargin)}
            onClick={(event: React.MouseEvent) => {
              // Ctrl or Cmd click keeps opening the link in a new tab.
              if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault()
                void navigate('/contact')
              }

              trackGaEvent('About', 'hire_me_click', 'Hire Me')
              trackMixpanelEvent('hire_me_click', 'About', 'Hire Me')
            }}
          >
            {t('about.actions.hireMe')}
          </Button>
        </div>
      </div>
      <div className={cx(githubStatsSection, 'padd-15')}>
        <AboutGithubHighlights />
      </div>
    </div>
  )
}
