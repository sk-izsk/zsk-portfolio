import { tagBase, tagLabel } from '@components/tag/tag.css'
import { ChevronDown, X } from 'lucide-react'
import React from 'react'
import type { TagPickerOption } from '../../types/tagPickerTypes'
import * as styles from './tagMultiSelectPicker.css'

interface TagPickerBaseProps {
  ariaLabel: string
  isOpen: boolean
  placeholder: string
  selectedValues: string[]
  visibleSelectedValues: string[]
  hiddenSelectedCount: number
  selectedOptionMap: Map<string, TagPickerOption>
  onRemove: (value: string) => void
  onToggle: () => void
}

export const TagPickerBase: React.FC<TagPickerBaseProps> = ({
  ariaLabel,
  isOpen,
  placeholder,
  selectedValues,
  visibleSelectedValues,
  hiddenSelectedCount,
  selectedOptionMap,
  onRemove,
  onToggle,
}) => {
  return (
    <button
      type="button"
      className={[styles.fieldButton, isOpen ? styles.fieldButtonOpen : '']
        .filter(Boolean)
        .join(' ')}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-label={ariaLabel}
      onClick={onToggle}
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
                      onRemove(value)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        event.stopPropagation()
                        onRemove(value)
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
              <span
                className={[tagBase, styles.selectedChip, styles.selectedChipSummary].join(' ')}
              >
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
  )
}
