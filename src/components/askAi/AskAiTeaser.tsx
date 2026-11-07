import * as styles from '@components/askAi/askAiWidget.css'
import React, { useEffect, useState } from 'react'

const FIRST_DELAY_MS = 3000
const SHOWN_MS = 6000
const GAP_MS = 8000

interface AskAiTeaserProps {
  questions: string[]
  onOpen: () => void
}

// Shows a few real questions one at a time, then stops so it never becomes a nuisance.
export const AskAiTeaser: React.FC<AskAiTeaserProps> = ({ questions, onOpen }) => {
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    const isDone = index !== null && index >= questions.length

    if (isDone) {
      return
    }

    const delay = index === null ? FIRST_DELAY_MS : SHOWN_MS + GAP_MS
    const timerId = window.setTimeout(() => setIndex((index ?? -1) + 1), delay)

    return () => window.clearTimeout(timerId)
  }, [index, questions.length])

  const question = index === null ? undefined : questions[index]

  if (!question) {
    return null
  }

  return (
    <button
      key={question}
      className={styles.teaser}
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      onClick={onOpen}
    >
      {question}
    </button>
  )
}
