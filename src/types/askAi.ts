export type ChatMessage =
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
      provider?: string
    }

export type AskAiSubmitHandler = (message: string) => void | Promise<void>
