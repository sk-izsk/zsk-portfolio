import type { AskAiSubmitHandler, ChatMessage } from '@app-types/askAi'
import { AskAiComposer } from '@components/askAi/AskAiComposer'
import { AskAiEmptyState } from '@components/askAi/AskAiEmptyState'
import { AskAiHealthOverlay } from '@components/askAi/AskAiHealthOverlay'
import { AskAiMessageItem } from '@components/askAi/AskAiMessageItem'
import { AskAiSuggestionCards } from '@components/askAi/AskAiSuggestionCards'
import { AskAiTypingMessage } from '@components/askAi/AskAiTypingMessage'
import * as styles from '@components/askAi/askAi.css'
import { getAskAiSuggestions } from '@utils/askAi'
import React, { useEffect, useRef } from 'react'

interface AskAiChatPanelProps {
  prompts: string[]
  message: string
  messages: ChatMessage[]
  status: string
  isSending: boolean
  isCheckingHealth: boolean
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
  onMessageChange,
  onSubmit,
}) => {
  const activeSuggestions = getAskAiSuggestions(prompts, message, messages, isSending)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, isSending])

  return (
    <div className={styles.chatPanel}>
      {isCheckingHealth ? <AskAiHealthOverlay /> : null}
      <div className={styles.messages} aria-live="polite">
        {messages.length === 0 ? (
          <AskAiEmptyState prompts={prompts} onSubmit={onSubmit} />
        ) : (
          <>
            {messages.map((item) => (
              <AskAiMessageItem key={item.id} item={item} />
            ))}
            {isSending ? <AskAiTypingMessage /> : null}
            {activeSuggestions.length ? (
              <AskAiSuggestionCards prompts={activeSuggestions} onSubmit={onSubmit} />
            ) : null}
            <div ref={bottomRef} aria-hidden />
          </>
        )}
      </div>

      <AskAiComposer
        message={message}
        isSending={isSending}
        onMessageChange={onMessageChange}
        onSubmit={onSubmit}
      />
      <div className={styles.status} role="status">
        {status}
      </div>
    </div>
  )
}
