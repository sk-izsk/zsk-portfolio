import type { QuoteItem } from '../src/utils/githubHighlights'

export declare const getQuoteCatalog: (fetchImpl?: typeof fetch) => Promise<QuoteItem[]>
export declare const getRandomQuote: (fetchImpl?: typeof fetch) => Promise<QuoteItem>
