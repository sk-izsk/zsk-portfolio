import type { ChatMessage } from '@app-types/askAi'
import { formatResetTime, getAskAiSuggestions } from '@utils/askAi'
import { describe, expect, it } from 'vitest'

const assistantMessage: ChatMessage = {
  id: 'assistant-1',
  role: 'assistant',
  text: 'Answer',
  sources: [],
  cached: false,
}

describe('askAi utils', () => {
  it('formats reset time into compact minutes and hours', () => {
    expect(formatResetTime(1)).toBe('1m')
    expect(formatResetTime(3600)).toBe('1h')
    expect(formatResetTime(3661)).toBe('1h 2m')
  })

  it('shows suggestions only after the latest assistant message', () => {
    const prompts = ['React work', 'Full-stack work', 'AI projects', 'React Native']

    expect(getAskAiSuggestions(prompts, '', [], false)).toEqual([])
    expect(
      getAskAiSuggestions(
        prompts,
        '',
        [assistantMessage, { id: 'user-1', role: 'user', text: 'Thanks' }],
        false,
      ),
    ).toEqual([])
    expect(getAskAiSuggestions(prompts, 'react', [assistantMessage], false)).toEqual([
      'React work',
      'React Native',
      'Full-stack work',
    ])
  })
})
