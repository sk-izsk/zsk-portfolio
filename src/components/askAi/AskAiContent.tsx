import { AskAiChatPanel } from '@components/askAi/AskAiChatPanel'
import { AskAiHero } from '@components/askAi/AskAiHero'
import * as styles from '@components/askAi/askAi.css'
import { closeButton } from '@components/askAi/askAiWidget.css'
import { useAskAiChat } from '@hooks/askAi/useAskAiChat'
import { useAskAiUsage } from '@hooks/askAi/useAskAiUsage'
import { useTranslation } from '@localization/localize'
import { useAskAiWidgetStore } from '@stores/askAiWidgetStore'
import { X } from 'lucide-react'
import React from 'react'

interface AskAiContentProps {
  onClose: () => void
}

export const AskAiContent: React.FC<AskAiContentProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const prompts = [
    t('askAi.prompts.reactProjects'),
    t('askAi.prompts.fullStack'),
    t('askAi.prompts.aiProjects'),
    t('askAi.prompts.reactNative'),
  ]
  const isOpen = useAskAiWidgetStore((state) => state.isOpen)
  const usage = useAskAiUsage(isOpen)
  const resetInSeconds = usage.data?.reset_in_seconds ?? 0
  const chat = useAskAiChat({
    error: t('askAi.error'),
    offline: t('askAi.offline'),
    rateLimited: t('askAi.rateLimited'),
    resetLabel: (time) => t('askAi.resetsIn', { time }),
  })

  return (
    <div className={styles.shell}>
      <AskAiHero
        remaining={usage.data?.remaining}
        resetInSeconds={resetInSeconds}
        isLoading={usage.isLoading}
      >
        <button
          className={closeButton}
          type="button"
          onClick={onClose}
          aria-label={t('askAi.closeChat')}
        >
          <X size={18} aria-hidden="true" />
        </button>
      </AskAiHero>
      <AskAiChatPanel
        prompts={prompts}
        message={chat.message}
        messages={chat.messages}
        status={chat.status}
        isSending={chat.isSending}
        isCheckingHealth={chat.isCheckingHealth}
        isCheckingUsage={usage.isLoading}
        isLimitReached={usage.data?.allowed === false}
        resetInSeconds={resetInSeconds}
        onMessageChange={chat.setMessage}
        onSubmit={chat.submitMessage}
      />
    </div>
  )
}
