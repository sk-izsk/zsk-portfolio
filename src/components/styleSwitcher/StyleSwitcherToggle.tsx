import * as styles from '@components/styleSwitcher/styleSwitcher.css'
import { createCn } from '@utils/cn'
import type { LucideIcon } from 'lucide-react'
import React from 'react'

const cn = createCn(styles)

interface StyleSwitcherToggleProps {
  isActive: boolean
  label: string
  icon: LucideIcon
  onClick: () => void
}

export const StyleSwitcherToggle: React.FC<StyleSwitcherToggleProps> = ({
  isActive,
  label,
  icon: Icon,
  onClick,
}) => (
  <button
    className={cn('toggleButton', { toggleButtonActive: isActive })}
    type="button"
    onClick={onClick}
  >
    <span className={styles.toggleButtonLabel}>{label}</span>
    <Icon className={styles.toggleButtonIcon} size={16} />
  </button>
)
