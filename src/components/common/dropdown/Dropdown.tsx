import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import * as styles from '@components/common/dropdown/dropdown.css'

export interface DropdownOption<T extends string> {
  value: T
  label: string
}

interface DropdownProps<T extends string> {
  value: T
  options: DropdownOption<T>[]
  onChange: (value: T) => void
  ariaLabel: string
  className?: string
}

export const Dropdown = <T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  className = '',
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  const selectedOption = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={rootRef} className={[styles.root, className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={[styles.trigger, isOpen ? styles.triggerOpen : ''].filter(Boolean).join(' ')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.triggerLabel}>{selectedOption?.label ?? ''}</span>
        <ChevronDown
          className={[styles.chevron, isOpen ? styles.chevronOpen : ''].filter(Boolean).join(' ')}
          size={18}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div id={listboxId} role="listbox" className={styles.menu} aria-label={ariaLabel}>
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={[styles.option, isSelected ? styles.optionSelected : '']
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
