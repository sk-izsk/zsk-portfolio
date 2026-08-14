import { AskAiChatPanel } from '@components/askAi/AskAiChatPanel'
import { AskAiHero } from '@components/askAi/AskAiHero'
import * as styles from '@components/askAi/askAi.css'
import { useAskAiChat } from '@hooks/askAi/useAskAiChat'
import { useTranslation } from '@localization/localize'
import React from 'react'

export const askAiContainerClassName = styles.askAiContainer

export const AskAiContent: React.FC = () => {
  const { t } = useTranslation()
  const prompts = [
    t('askAi.prompts.reactProjects'),
    t('askAi.prompts.fullStack'),
    t('askAi.prompts.aiProjects'),
    t('askAi.prompts.reactNative'),
  ]
  const chat = useAskAiChat({
    error: t('askAi.error'),
    offline: t('askAi.offline'),
    rateLimited: t('askAi.rateLimited'),
    resetLabel: (time) => t('askAi.resetsIn', { time }),
  })

  return (
    <div className={styles.shell}>
      <AskAiHero remaining={chat.remaining} resetInSeconds={chat.resetInSeconds} />
      <AskAiChatPanel
        prompts={prompts}
        message={chat.message}
        messages={chat.messages}
        status={chat.status}
        isSending={chat.isSending}
        isCheckingHealth={chat.isCheckingHealth}
        onMessageChange={chat.setMessage}
        onSubmit={chat.submitMessage}
      />
    </div>
  )
}
