import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import React, { useEffect, useRef } from 'react'

const ASK_AI_MESSAGE_MAX_LENGTH = 10_000
const ASK_AI_COUNTER_THRESHOLD = 8_000

interface AskAiComposerTextareaProps {
  message: string
  onMessageChange: (value: string) => void
  onSubmit: () => void
}

export const AskAiComposerTextarea: React.FC<AskAiComposerTextareaProps> = ({
  message,
  onMessageChange,
  onSubmit,
}) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const showCounter = message.length >= ASK_AI_COUNTER_THRESHOLD

  useEffect(() => {
    const input = inputRef.current
    if (!input) {
      return
    }

    input.style.height = '48px'
    if (!message) {
      return
    }

    input.style.height = `${Math.min(input.scrollHeight, 148)}px`
  }, [message])

  return (
    <div
      className={styles.composerInputShell}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) {
          return
        }

        event.preventDefault()
        onSubmit()
      }}
    >
      <textarea
        ref={inputRef}
        className={styles.input}
        value={message}
        rows={1}
        maxLength={ASK_AI_MESSAGE_MAX_LENGTH}
        onChange={(event) => onMessageChange(event.currentTarget.value)}
        placeholder={t('askAi.inputPlaceholder')}
      />
      {showCounter ? (
        <span className={styles.characterCount}>
          {message.length.toLocaleString()} / {ASK_AI_MESSAGE_MAX_LENGTH.toLocaleString()}
        </span>
      ) : null}
    </div>
  )
}
