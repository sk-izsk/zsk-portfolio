import React from 'react'
import { usePersonalInfo } from '../../stores/portfolioStore'
import { TextHighlighter } from '../common/TextHighlighter'
import { homeInfoP } from './home.css'

export const HomeDetailBio: React.FC = () => {
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  return (
    <p className={homeInfoP}>
      {(personalInfo.bioSegments ?? [{ text: personalInfo.bio }]).map((segment, index) => {
        if (segment.mark === 'underline') {
          return (
            <TextHighlighter key={`${segment.text}-${index}`} action="underline">
              {segment.text}
            </TextHighlighter>
          )
        }

        if (segment.mark === 'highlight') {
          return (
            <TextHighlighter key={`${segment.text}-${index}`} action="highlight">
              {segment.text}
            </TextHighlighter>
          )
        }

        return <React.Fragment key={`${segment.text}-${index}`}>{segment.text}</React.Fragment>
      })}
    </p>
  )
}
