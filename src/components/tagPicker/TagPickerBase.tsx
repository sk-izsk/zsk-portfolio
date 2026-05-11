import { tagBase, tagLabel } from '@components/tag/tag.css'
import { ChevronDown, X } from 'lucide-react'
import React from 'react'
import type { TagPickerOption } from '../../types/tagPickerTypes'
import * as styles from './tagMultiSelectPicker.css'
import { createCn, raw } from '@utils/cn'

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
const cn = createCn(styles)

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
      className={cn('fieldButton', { fieldButtonOpen: isOpen })}
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
                <span key={value} className={cn(raw(tagBase), 'selectedChip')}>
                  <span className={cn('selectedChipLabel', raw(tagLabel))}>
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
              <span className={cn(raw(tagBase), 'selectedChip', 'selectedChipSummary')}>
                +{hiddenSelectedCount}
              </span>
            ) : null}
          </div>
        ) : (
          <span className={styles.placeholderText}>{placeholder}</span>
        )}
      </div>
      <ChevronDown
        className={cn('chevron', { chevronOpen: isOpen })}
        size={18}
        aria-hidden="true"
      />
    </button>
  )
}
