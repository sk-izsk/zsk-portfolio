import type { ChatMessage } from '@app-types/askAi'
import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import { createCn } from '@utils/cn'
import { Bot, User } from 'lucide-react'
import React from 'react'

const cn = createCn(styles)

interface AskAiMessageItemProps {
  item: ChatMessage
}

export const AskAiMessageItem: React.FC<AskAiMessageItemProps> = ({ item }) => {
  const { t } = useTranslation()
  const isUser = item.role === 'user'

  return (
    <div className={cn('messageRow', { messageRowUser: isUser })}>
      <span className={cn('avatar', { userAvatar: isUser })} aria-hidden>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </span>
      <div className={cn('bubble', { userBubble: isUser })}>
        <div className={cn('messageMeta', { messageMetaUser: isUser })}>
          {isUser ? t('askAi.userName') : t('askAi.assistantName')}
          {!isUser && item.cached ? <span>{t('askAi.cached')}</span> : null}
        </div>
        <p className={cn('messageText', isUser ? 'userText' : 'assistantText')}>{item.text}</p>
        {!isUser && item.sources.length ? (
          <details className={styles.sourceDetails}>
            <summary className={styles.sourceSummary}>{t('askAi.evidence')}</summary>
            <div className={styles.sourceList}>
              {item.sources.map((source) => (
                <span key={source} className={styles.sourceTag}>
                  {source}
                </span>
              ))}
            </div>
          </details>
        ) : null}
      </div>
    </div>
  )
}
