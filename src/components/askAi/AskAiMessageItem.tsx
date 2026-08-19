import type { ChatMessage } from '@app-types/askAi'
import { AskAiMarkdown } from '@components/askAi/AskAiMarkdown'
import * as styles from '@components/askAi/askAi.css'
import { CopyButton } from '@components/common/CopyButton'
import { useTranslation } from '@localization/localize'
import { createCn } from '@utils/cn'
import { formatAskAiProvider } from '@utils/askAi'
import { Bot, User } from 'lucide-react'
import React, { useState } from 'react'

const cn = createCn(styles)
const COLLAPSE_AFTER = 900
const SHOW_LESS = 'Show less'
const SHOW_MORE = 'Show more'

interface AskAiMessageItemProps {
  item: ChatMessage
}

export const AskAiMessageItem: React.FC<AskAiMessageItemProps> = ({ item }) => {
  const { t } = useTranslation()
  const isUser = item.role === 'user'
  const providerLabel = isUser ? null : formatAskAiProvider(item.provider, item.cached)
  const [expanded, setExpanded] = useState(false)
  const isCollapsible = item.text.length > COLLAPSE_AFTER
  const showPlainPreview = isUser && isCollapsible && !expanded
  const visibleText = isCollapsible && !expanded ? `${item.text.slice(0, COLLAPSE_AFTER).trim()}...` : item.text

  return (
    <div className={cn('messageRow', { messageRowUser: isUser })}>
      <span className={cn('avatar', { userAvatar: isUser })} aria-hidden>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </span>
      <div className={cn('bubble', { userBubble: isUser })}>
        <div className={cn('messageMeta', { messageMetaUser: isUser })}>
          {isUser ? t('askAi.userName') : t('askAi.assistantName')}
          {providerLabel ? <span className={styles.providerMeta}>{providerLabel}</span> : null}
          <CopyButton
            className={styles.copyButton}
            text={item.text}
            label={t('askAi.copy')}
          />
        </div>
        <div className={cn('messageText', isUser ? 'userText' : 'assistantText')}>
          {showPlainPreview ? (
            <span className={styles.plainMessagePreview}>{visibleText}</span>
          ) : (
            <AskAiMarkdown>{visibleText}</AskAiMarkdown>
          )}
        </div>
        {isCollapsible ? (
          <button
            className={styles.expandButton}
            type="button"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? SHOW_LESS : SHOW_MORE}
          </button>
        ) : null}
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
