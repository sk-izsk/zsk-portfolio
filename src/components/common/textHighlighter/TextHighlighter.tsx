import React from 'react'
import {
  highlight,
  highlighterRoot,
  highlighterText,
  underline,
} from '@components/common/textHighlighter/TextHighlighter.css'

type TextHighlighterAction = 'highlight' | 'underline'

interface TextHighlighterProps {
  children: React.ReactNode
  action?: TextHighlighterAction
  className?: string
}

export const TextHighlighter: React.FC<TextHighlighterProps> = ({
  children,
  action = 'highlight',
  className,
}) => {
  const rootActionClass = action === 'underline' ? underline : undefined
  const textActionClass = action === 'highlight' ? highlight : undefined
  const classes = [highlighterRoot, rootActionClass, className].filter(Boolean).join(' ')
  const textClasses = [highlighterText, textActionClass].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      <span className={textClasses}>{children}</span>
    </span>
  )
}
