import React from 'react'
import { useTranslation } from '../../localization/localize'
import { usePersonalInfo } from '../../stores/portfolioStore'
import { TextHighlighter } from '../common/textHighlighter/TextHighlighter'
import { aboutText, aboutTextH3, aboutTextP, aboutTextSpan } from './about.css'

export const AboutPersonalIntro: React.FC = () => {
  const { t } = useTranslation()
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  return (
    <div className="row">
      <div className={`${aboutText} padd-15`}>
        <h3 className={aboutTextH3}>
          {t('about.introPrefix', { name: personalInfo.name })}{' '}
          <TextHighlighter action="underline" className={aboutTextSpan}>
            {personalInfo.title}
          </TextHighlighter>
        </h3>
        <p className={aboutTextP}>
          {(personalInfo.detailedBioSegments ?? [{ text: personalInfo.detailedBio }]).map(
            (segment) => {
              if (segment.mark === 'highlight') {
                return (
                  <TextHighlighter key={`highlight:${segment.text}`} action="highlight">
                    {segment.text}
                  </TextHighlighter>
                )
              }

              return <React.Fragment key={`plain:${segment.text}`}>{segment.text}</React.Fragment>
            },
          )}
        </p>
      </div>
    </div>
  )
}
