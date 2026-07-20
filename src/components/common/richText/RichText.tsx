import React from 'react'
import * as styles from './richText.css'
import { cx } from '@utils/cn'

interface RichTextProps {
  content: string
  className?: string
  variant?: 'block' | 'inline'
}

interface TextSegment {
  type: 'text'
  value: string
}

interface CodeSegment {
  type: 'code'
  value: string
}

interface CodeBlockSegment {
  type: 'codeBlock'
  value: string
}

type Segment = TextSegment | CodeSegment | CodeBlockSegment

const codeFencePattern = /```(?:[\w-]+)?\n?([\s\S]*?)```/g
const inlineCodePattern = /`([^`]+)`/g

const renderInline = (text: string, keyPrefix: string) => {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0

  for (const match of text.matchAll(inlineCodePattern)) {
    const matchIndex = match.index ?? 0
    const before = text.slice(lastIndex, matchIndex)

    if (before) {
      nodes.push(...renderTextWithLineBreaks(before, `${keyPrefix}-text-${lastIndex}`))
    }

    nodes.push(
      <code key={`${keyPrefix}-code-${matchIndex}`} className={styles.code}>
        {match[1]}
      </code>,
    )

    lastIndex = matchIndex + match[0].length
  }

  const after = text.slice(lastIndex)
  if (after) {
    nodes.push(...renderTextWithLineBreaks(after, `${keyPrefix}-text-${lastIndex}`))
  }

  return nodes
}

const renderTextWithLineBreaks = (text: string, keyPrefix: string) => {
  return text.split('\n').flatMap((line, index, lines) => {
    const key = `${keyPrefix}-${index}`
    const nodes: React.ReactNode[] = [<React.Fragment key={key}>{line}</React.Fragment>]

    if (index < lines.length - 1) {
      nodes.push(<br key={`${key}-br`} />)
    }

    return nodes
  })
}

const parseSegments = (content: string): Segment[] => {
  const segments: Segment[] = []
  let lastIndex = 0

  for (const match of content.matchAll(codeFencePattern)) {
    const matchIndex = match.index ?? 0
    const before = content.slice(lastIndex, matchIndex)

    if (before) {
      segments.push({ type: 'text', value: before })
    }

    segments.push({ type: 'codeBlock', value: match[1].replace(/\n$/, '') })
    lastIndex = matchIndex + match[0].length
  }

  const after = content.slice(lastIndex)
  if (after) {
    segments.push({ type: 'text', value: after })
  }

  return segments
}

const renderBlockSegments = (content: string) => {
  const segments = parseSegments(content)

  return segments.flatMap((segment, index) => {
    if (segment.type === 'codeBlock') {
      return (
        <pre key={`code-block-${index}`} className={styles.codeBlock}>
          <code>{segment.value}</code>
        </pre>
      )
    }

    return segment.value
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph, paragraphIndex) => (
        <p key={`paragraph-${index}-${paragraphIndex}`} className={styles.paragraph}>
          {renderInline(paragraph, `paragraph-${index}-${paragraphIndex}`)}
        </p>
      ))
  })
}

export const RichText: React.FC<RichTextProps> = ({ content, className, variant = 'block' }) => {
  if (variant === 'inline') {
    return <span className={cx(styles.inlineRoot, className)}>{renderInline(content, 'inline')}</span>
  }

  return <div className={cx(styles.root, className)}>{renderBlockSegments(content)}</div>
}
