import React from 'react'
import * as styles from '@components/common/textHighlighter/TextHighlighter.css'
import { createCn, raw } from '@utils/cn'

type TextHighlighterAction = 'highlight' | 'underline'

interface TextHighlighterProps {
  children: React.ReactNode
  action?: TextHighlighterAction
  className?: string
}
const cn = createCn(styles)

export const TextHighlighter: React.FC<TextHighlighterProps> = ({
  children,
  action = 'highlight',
  className,
}) => {
  const classes = cn('highlighterRoot', { underline: action === 'underline' }, raw(className))
  const textClasses = cn('highlighterText', { highlight: action === 'highlight' })

  return (
    <span className={classes}>
      <span className={textClasses}>{children}</span>
    </span>
  )
}
