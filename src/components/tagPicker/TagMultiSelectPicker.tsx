import React, { useId, type ChangeEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useScrollableOverflow } from '../../hooks/useScrollableOverflow'
import { useTagMultiSelectPicker } from '../../hooks/tagPicker/useTagMultiSelectPicker'
import type { TagPickerOption } from '../../types/tagPickerTypes'
import * as styles from './tagMultiSelectPicker.css'
import { TagPickerBase } from './TagPickerBase'
import { TagPickerListContainer } from './TagPickerListContainer'
import { TagPickerListItem } from './TagPickerListItem'
import { TagPickerSearchInput } from './TagPickerSearchInput'

export type { TagPickerOption } from '../../types/tagPickerTypes'

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
  const listboxId = useId()
  const {
    rootRef,
    inputRef,
    scrollViewportRef,
    scrollContentRef,
    isOpen,
    setIsOpen,
    query,
    setQuery,
    setRemoteOption,
    isResolvingOption,
    prefersReducedMotion,
    canAddMore,
    selectedOptionMap,
    visibleSelectedValues,
    hiddenSelectedCount,
    visibleOptions,
  } = useTagMultiSelectPicker({
    options,
    selectedValues,
    maxSelected,
    maxResults,
    maxVisibleTags,
    resolveOptionByQuery,
  })

  const { hasMoreBelow } = useScrollableOverflow({
    isEnabled: isOpen,
    viewportRef: scrollViewportRef,
    contentRef: scrollContentRef,
    dependencies: [selectedValues, visibleOptions, isResolvingOption],
  })

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
      <TagPickerBase
        ariaLabel={ariaLabel}
        isOpen={isOpen}
        placeholder={placeholder}
        selectedValues={selectedValues}
        visibleSelectedValues={visibleSelectedValues}
        hiddenSelectedCount={hiddenSelectedCount}
        selectedOptionMap={selectedOptionMap}
        onRemove={handleRemove}
        onToggle={() => setIsOpen((open) => !open)}
      />

      {isOpen ? (
        <div className={styles.panel}>
          <TagPickerSearchInput
            ariaLabel={ariaLabel}
            placeholder={placeholder}
            value={query}
            disabled={!canAddMore}
            inputRef={inputRef}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          <TagPickerListContainer
            ariaLabel={ariaLabel}
            listboxId={listboxId}
            visibleRows={visibleRows}
            viewportRef={scrollViewportRef}
            contentRef={scrollContentRef}
            hasMoreBelow={hasMoreBelow}
            prefersReducedMotion={prefersReducedMotion}
            onScrollCueClick={handleScrollCueClick}
          >
            {visibleOptions.length > 0 ? (
              visibleOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                const isDisabled = !canAddMore && !isSelected

                return (
                  <TagPickerListItem
                    key={option.value}
                    option={option}
                    isSelected={isSelected}
                    isDisabled={isDisabled}
                    onSelect={handleSelect}
                    onRemove={handleRemove}
                  />
                )
              })
            ) : isResolvingOption ? (
              <div className={styles.emptyState}>{loadingLabel}</div>
            ) : (
              <div className={styles.emptyState}>{emptyLabel}</div>
            )}
          </TagPickerListContainer>
        </div>
      ) : null}
    </div>
  )
}
