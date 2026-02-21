import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"

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

  const colors = ["color-1", "color-2", "color-3", "color-4", "color-5"]

  const toggleSwitcher = () => {
    setIsOpen(!isOpen)
  }

  const handleColorChange = (color: string) => {
    onChangeColor(color)
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

  return (
    <div className={`style-switcher ${isOpen ? "open" : ""}`}>
      <div className="style-switcher-toggler s-icon" onClick={toggleSwitcher}>
        <FontAwesomeIcon icon="cog" spin />
      </div>
      <div className="day-night s-icon" onClick={onToggleDarkMode}>
        <FontAwesomeIcon icon={isDarkMode ? "sun" : "moon"} />
      </div>
      <h4>Theme Colors</h4>
      <div className="colors">
        {colors.map((color, index) => (
          <span
            key={color}
            className={`color-${index + 1}`}
            onClick={() => handleColorChange(color)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default StyleSwitcher
