import type { ChatMessage } from '@app-types/askAi'
import { askAiApi, askAiHealthApi, queryKeys, type AskAiUsage } from '@services/api'
import { useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  // The remaining count lives in the usage query's cache, so the panel shows it after a reload too.
  const saveUsage = (remaining: number, resetInSeconds: number) =>
    queryClient.setQueryData<AskAiUsage>(queryKeys.askAiUsage(), {
      remaining,
      reset_in_seconds: resetInSeconds,
      allowed: remaining > 0,
    })
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
      saveUsage(response.remaining, response.reset_in_seconds)
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
      const askAiError = readAskAiError(requestError, copy.error, copy.rateLimited, copy.offline)

      if (typeof askAiError.remaining === 'number') {
        saveUsage(askAiError.remaining, askAiError.resetInSeconds ?? 0)
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
    status,
    setMessage,
    submitMessage,
  }
}
