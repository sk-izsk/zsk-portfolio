import ky from 'ky'
import type { HashnodeGraphQLResponse } from './hashnode.types'

const HASHNODE_GRAPHQL_ENDPOINT = 'https://gql.hashnode.com'

interface GraphQLRequestBody {
  query: string
  variables?: Record<string, unknown>
}

export const hashnodeGraphqlRequest = async <TData>({
  query,
  variables,
}: GraphQLRequestBody): Promise<TData> => {
  const response = await ky
    .post(HASHNODE_GRAPHQL_ENDPOINT, {
      json: {
        query,
        variables,
      },
    })
    .json<HashnodeGraphQLResponse<TData>>()

  if (response.errors?.length) {
    const message = response.errors.map((error) => error.message).join(', ')
    throw new Error(message || 'Hashnode GraphQL request failed')
  }

  if (!response.data) {
    throw new Error('Hashnode GraphQL request returned no data')
  }

  return response.data
}
