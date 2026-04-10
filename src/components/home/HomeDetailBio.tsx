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
      {(personalInfo.bioSegments ?? [{ text: personalInfo.bio }]).map((segment) => {
        if (segment.mark === 'underline') {
          return (
            <TextHighlighter key={`underline:${segment.text}`} action="underline">
              {segment.text}
            </TextHighlighter>
          )
        }

        if (segment.mark === 'highlight') {
          return (
            <TextHighlighter key={`highlight:${segment.text}`} action="highlight">
              {segment.text}
            </TextHighlighter>
          )
        }

        return <React.Fragment key={`plain:${segment.text}`}>{segment.text}</React.Fragment>
      })}
    </p>
  )
}
