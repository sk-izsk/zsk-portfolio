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

export const formatAskAiProvider = (provider?: string, cached = false) => {
  if (cached || provider === 'cache') {
    return 'cached'
  }

  if (provider === 'google') {
    const model = import.meta.env.VITE_ASK_AI_GOOGLE_MODEL || 'gemini-3.6-flash'
    return import.meta.env.DEV ? `powered by Gemini (${model})` : 'powered by Gemini'
  }

  if (provider === 'groq') {
    const model = import.meta.env.VITE_ASK_AI_GROQ_MODEL || 'openai/gpt-oss-120b'
    return import.meta.env.DEV ? `powered by Groq (${model})` : 'powered by Groq'
  }

  return null
}

export const getAskAiSuggestions = (
  prompts: string[],
  messages: ChatMessage[],
  isSending: boolean,
) => {
  const lastMessageIsAssistant = messages[messages.length - 1]?.role === 'assistant'

  if (!lastMessageIsAssistant || isSending) {
    return []
  }

  return prompts.slice(0, 4)
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
