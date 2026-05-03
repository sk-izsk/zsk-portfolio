import { Check, ChevronDown, Search, X } from 'lucide-react'
import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { tagBase, tagLabel } from '@components/tag/tag.css'
import * as styles from './tagMultiSelectPicker.css'

export interface TagPickerOption {
  value: string
  label: string
}

interface TagMultiSelectPickerProps {
  options: TagPickerOption[]
  selectedValues: string[]
  onChange: (next: string[]) => void
  maxSelected?: number
  maxResults?: number
  maxVisibleTags?: number
  visibleRows?: number
  placeholder: string
  ariaLabel: string
  emptyLabel: string
  loadingLabel?: string
  resolveOptionByQuery?: (query: string) => Promise<TagPickerOption | null>
}

const normalizeSearchValue = (value: string) => value.trim().toLowerCase()

export const TagMultiSelectPicker: React.FC<TagMultiSelectPickerProps> = ({
  options,
  selectedValues,
  onChange,
  maxSelected = 5,
  maxResults = 10,
  maxVisibleTags = 3,
  visibleRows = 5,
  placeholder,
  ariaLabel,
  emptyLabel,
  loadingLabel = 'Loading tags...',
  resolveOptionByQuery,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [remoteOption, setRemoteOption] = useState<TagPickerOption | null>(null)
  const [isResolvingOption, setIsResolvingOption] = useState(false)
  const [hasMoreBelow, setHasMoreBelow] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollViewportRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const canAddMore = selectedValues.length < maxSelected

  const optionMap = useMemo(() => {
    const entries = options.map((option) => [option.value, option] as const)
    return new Map(entries)
  }, [options])

  const selectedOptionMap = useMemo(() => {
    const entries = selectedValues.map((value) => [
      value,
      optionMap.get(value) ?? {
        value,
        label: value,
      },
    ] as const)

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

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const viewport = scrollViewportRef.current
    const content = scrollContentRef.current

    if (!viewport) {
      return
    }

    const updateScrollState = () => {
      setHasMoreBelow(viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 2)
    }

    updateScrollState()

    viewport.addEventListener('scroll', updateScrollState, { passive: true })

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            updateScrollState()
          })
        : null

    resizeObserver?.observe(viewport)

    if (content) {
      resizeObserver?.observe(content)
    }

    return () => {
      viewport.removeEventListener('scroll', updateScrollState)
      resizeObserver?.disconnect()
    }
  }, [isOpen, selectedValues, visibleOptions, isResolvingOption])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value) || !canAddMore) {
      return
    }

    const nextValues = [...selectedValues, value].sort((left, right) => left.localeCompare(right))
    onChange(nextValues)
    setQuery('')
    setRemoteOption(null)
  }

  const handleRemove = (value: string) => {
    onChange(selectedValues.filter((selectedValue) => selectedValue !== value))
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && query.length === 0 && selectedValues.length > 0) {
      handleRemove(selectedValues[selectedValues.length - 1])
      return
    }

    if (event.key === 'Enter' && visibleOptions.length > 0) {
      event.preventDefault()
      handleSelect(visibleOptions[0].value)
    }
  }

  const handleScrollCueClick = () => {
    const viewport = scrollViewportRef.current

    if (!viewport) {
      return
    }

    const top = viewport.scrollTop + Math.round(viewport.clientHeight * 0.7)

    viewport.scrollTo({
      top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={[styles.fieldButton, isOpen ? styles.fieldButtonOpen : ''].filter(Boolean).join(' ')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        onClick={() => setIsOpen((open) => !open)}
      >
        <div className={styles.fieldInner}>
          {selectedValues.length > 0 ? (
            <div className={styles.selectedChipRow}>
              {visibleSelectedValues.map((value) => {
                const selectedOption = selectedOptionMap.get(value)

                return (
                  <span key={value} className={[tagBase, styles.selectedChip].join(' ')}>
                    <span className={[tagLabel, styles.selectedChipLabel].join(' ')}>
                      {selectedOption?.label ?? value}
                    </span>
                    <span
                      className={styles.selectedChipRemove}
                      onClick={(event) => {
                        event.stopPropagation()
                        handleRemove(value)
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          event.stopPropagation()
                          handleRemove(value)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Remove ${selectedOption?.label ?? value}`}
                    >
                      <X size={11} aria-hidden="true" />
                    </span>
                  </span>
                )
              })}
              {hiddenSelectedCount > 0 ? (
                <span className={[tagBase, styles.selectedChip, styles.selectedChipSummary].join(' ')}>
                  +{hiddenSelectedCount}
                </span>
              ) : null}
            </div>
          ) : (
            <span className={styles.placeholderText}>{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={[styles.chevron, isOpen ? styles.chevronOpen : ''].filter(Boolean).join(' ')}
          size={18}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div className={styles.panel}>
          <div className={styles.searchRow}>
            <Search className={styles.searchIcon} size={16} aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={styles.input}
              placeholder={placeholder}
              disabled={!canAddMore}
              aria-label={ariaLabel}
            />
          </div>

          <div
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            className={styles.resultsViewport}
            ref={scrollViewportRef}
            style={{ maxHeight: `calc(${visibleRows} * var(--tag-picker-row-height))` }}
          >
            <div ref={scrollContentRef} className={styles.resultsContent}>
              {visibleOptions.length > 0 ? (
                visibleOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value)
                  const isDisabled = !canAddMore && !isSelected

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      disabled={isDisabled}
                      className={[
                        styles.option,
                        isSelected ? styles.optionSelected : '',
                        isDisabled ? styles.optionDisabled : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleSelect(option.value)}
                    >
                      <span className={styles.optionLabel}>{option.label}</span>
                      {isSelected ? <Check size={16} className={styles.optionCheck} aria-hidden="true" /> : null}
                    </button>
                  )
                })
              ) : isResolvingOption ? (
                <div className={styles.emptyState}>{loadingLabel}</div>
              ) : (
                <div className={styles.emptyState}>{emptyLabel}</div>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label="Scroll for more tags"
            aria-hidden={!hasMoreBelow}
            data-visible={hasMoreBelow ? 'true' : 'false'}
            className={[
              styles.scrollCue,
              hasMoreBelow ? styles.scrollCueVisible : styles.scrollCueHidden,
              prefersReducedMotion ? styles.scrollCueReducedMotion : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={handleScrollCueClick}
            tabIndex={hasMoreBelow ? 0 : -1}
          >
            <ChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  )
}
