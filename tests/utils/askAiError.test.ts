import ky from 'ky'
import { describe, expect, it } from 'vitest'
import { readAskAiError } from '@utils/askAi'

const copy = ['Something went wrong', 'Hourly limit reached', 'You look offline'] as const

// Real ky requests against a fake fetch, so the test breaks if ky changes how errors carry their body.
const failWith = async (fetch: typeof globalThis.fetch) => {
  try {
    await ky.post('https://api.test/chat', { fetch, retry: 0, json: { message: 'hi' } })
  } catch (error) {
    return readAskAiError(error, ...copy)
  }
  throw new Error('expected the request to fail')
}

describe('readAskAiError', () => {
  it('reads the remaining count and reset time from a 429', async () => {
    const body = {
      detail: { message: 'Rate limit exceeded', remaining: 0, reset_in_seconds: 3403 },
    }
    const result = await failWith(async () => Response.json(body, { status: 429 }))

    expect(result).toEqual({ message: 'Rate limit exceeded', remaining: 0, resetInSeconds: 3403 })
  })

  it('says offline when the connection fails', async () => {
    const result = await failWith(async () => {
      throw new TypeError('Failed to fetch')
    })

    expect(result.message).toBe('You look offline')
  })

  it('falls back to the generic message for other errors', async () => {
    const result = await failWith(async () => new Response('down', { status: 503 }))

    expect(result).toEqual({ message: 'Something went wrong' })
  })
})
