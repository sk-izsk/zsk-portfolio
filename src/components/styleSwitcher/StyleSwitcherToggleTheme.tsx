import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { dayNight, dayNightIcon, s_icon } from './styleSwitcher.css'

interface StyleSwitcherToggleThemeProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export const StyleSwitcherToggleTheme: React.FC<StyleSwitcherToggleThemeProps> = ({
  isDarkMode,
  onToggleDarkMode,
}) => {
  const ThemeIcon = isDarkMode ? Sun : Moon

  return (
    <div className={dayNight} onClick={onToggleDarkMode}>
      <ThemeIcon className={`${s_icon} ${dayNightIcon}`} size={16} />
    </div>
  )
}
