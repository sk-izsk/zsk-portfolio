import { Screen } from '@components/Screen'
import * as styles from '@components/askAi/askAi.css'
import { askAiApi, askAiHealthApi } from '@services/api'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading } from '@stores/portfolioStore'
import { createCn } from '@utils/cn'
import { Bot, Loader2, Send, Sparkles, User } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { HTTPError } from 'ky'

const cn = createCn(styles)

type ChatMessage =
  | {
      id: string
      role: 'user'
      text: string
    }
  | {
      id: string
      role: 'assistant'
      text: string
      sources: string[]
      cached: boolean
    }

const toMessageId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

type AskAiErrorDetail = {
  message?: string
  remaining?: number
  reset_in_seconds?: number
}

const formatResetTime = (seconds: number) => {
  const totalMinutes = Math.max(1, Math.ceil(seconds / 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (!hours) {
    return `${totalMinutes}m`
  }

  return minutes ? `${hours}h ${minutes}m` : `${hours}h`
}

const readAskAiError = async (
  error: unknown,
  fallback: string,
  rateLimited: string,
  offline: string,
) => {
  if (!(error instanceof HTTPError)) {
    return { message: error instanceof TypeError ? offline : fallback }
  }

  if (error.response.status === 429) {
    const payload = (await error.response.json().catch(() => null)) as {
      detail?: AskAiErrorDetail
    } | null

    return {
      message: payload?.detail?.message || rateLimited,
      remaining: payload?.detail?.remaining,
      resetInSeconds: payload?.detail?.reset_in_seconds,
    }
  }

  return { message: fallback }
}

const AskAiScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isSending, setIsSending] = useState(false)
  const [isCheckingHealth, setIsCheckingHealth] = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [resetInSeconds, setResetInSeconds] = useState(0)
  const [status, setStatus] = useState('')
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  useAnalytics()

  const prompts = [
    t('askAi.prompts.reactProjects'),
    t('askAi.prompts.fullStack'),
    t('askAi.prompts.aiProjects'),
    t('askAi.prompts.reactNative'),
  ]

  useEffect(() => {
    const input = inputRef.current
    if (!input) {
      return
    }

    input.style.height = '48px'
    input.style.height = `${Math.min(input.scrollHeight, 96)}px`
  }, [message])

  const submitMessage = async (rawMessage: string) => {
    const text = rawMessage.trim()
    if (!text || isSending) {
      return
    }

    setMessage('')
    setStatus('')
    setIsSending(true)
    setMessages((current) => [...current, { id: toMessageId(), role: 'user', text }])

    try {
      setIsCheckingHealth(true)
      await askAiHealthApi()
      setIsCheckingHealth(false)
      const response = await askAiApi(text)
      setRemaining(response.remaining)
      setResetInSeconds(response.reset_in_seconds)
      setMessages((current) => [
        ...current,
        {
          id: toMessageId(),
          role: 'assistant',
          text: response.answer,
          sources: response.sources,
          cached: response.cached,
        },
      ])
    } catch (requestError) {
      setIsCheckingHealth(false)
      const askAiError = await readAskAiError(
        requestError,
        t('askAi.error'),
        t('askAi.rateLimited'),
        t('askAi.offline'),
      )
      if (typeof askAiError.remaining === 'number') {
        setRemaining(askAiError.remaining)
      }
      if (typeof askAiError.resetInSeconds === 'number') {
        setResetInSeconds(askAiError.resetInSeconds)
      }
      setStatus(
        askAiError.resetInSeconds
          ? `${askAiError.message} ${t('askAi.resetsIn', {
              time: formatResetTime(askAiError.resetInSeconds),
            })}.`
          : askAiError.message,
      )
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Screen
      sectionId="ask-ai"
      containerClassName={styles.askAiContainer}
      isLoading={loading}
      isError={Boolean(error)}
      title={t('askAi.title')}
      pageTitle={t('askAi.pageTitle')}
      description={t('askAi.seoDescription')}
      canonical="/ask-ai"
      contentProtected
    >
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>
              <Sparkles size={16} aria-hidden />
              {t('askAi.heroEyebrow')}
            </span>
            <h3 className={styles.heroTitle}>{t('askAi.heroTitle')}</h3>
            <p className={styles.heroBody}>{t('askAi.heroBody')}</p>
          </div>
          <div className={styles.meter} aria-live="polite">
            <span className={styles.meterLabel}>{t('askAi.remaining')}</span>
            <span className={styles.meterValue}>{remaining ?? 3}</span>
            {remaining === 0 && resetInSeconds > 0 ? (
              <span className={styles.meterReset}>
                {t('askAi.resetsIn', { time: formatResetTime(resetInSeconds) })}
              </span>
            ) : null}
          </div>
        </header>

        <div className={styles.chatPanel}>
          {isCheckingHealth ? (
            <div className={styles.healthOverlay} aria-live="assertive">
              <div className={styles.healthBox}>
                <Loader2 className={styles.spin} size={18} aria-hidden />
                {t('askAi.healthCheck')}
              </div>
            </div>
          ) : null}
          <div className={styles.messages} aria-live="polite">
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyTitle}>{t('askAi.emptyTitle')}</div>
                <p>{t('askAi.emptyBody')}</p>
                <div className={styles.promptGrid}>
                  {prompts.map((prompt) => (
                    <button
                      key={prompt}
                      className={styles.promptButton}
                      type="button"
                      onClick={() => void submitMessage(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((item) => {
                  const isUser = item.role === 'user'
                  return (
                    <div
                      key={item.id}
                      className={cn('messageRow', { messageRowUser: isUser })}
                    >
                      <span className={cn('avatar', { userAvatar: isUser })} aria-hidden>
                        {isUser ? <User size={18} /> : <Bot size={18} />}
                      </span>
                      <div className={cn('bubble', { userBubble: isUser })}>
                        <div className={cn('messageMeta', { messageMetaUser: isUser })}>
                          {isUser ? t('askAi.userName') : t('askAi.assistantName')}
                          {!isUser && item.cached ? <span>{t('askAi.cached')}</span> : null}
                        </div>
                        <p
                          className={cn(
                            'messageText',
                            isUser ? 'userText' : 'assistantText',
                          )}
                        >
                          {item.text}
                        </p>
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
                })}
                {isSending ? (
                  <div className={styles.messageRow}>
                    <span className={styles.avatar} aria-hidden>
                      <Bot size={18} />
                    </span>
                    <div className={styles.bubble}>
                      <div className={styles.messageMeta}>{t('askAi.assistantName')}</div>
                      <div className={styles.typing} aria-label="Assistant is typing">
                        <span className={styles.typingDot} />
                        <span className={cn('typingDot', 'typingDotDelayOne')} />
                        <span className={cn('typingDot', 'typingDotDelayTwo')} />
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>

          <form
            className={styles.composer}
            onSubmit={(event) => {
              event.preventDefault()
              void submitMessage(message)
            }}
          >
            <textarea
              ref={inputRef}
              className={styles.input}
              value={message}
              rows={1}
              maxLength={800}
              onChange={(event) => setMessage(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' || event.shiftKey) {
                  return
                }

                event.preventDefault()
                void submitMessage(message)
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
          <div className={styles.status} role="status">
            {status}
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default AskAiScreen
