import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useLocalStorageState } from "ahooks"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { PopupWidget } from "react-calendly"
import { BrowserRouter as Router, useLocation } from "react-router-dom"

import { usePortfolioData } from "../hooks/usePortfolioData"
import { usePortfolioStore } from "../stores/portfolioStore"
import "../styles/global.css"
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
} from "../styles/themes.css"
import { Sidebar } from "./Sidebar/Sidebar"
import { StyleSwitcher } from "./StyleSwitcher/StyleSwitcher"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

const colorThemes = {
  "color-1": "#ec1839",
  "color-2": "#fa5b0f",
  "color-3": "#37b182",
  "color-4": "#1854b4",
  "color-5": "#f021b2",
  "color-6": "#8a2be2",
  "color-7": "#daa520",
  "color-8": "#00ced1",
  "color-9": "#00bfff",
  "color-10": "#2e8b57",
} as const

const stripHexPrefix = (value: string) => value.replace(/^#/, "")

const getCurrentSection = (path: string) => {
  if (path === "/" || path === "/home") return "home"
  if (path === "/about") return "about"
  if (path === "/services") return "service"
  if (path === "/portfolio") return "portfolio"
  if (path === "/projects" || path === "/blog") return "projects"
  if (path === "/contact") return "contact"
  return "home"
}

type AppWrapperProps = {
  children: ReactNode
}

const AppLayout = ({ children }: AppWrapperProps) => {
  const location = useLocation()
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    "portfolio-dark-mode",
    {
      defaultValue: true,
    },
  )
  const [currentColor, setCurrentColor] = useLocalStorageState(
    "portfolio-color-theme",
    {
      defaultValue: "color-1",
    },
  )
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const currentAccentColor =
    colorThemes[currentColor as keyof typeof colorThemes] ??
    colorThemes["color-1"]
  const calendlyRootElement = document.getElementById("root") ?? document.body

  const portfolioQuery = usePortfolioData()
  const { setData, setLoading, setError } = usePortfolioStore()

  useEffect(() => {
    setLoading(portfolioQuery.isLoading)

    if (portfolioQuery.data) {
      setData(portfolioQuery.data)
    }

    if (portfolioQuery.error) {
      setError(portfolioQuery.error.message)
    }
  }, [
    portfolioQuery.isLoading,
    portfolioQuery.data,
    portfolioQuery.error,
    setData,
    setLoading,
    setError,
  ])

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
    if (window.innerWidth >= 1200 || !isSidebarOpen) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setIsSidebarOpen(false)
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [location.pathname, isSidebarOpen])

  return (
    <div className="main-container">
      <Sidebar
        activeSection={getCurrentSection(location.pathname)}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prevState) => !prevState)}
      />

      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {children}
      </div>

      <StyleSwitcher
        isDarkMode={isDarkMode}
        currentColor={currentColor}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onChangeColor={(color: string) => setCurrentColor(color)}
      />

      <PopupWidget
        url="https://calendly.com/izsk/60min"
        rootElement={calendlyRootElement}
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
    </div>
  )
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppLayout>{children}</AppLayout>
      </Router>
    </QueryClientProvider>
  )
}
