import { getRandomQuoteBatch } from '../../server/random-quote.js'

export default async () => {
  try {
    const quotes = await getRandomQuoteBatch()

    return new Response(JSON.stringify(quotes), {
      status: 200,
      headers: {
        'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        'content-type': 'application/json; charset=utf-8',
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown quote API error'

    return new Response(JSON.stringify({ message }), {
      status: 502,
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    })
  }
}
