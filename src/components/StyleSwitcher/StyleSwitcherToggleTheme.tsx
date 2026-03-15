import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { dayNight, dayNightIcon, s_icon } from "./styleSwitcher.css"

interface StyleSwitcherToggleThemeProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export const StyleSwitcherToggleTheme: React.FC<
  StyleSwitcherToggleThemeProps
> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <div className={dayNight} onClick={onToggleDarkMode}>
      <FontAwesomeIcon
        icon={isDarkMode ? faSun : faMoon}
        className={`${s_icon} ${dayNightIcon}`}
      />
    </div>
  )
}
