import { Check } from 'lucide-react'
import React from 'react'
import type { TagPickerOption } from '../../types/tagPickerTypes'
import * as styles from './tagMultiSelectPicker.css'
import { createCn } from '@utils/cn'

interface TagPickerListItemProps {
  option: TagPickerOption
  isSelected: boolean
  isDisabled: boolean
  onSelect: (value: string) => void
  onRemove: (value: string) => void
}
const cn = createCn(styles)

export const TagPickerListItem: React.FC<TagPickerListItemProps> = ({
  option,
  isSelected,
  isDisabled,
  onSelect,
  onRemove,
}) => {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      disabled={isDisabled}
      className={cn('option', {
        optionSelected: isSelected,
        optionDisabled: isDisabled,
      })}
      onClick={() => (isSelected ? onRemove(option.value) : onSelect(option.value))}
    >
      <span className={styles.optionLabel}>{option.label}</span>
      {isSelected ? <Check size={16} className={styles.optionCheck} aria-hidden="true" /> : null}
    </button>
  )
}
