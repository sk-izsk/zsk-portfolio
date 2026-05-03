import { Search } from 'lucide-react'
import React, { type ChangeEvent, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react'
import * as styles from './tagMultiSelectPicker.css'

interface TagPickerSearchInputProps {
  ariaLabel: string
  placeholder: string
  value: string
  disabled: boolean
  inputRef: RefObject<HTMLInputElement | null>
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (event: ReactKeyboardEvent<HTMLInputElement>) => void
}

export const TagPickerSearchInput: React.FC<TagPickerSearchInputProps> = ({
  ariaLabel,
  placeholder,
  value,
  disabled,
  inputRef,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className={styles.searchRow}>
      <Search className={styles.searchIcon} size={16} aria-hidden="true" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={styles.input}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
      />
    </div>
  )
}
