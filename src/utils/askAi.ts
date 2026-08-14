import type { ChatMessage } from '@app-types/askAi'
import { HTTPError } from 'ky'

interface AskAiErrorDetail {
  message?: string
  remaining?: number
  reset_in_seconds?: number
}

export const HEALTH_OVERLAY_DELAY_MS = 1200

export const toAskAiMessageId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

export const formatResetTime = (seconds: number) => {
  const totalMinutes = Math.max(1, Math.ceil(seconds / 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (!hours) {
    return `${totalMinutes}m`
  }

  return minutes ? `${hours}h ${minutes}m` : `${hours}h`
}

export const getAskAiSuggestions = (
  prompts: string[],
  message: string,
  messages: ChatMessage[],
  isSending: boolean,
) => {
  const lastMessageIsAssistant = messages[messages.length - 1]?.role === 'assistant'

  if (!lastMessageIsAssistant || isSending) {
    return []
  }

  const typedMessage = message.trim()
  if (!typedMessage) {
    return prompts.slice(0, 4)
  }

  const normalizedTypedMessage = typedMessage.toLowerCase()

  return prompts
    .filter((prompt) => prompt.toLowerCase() !== normalizedTypedMessage)
    .sort(
      (left, right) =>
        Number(right.toLowerCase().includes(normalizedTypedMessage)) -
        Number(left.toLowerCase().includes(normalizedTypedMessage)),
    )
    .slice(0, 3)
}

export const readAskAiError = async (
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
