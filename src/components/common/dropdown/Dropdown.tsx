import * as styles from '@components/common/dropdown/dropdown.css'
import { createCn, raw } from '@utils/cn'
import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

interface DropdownOption<T extends string> {
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
const cn = createCn(styles)

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
    <div ref={rootRef} className={cn('root', raw(className))}>
      <button
        type="button"
        className={cn('trigger', { triggerOpen: isOpen })}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.triggerLabel}>{selectedOption?.label ?? ''}</span>
        <ChevronDown
          className={cn('chevron', { chevronOpen: isOpen })}
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
                className={cn('option', { optionSelected: isSelected })}
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
