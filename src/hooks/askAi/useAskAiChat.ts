import type { ChatMessage } from '@app-types/askAi'
import { askAiApi, askAiHealthApi } from '@services/api'
import {
  formatResetTime,
  HEALTH_OVERLAY_DELAY_MS,
  readAskAiError,
  toAskAiMessageId,
} from '@utils/askAi'
import { useState } from 'react'

interface AskAiChatCopy {
  error: string
  offline: string
  rateLimited: string
  resetLabel: (time: string) => string
}

const checkHealthWithDelayedOverlay = async (setVisible: (value: boolean) => void) => {
  const timer = window.setTimeout(() => setVisible(true), HEALTH_OVERLAY_DELAY_MS)

  try {
    await askAiHealthApi()
  } finally {
    window.clearTimeout(timer)
    setVisible(false)
  }
}

export const useAskAiChat = (copy: AskAiChatCopy) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isSending, setIsSending] = useState(false)
  const [isCheckingHealth, setIsCheckingHealth] = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [resetInSeconds, setResetInSeconds] = useState(0)
  const [status, setStatus] = useState('')

  const submitMessage = async (rawMessage: string) => {
    const text = rawMessage.trim()
    if (!text || isSending) {
      return
    }

    setMessage('')
    setStatus('')
    setIsSending(true)

    setMessages((current) => [...current, { id: toAskAiMessageId(), role: 'user', text }])

    try {
      await checkHealthWithDelayedOverlay(setIsCheckingHealth)
      const response = await askAiApi(text)
      setRemaining(response.remaining)
      setResetInSeconds(response.reset_in_seconds)
      setMessages((current) => [
        ...current,
        {
          id: toAskAiMessageId(),
          role: 'assistant',
          text: response.answer,
          sources: response.sources,
          cached: response.cached,
          provider: response.provider,
        },
      ])
    } catch (requestError) {
      const askAiError = await readAskAiError(
        requestError,
        copy.error,
        copy.rateLimited,
        copy.offline,
      )

      if (typeof askAiError.remaining === 'number') {
        setRemaining(askAiError.remaining)
      }
      if (typeof askAiError.resetInSeconds === 'number') {
        setResetInSeconds(askAiError.resetInSeconds)
      }

      setStatus(
        askAiError.resetInSeconds
          ? `${askAiError.message} ${copy.resetLabel(formatResetTime(askAiError.resetInSeconds))}.`
          : askAiError.message,
      )
    } finally {
      setIsSending(false)
    }
  }

  return {
    message,
    messages,
    isSending,
    isCheckingHealth,
    remaining,
    resetInSeconds,
    status,
    setMessage,
    submitMessage,
  }
}
