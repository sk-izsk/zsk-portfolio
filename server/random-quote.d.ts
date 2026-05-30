import type { QuoteItem } from '../src/utils/githubHighlights'

export declare const getQuoteCatalog: (fetchImpl?: typeof fetch) => Promise<QuoteItem[]>
export declare const getRandomQuoteBatch: (
  fetchImpl?: typeof fetch,
  batchSize?: number,
) => Promise<QuoteItem[]>
