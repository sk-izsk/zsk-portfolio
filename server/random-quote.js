const QUOTE_SOURCE_URL =
  'https://raw.githubusercontent.com/mudroljub/programming-quotes-api/master/data/quotes.json'
const QUOTE_CACHE_TTL_MS = 1000 * 60 * 60
const QUOTE_BATCH_SIZE = 10

let cachedQuotes = []
let cachedAt = 0

const normalizeQuote = (item) => {
  const text = typeof item?.text === 'string' ? item.text.trim() : ''
  const author = typeof item?.author === 'string' ? item.author.trim() : ''

  if (!text || !author) {
    return null
  }

  return { text, author }
}

const fetchQuoteCatalog = async (fetchImpl = fetch) => {
  const response = await fetchImpl(QUOTE_SOURCE_URL, {
    headers: {
      accept: 'application/json',
    },
    signal: AbortSignal.timeout(4000),
  })

  if (!response.ok) {
    throw new Error(`Quote upstream failed with ${response.status}`)
  }

  const payload = await response.json()

  if (!Array.isArray(payload)) {
    throw new Error('Quote upstream returned an unexpected payload')
  }

  const quotes = payload.map(normalizeQuote).filter(Boolean)

  if (!quotes.length) {
    throw new Error('Quote upstream returned no usable quotes')
  }

  cachedQuotes = quotes
  cachedAt = Date.now()

  return cachedQuotes
}

export const getQuoteCatalog = async (fetchImpl = fetch) => {
  if (cachedQuotes.length && Date.now() - cachedAt < QUOTE_CACHE_TTL_MS) {
    return cachedQuotes
  }

  return fetchQuoteCatalog(fetchImpl)
}

export const getRandomQuoteBatch = async (fetchImpl = fetch, batchSize = QUOTE_BATCH_SIZE) => {
  const quotes = await getQuoteCatalog(fetchImpl)
  const pool = [...quotes]
  const size = Math.max(1, Math.min(batchSize, pool.length))
  const batch = []

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]]
  }

  for (let index = 0; index < size; index += 1) {
    const quote = pool[index]

    if (quote) {
      batch.push(quote)
    }
  }

  return batch
}
