import React, { useEffect, useRef, useState } from "react"
import { styleSwitcher, styleSwitcherOpen } from "./styleSwitcher.css"
import { StyleSwitcherSettings } from "./StyleSwitcherSettings"
import { StyleSwitcherToggleTheme } from "./StyleSwitcherToggleTheme"

interface StyleSwitcherProps {
  isDarkMode: boolean
  currentColor: string
  onToggleDarkMode: () => void
  onChangeColor: (color: string) => void
}

const StyleSwitcher: React.FC<StyleSwitcherProps> = ({
  isDarkMode,
  currentColor,
  onToggleDarkMode,
  onChangeColor,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const styleSwitcherRef = useRef<HTMLDivElement>(null)

  const toggleSwitcher = () => {
    setIsOpen(!isOpen)
  }

  // Hide style switcher on mouse wheel or touch move
  useEffect(() => {
    const handleHide = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    const handleWheel = () => handleHide()
    const handleTouchMove = () => handleHide()

    window.addEventListener("wheel", handleWheel)
    window.addEventListener("touchmove", handleTouchMove)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isOpen])

  // Handle click outside to close style switcher
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        styleSwitcherRef.current &&
        !styleSwitcherRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div
      ref={styleSwitcherRef}
      className={`${styleSwitcher} ${isOpen ? styleSwitcherOpen : ""}`}
    >
      <StyleSwitcherSettings
        currentColor={currentColor}
        isOpen={isOpen}
        onToggleOpen={toggleSwitcher}
        onChangeColor={onChangeColor}
      />
      <StyleSwitcherToggleTheme
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
    </div>
  )
}

export default StyleSwitcher
