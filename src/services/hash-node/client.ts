import ky from 'ky'
import type { HashNodeGraphQLResponse } from './types'

const HASH_NODE_GRAPHQL_ENDPOINT = 'https://gql.hashnode.com'

interface GraphQLRequestBody {
  query: string
  variables?: Record<string, unknown>
}

export const hashNodeGraphqlRequest = async <T>({
  query,
  variables,
}: GraphQLRequestBody): Promise<T> => {
  const response = await ky
    .post(HASH_NODE_GRAPHQL_ENDPOINT, {
      json: {
        query,
        variables,
      },
    })
    .json<HashNodeGraphQLResponse<T>>()

  if (response.errors?.length) {
    const message = response.errors.map((error) => error.message).join(', ')
    throw new Error(message || 'HashNode GraphQL request failed')
  }

  if (!response.data) {
    throw new Error('HashNode GraphQL request returned no data')
  }

  return response.data
}
