import { Settings } from 'lucide-react'
import React from 'react'
import type { ThemeColor } from '@stores/themeStore'
import { s_icon, settingsIcon, styleSwitcherToggler } from '@components/styleSwitcher/styleSwitcher.css'
import { StyleSwitcherThemeColors } from '@components/styleSwitcher/StyleSwitcherThemeColors'

interface StyleSwitcherSettingsProps {
  currentColor: string
  isOpen: boolean
  onToggleOpen: () => void
  onChangeColor: (color: ThemeColor) => void
}

export const StyleSwitcherSettings: React.FC<StyleSwitcherSettingsProps> = ({
  currentColor,
  isOpen,
  onToggleOpen,
  onChangeColor,
}) => {
  return (
    <>
      <div className={styleSwitcherToggler} onClick={onToggleOpen} aria-expanded={isOpen}>
        <Settings className={`${s_icon} ${settingsIcon}`} size={16} />
      </div>
      <StyleSwitcherThemeColors currentColor={currentColor} onChangeColor={onChangeColor} />
    </>
  )
}
