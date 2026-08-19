import type { AskAiSubmitHandler } from '@app-types/askAi'
import { AskAiComposerTextarea } from '@components/askAi/AskAiComposerTextarea'
import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import { Loader2, Send } from 'lucide-react'
import React from 'react'

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
  const submitCurrentMessage = () => {
    const text = message.trim()
    if (!text.trim() || isSending) {
      return
    }

    void onSubmit(text)
  }

  return (
    <form
      className={styles.composer}
      onSubmit={(event) => {
        event.preventDefault()
        submitCurrentMessage()
      }}
    >
      <AskAiComposerTextarea
        message={message}
        onMessageChange={onMessageChange}
        onSubmit={submitCurrentMessage}
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
