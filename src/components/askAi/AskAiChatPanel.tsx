import type { AskAiSubmitHandler, ChatMessage } from '@app-types/askAi'
import { AskAiComposer } from '@components/askAi/AskAiComposer'
import { AskAiEmptyState } from '@components/askAi/AskAiEmptyState'
import { AskAiHealthOverlay } from '@components/askAi/AskAiHealthOverlay'
import { AskAiMessageItem } from '@components/askAi/AskAiMessageItem'
import { AskAiSuggestionCards } from '@components/askAi/AskAiSuggestionCards'
import { AskAiTypingMessage } from '@components/askAi/AskAiTypingMessage'
import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import { formatResetTime, getAskAiSuggestions } from '@utils/askAi'
import React, { useEffect, useRef } from 'react'

interface AskAiChatPanelProps {
  prompts: string[]
  message: string
  messages: ChatMessage[]
  status: string
  isSending: boolean
  isCheckingHealth: boolean
  isCheckingUsage: boolean
  isLimitReached: boolean
  resetInSeconds: number
  onMessageChange: (value: string) => void
  onSubmit: AskAiSubmitHandler
}

export const AskAiChatPanel: React.FC<AskAiChatPanelProps> = ({
  prompts,
  message,
  messages,
  status,
  isSending,
  isCheckingHealth,
  isCheckingUsage,
  isLimitReached,
  resetInSeconds,
  onMessageChange,
  onSubmit,
}) => {
  const { t } = useTranslation()
  const activeSuggestions = getAskAiSuggestions(prompts, messages, isSending)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, isSending])

  return (
    <div className={styles.chatPanel}>
      {isCheckingHealth ? <AskAiHealthOverlay /> : null}
      <div className={styles.messages} aria-live="polite">
        {messages.length === 0 ? (
          <AskAiEmptyState prompts={prompts} disabled={isLimitReached} onSubmit={onSubmit} />
        ) : (
          <>
            {messages.map((item) => (
              <AskAiMessageItem key={item.id} item={item} />
            ))}
            {isSending ? <AskAiTypingMessage /> : null}
            {/* Above the suggestions, so a new answer stays in view in the narrow panel. */}
            <div ref={bottomRef} aria-hidden />
            {activeSuggestions.length ? (
              <AskAiSuggestionCards
                prompts={activeSuggestions}
                disabled={isLimitReached}
                onSubmit={onSubmit}
              />
            ) : null}
          </>
        )}
      </div>

      <AskAiComposer
        message={message}
        isSending={isSending}
        disabled={isLimitReached}
        onMessageChange={onMessageChange}
        onSubmit={onSubmit}
      />
      {isLimitReached ? (
        <p className={styles.limitNotice} role="status">
          {t('askAi.limitReached')}
          {resetInSeconds > 0
            ? ` ${t('askAi.resetsIn', { time: formatResetTime(resetInSeconds) })}.`
            : null}
        </p>
      ) : (
        <div className={styles.status} role="status">
          {status || (isCheckingUsage ? t('askAi.checkingUsage') : '')}
        </div>
      )}
    </div>
  )
}
