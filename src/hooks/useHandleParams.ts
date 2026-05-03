import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

type ParamValue = string | number | boolean | null | undefined
type ParamShape = Record<string, ParamValue>

const toQueryKey = (key: string) => key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)

const toObjectKey = (key: string) =>
  key.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())

export const useHandleParams = <TParams extends ParamShape>() => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentParams = useMemo(() => {
    const parsed = {} as Partial<TParams>

    searchParams.forEach((value, key) => {
      const objectKey = toObjectKey(key) as keyof TParams
      parsed[objectKey] = value as TParams[keyof TParams]
    })

    return parsed
  }, [searchParams])

  const updateParams = (params: Partial<TParams>) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)

        for (const [key, value] of Object.entries(params)) {
          const queryKey = toQueryKey(key)

          if (value === null || value === undefined || value === '') {
            next.delete(queryKey)
          } else {
            next.set(queryKey, String(value))
          }
        }

        return next
      },
      { replace: true },
    )
  }

  const clearParams = (keys: Array<keyof TParams>) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)

        for (const key of keys) {
          next.delete(toQueryKey(String(key)))
        }

        return next
      },
      { replace: true },
    )
  }

  return {
    currentParams,
    updateParams,
    clearParams,
  }
}
