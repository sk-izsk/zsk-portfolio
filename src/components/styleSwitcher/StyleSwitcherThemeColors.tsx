import React, { useEffect, useState } from "react"
import type { ThemeColor } from "../../stores/themeStore"
import { colorItem, colors, heading } from "./styleSwitcher.css"

interface StyleSwitcherThemeColorsProps {
  currentColor: string
  onChangeColor: (color: ThemeColor) => void
}

const colorOptions = [
  { name: "color-1", color: "#ec1839" },
  { name: "color-2", color: "#fa5b0f" },
  { name: "color-3", color: "#37b182" },
  { name: "color-5", color: "#f021b2" },
  { name: "color-7", color: "#daa520" },
  { name: "color-9", color: "#00bfff" },
] as const

export const StyleSwitcherThemeColors: React.FC<
  StyleSwitcherThemeColorsProps
> = ({ currentColor, onChangeColor }) => {
  const [activeColor, setActiveColor] = useState(currentColor)

  useEffect(() => {
    setActiveColor(currentColor)
  }, [currentColor])

  const handleColorChange = (colorName: ThemeColor) => {
    setActiveColor(colorName)
    onChangeColor(colorName)
  }

  return (
    <>
      <h4 className={heading}>Theme Colors</h4>
      <div className={colors}>
        {colorOptions.map((color) => (
          <span
            key={color.name}
            className={`${colorItem} ${color.name} ${activeColor === color.name ? "active" : ""}`}
            onClick={() => handleColorChange(color.name)}
            title={color.color}
          ></span>
        ))}
      </div>
    </>
  )
}
