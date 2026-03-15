import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faReadme,
  faTelegram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import {
  faBookOpenReader,
  faBriefcase,
  faBullhorn,
  faCalendar,
  faCalendarDays,
  faCode,
  faCog,
  faCogs,
  faComments,
  faCubes,
  faDatabase,
  faEnvelope,
  faGlobeEurope,
  faGraduationCap,
  faHome,
  faLaptopCode,
  faList,
  faMapMarkerAlt,
  faMobileAlt,
  faMoon,
  faPalette,
  faPhone,
  faSearch,
  faServer,
  faSun,
  faUser,
  faVial,
} from "@fortawesome/free-solid-svg-icons"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useLocalStorageState } from "ahooks"
import { lazy, Suspense, useEffect, useState } from "react"
import { PopupWidget } from "react-calendly"
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom"

import { Bars } from "react-loader-spinner"
import Sidebar from "./components/Sidebar/Sidebar"
import StyleSwitcher from "./components/StyleSwitcher/StyleSwitcher"
import { usePortfolioData } from "./hooks/usePortfolioData"
import { usePortfolioStore } from "./stores/portfolioStore"

// Import vanilla-extract styles
import "./styles/global.css"
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
} from "./styles/themes.css"

// Lazy loaded components
const Home = lazy(() => import("./screens/HomeScreen"))
const About = lazy(() => import("./screens/AboutScreen"))
const Services = lazy(() => import("./components/Services/Services"))
const Skills = lazy(() => import("./components/Skills/Skills"))
const Projects = lazy(() => import("./screens/ProjectScreen"))
const Contact = lazy(() => import("./screens/ContactScreen"))

// Loading component
const PageLoader = () => {
  const [currentColor] = useLocalStorageState("portfolio-color-theme", {
    defaultValue: "color-1",
  })
  return (
    <div className="page-loader">
      <div className="loading">
        <Bars
          height="80"
          width="80"
          color={colorThemes[currentColor as keyof typeof colorThemes]}
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  )
}

// Add icons to library
library.add(
  faHome,
  faUser,
  faList,
  faBriefcase,
  faComments,
  faPhone,
  faMapMarkerAlt,
  faEnvelope,
  faGlobeEurope,
  faMobileAlt,
  faLaptopCode,
  faPalette,
  faCode,
  faSearch,
  faBullhorn,
  faCalendar,
  faBookOpenReader,
  faCalendarDays,
  faCog,
  faCogs,
  faSun,
  faMoon,
  faReadme,
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
  faTelegram,
  faServer,
  faDatabase,
  faCubes,
  faGraduationCap,
  faVial,
)

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

// Color themes configuration
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
}

const stripHexPrefix = (value: string) => value.replace(/^#/, "")

// Main App Content Component
function AppContent() {
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

  // Fetch portfolio data once and update Zustand store
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

  // Get current route for active section
  const getCurrentSection = () => {
    const path = location.pathname
    if (path === "/" || path === "/home") return "home"
    if (path === "/about") return "about"
    if (path === "/services") return "service"
    if (path === "/portfolio") return "portfolio"
    if (path === "/projects" || path === "/blog") return "projects"
    if (path === "/contact") return "contact"
    return "home"
  }

  useEffect(() => {
    // Apply vanilla-extract theme classes
    document.body.className = ""

    // Apply theme based on dark mode and color
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const changeColor = (color: string) => {
    setCurrentColor(color)
  }

  // Close sidebar on mobile after navigation
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 1200) {
        setIsSidebarOpen(false)
      }
    }

    handleRouteChange()
  }, [location.pathname])

  return (
    <div className="main-container">
      <Sidebar
        activeSection={getCurrentSection()}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>

      <StyleSwitcher
        isDarkMode={isDarkMode}
        currentColor={currentColor}
        onToggleDarkMode={toggleDarkMode}
        onChangeColor={changeColor}
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  )
}

export default App
