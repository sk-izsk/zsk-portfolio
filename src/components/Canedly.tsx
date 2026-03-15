import { PopupWidget } from "react-calendly"
import { useThemeStore } from "../stores/themeStore"

const colorThemes = {
  "color-1": "#ec1839",
  "color-2": "#fa5b0f",
  "color-3": "#37b182",
  "color-5": "#f021b2",
  "color-7": "#daa520",
  "color-9": "#00bfff",
} as const

const stripHexPrefix = (value: string) => value.replace(/^#/, "")

export const Canedly = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const currentColor = useThemeStore((state) => state.currentColor)

  const currentAccentColor =
    colorThemes[currentColor as keyof typeof colorThemes] ??
    colorThemes["color-1"]
  const rootElement = document.getElementById("root") ?? document.body

  return (
    <PopupWidget
      url="https://calendly.com/izsk/60min"
      rootElement={rootElement}
      text="Want to book a meeting ?"
      color={currentAccentColor}
      textColor="#ffffff"
      branding={false}
      pageSettings={{
        primaryColor: stripHexPrefix(currentAccentColor),
        backgroundColor: isDarkMode ? "151515" : "fdf9ff",
        textColor: isDarkMode ? "ffffff" : "302e4d",
      }}
    />
  )
}
