import { faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { s_icon, settingsIcon, styleSwitcherToggler } from "./styleSwitcher.css"
import { StyleSwitcherThemeColors } from "./StyleSwitcherThemeColors"

interface StyleSwitcherSettingsProps {
  currentColor: string
  isOpen: boolean
  onToggleOpen: () => void
  onChangeColor: (color: string) => void
}

export const StyleSwitcherSettings: React.FC<StyleSwitcherSettingsProps> = ({
  currentColor,
  isOpen,
  onToggleOpen,
  onChangeColor,
}) => {
  return (
    <>
      <div
        className={styleSwitcherToggler}
        onClick={onToggleOpen}
        aria-expanded={isOpen}
      >
        <FontAwesomeIcon icon={faCog} className={`${s_icon} ${settingsIcon}`} />
      </div>
      <StyleSwitcherThemeColors
        currentColor={currentColor}
        onChangeColor={onChangeColor}
      />
    </>
  )
}
