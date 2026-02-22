import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef, useState } from "react"
import {
  colorItem,
  colors,
  dayNight,
  dayNightIcon,
  heading,
  s_icon,
  settingsIcon,
  styleSwitcher,
  styleSwitcherOpen,
  styleSwitcherToggler,
} from "./styleSwitcher.css"

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
  const [activeColor, setActiveColor] = useState(currentColor)
  const styleSwitcherRef = useRef<HTMLDivElement>(null)

  const colorOptions = [
    { name: "color-1", color: "#ec1839" },
    { name: "color-2", color: "#fa5b0f" },
    { name: "color-3", color: "#37b182" },
    { name: "color-4", color: "#1854b4" },
    { name: "color-5", color: "#f021b2" },
  ]

  const toggleSwitcher = () => {
    setIsOpen(!isOpen)
  }

  const handleColorChange = (colorName: string) => {
    setActiveColor(colorName)
    onChangeColor(colorName)
  }

  // Sync activeColor with currentColor prop
  useEffect(() => {
    setActiveColor(currentColor)
  }, [currentColor])

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
      <div className={styleSwitcherToggler} onClick={toggleSwitcher}>
        <FontAwesomeIcon icon="cog" className={`${s_icon} ${settingsIcon}`} />
      </div>
      <div className={dayNight} onClick={onToggleDarkMode}>
        <FontAwesomeIcon
          icon={isDarkMode ? "sun" : "moon"}
          className={`${s_icon} ${dayNightIcon}`}
        />
      </div>
      <h4 className={heading}>Theme Colors</h4>
      <div className={colors}>
        {colorOptions.map((color) => (
          <span
            key={color.name}
            className={`${colorItem} ${color.name} ${activeColor === color.name ? "active" : ""}`}
            onClick={() => handleColorChange(color.name)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default StyleSwitcher
