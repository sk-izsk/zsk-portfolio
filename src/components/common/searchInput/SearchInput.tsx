import { Search } from 'lucide-react'
import React from 'react'
import * as styles from './searchInput.css'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  ariaLabel: string
}

// ponytail: native type="search" gives the clear button and Escape-to-clear for free.
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
  ariaLabel,
}) => (
  <label className={styles.field}>
    <Search className={styles.icon} size={16} aria-hidden="true" />
    <input
      type="search"
      className={styles.input}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      autoComplete="off"
      enterKeyHint="search"
    />
  </label>
)
