import type { AskAiSubmitHandler } from '@app-types/askAi'
import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import { Loader2, Send } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

interface AskAiComposerProps {
  message: string
  isSending: boolean
  onMessageChange: (value: string) => void
  onSubmit: AskAiSubmitHandler
}

export const AskAiComposer: React.FC<AskAiComposerProps> = ({
  message,
  isSending,
  onMessageChange,
  onSubmit,
}) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const input = inputRef.current
    if (!input) {
      return
    }

    input.style.height = '48px'
    input.style.height = `${Math.min(input.scrollHeight, 96)}px`
  }, [message])

  return (
    <form
      className={styles.composer}
      onSubmit={(event) => {
        event.preventDefault()
        void onSubmit(message)
      }}
    >
      <textarea
        ref={inputRef}
        className={styles.input}
        value={message}
        rows={1}
        maxLength={800}
        onChange={(event) => onMessageChange(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' || event.shiftKey) {
            return
          }

          event.preventDefault()
          void onSubmit(message)
        }}
        placeholder={t('askAi.inputPlaceholder')}
      />
      <button
        className={styles.sendButton}
        type="submit"
        disabled={isSending || !message.trim()}
        aria-label={t('askAi.send')}
      >
        {isSending ? <Loader2 size={19} aria-hidden /> : <Send size={19} aria-hidden />}
      </button>
    </form>
  )
}
