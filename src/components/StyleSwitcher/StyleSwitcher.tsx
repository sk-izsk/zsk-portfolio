import React, { useEffect, useRef, useState } from "react"
import { useThemeStore } from "../../stores/themeStore"
import {
  color10Theme,
  color1Theme,
  color2Theme,
  color3Theme,
  color4Theme,
  color5Theme,
  color6Theme,
  color7Theme,
  color8Theme,
  color9Theme,
  darkColor10Theme,
  darkColor1Theme,
  darkColor2Theme,
  darkColor3Theme,
  darkColor4Theme,
  darkColor5Theme,
  darkColor6Theme,
  darkColor7Theme,
  darkColor8Theme,
  darkColor9Theme,
  darkTheme,
  lightTheme,
} from "../../styles/themes.css"
import { styleSwitcher, styleSwitcherOpen } from "./styleSwitcher.css"
import { StyleSwitcherSettings } from "./StyleSwitcherSettings"
import { StyleSwitcherToggleTheme } from "./StyleSwitcherToggleTheme"

export const StyleSwitcher: React.FC = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const currentColor = useThemeStore((state) => state.currentColor)
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode)
  const setCurrentColor = useThemeStore((state) => state.setCurrentColor)
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
    document.body.className = ""

    let themeClass = lightTheme

    if (isDarkMode) {
      if (currentColor === "color-1") themeClass = darkColor1Theme
      else if (currentColor === "color-2") themeClass = darkColor2Theme
      else if (currentColor === "color-3") themeClass = darkColor3Theme
      else if (currentColor === "color-4") themeClass = darkColor4Theme
      else if (currentColor === "color-5") themeClass = darkColor5Theme
      else if (currentColor === "color-6") themeClass = darkColor6Theme
      else if (currentColor === "color-7") themeClass = darkColor7Theme
      else if (currentColor === "color-8") themeClass = darkColor8Theme
      else if (currentColor === "color-9") themeClass = darkColor9Theme
      else if (currentColor === "color-10") themeClass = darkColor10Theme
      else themeClass = darkTheme
    } else {
      if (currentColor === "color-1") themeClass = color1Theme
      else if (currentColor === "color-2") themeClass = color2Theme
      else if (currentColor === "color-3") themeClass = color3Theme
      else if (currentColor === "color-4") themeClass = color4Theme
      else if (currentColor === "color-5") themeClass = color5Theme
      else if (currentColor === "color-6") themeClass = color6Theme
      else if (currentColor === "color-7") themeClass = color7Theme
      else if (currentColor === "color-8") themeClass = color8Theme
      else if (currentColor === "color-9") themeClass = color9Theme
      else if (currentColor === "color-10") themeClass = color10Theme
      else themeClass = lightTheme
    }

    document.body.classList.add(themeClass)
  }, [isDarkMode, currentColor])

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
        onChangeColor={setCurrentColor}
      />
      <StyleSwitcherToggleTheme
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </div>
  )
}
