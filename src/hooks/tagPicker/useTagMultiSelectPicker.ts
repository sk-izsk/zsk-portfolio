import { useEffect, useMemo, useRef, useState } from 'react'
import type { TagPickerOption } from '../../types/tagPickerTypes'

interface UseTagMultiSelectPickerOptions {
  options: TagPickerOption[]
  selectedValues: string[]
  maxSelected: number
  maxResults: number
  maxVisibleTags: number
  resolveOptionByQuery?: (query: string) => Promise<TagPickerOption | null>
}

const normalizeSearchValue = (value: string) => value.trim().toLowerCase()

export const useTagMultiSelectPicker = ({
  options,
  selectedValues,
  maxSelected,
  maxResults,
  maxVisibleTags,
  resolveOptionByQuery,
}: UseTagMultiSelectPickerOptions) => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [remoteOption, setRemoteOption] = useState<TagPickerOption | null>(null)
  const [isResolvingOption, setIsResolvingOption] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollViewportRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  const canAddMore = selectedValues.length < maxSelected

  const optionMap = useMemo(() => {
    const entries = options.map((option) => [option.value, option] as const)
    return new Map(entries)
  }, [options])

  const selectedOptionMap = useMemo(() => {
    const entries = selectedValues.map(
      (value) =>
        [
          value,
          optionMap.get(value) ?? {
            value,
            label: value,
          },
        ] as const,
    )

    return new Map(entries)
  }, [optionMap, selectedValues])

  const visibleSelectedValues = useMemo(
    () => selectedValues.slice(0, maxVisibleTags),
    [maxVisibleTags, selectedValues],
  )
  const hiddenSelectedCount = Math.max(0, selectedValues.length - visibleSelectedValues.length)

  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(query)

    if (!normalizedQuery) {
      return options.slice(0, maxResults)
    }

    return options
      .filter((option) => {
        const label = option.label.toLowerCase()
        const value = option.value.toLowerCase()
        return label.includes(normalizedQuery) || value.includes(normalizedQuery)
      })
      .slice(0, maxResults)
  }, [maxResults, options, query])

  const visibleOptions = useMemo(() => {
    const merged = [...filteredOptions]

    if (
      remoteOption &&
      !merged.some((option) => option.value === remoteOption.value) &&
      (filteredOptions.length < maxResults || normalizeSearchValue(query) === remoteOption.value)
    ) {
      merged.unshift(remoteOption)
    }

    return merged.slice(0, maxResults)
  }, [filteredOptions, maxResults, query, remoteOption])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(mediaQuery.matches)

    update()
    mediaQuery.addEventListener('change', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
        setQuery('')
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    const normalizedQuery = normalizeSearchValue(query)

    if (!normalizedQuery || !resolveOptionByQuery) {
      setRemoteOption(null)
      setIsResolvingOption(false)
      return
    }

    if (
      options.some((option) => option.value === normalizedQuery) ||
      filteredOptions.some((option) => option.value === normalizedQuery)
    ) {
      setRemoteOption(null)
      setIsResolvingOption(false)
      return
    }

    let isActive = true
    setIsResolvingOption(true)

    void resolveOptionByQuery(normalizedQuery)
      .then((option) => {
        if (!isActive) {
          return
        }

        setRemoteOption(option)
        setIsResolvingOption(false)
      })
      .catch(() => {
        if (isActive) {
          setRemoteOption(null)
          setIsResolvingOption(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [filteredOptions, options, query, resolveOptionByQuery])

  return {
    rootRef,
    inputRef,
    scrollViewportRef,
    scrollContentRef,
    isOpen,
    setIsOpen,
    query,
    setQuery,
    remoteOption,
    setRemoteOption,
    isResolvingOption,
    prefersReducedMotion,
    canAddMore,
    selectedOptionMap,
    visibleSelectedValues,
    hiddenSelectedCount,
    visibleOptions,
  }
}
