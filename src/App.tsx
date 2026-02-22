import { library } from "@fortawesome/fontawesome-svg-core"
import { faReadme } from "@fortawesome/free-brands-svg-icons"
import {
  faBookOpenReader,
  faBriefcase,
  faBullhorn,
  faCalendar,
  faCalendarDays,
  faCode,
  faCog,
  faComments,
  faEnvelope,
  faGlobeEurope,
  faHome,
  faLaptopCode,
  faList,
  faMapMarkerAlt,
  faMobileAlt,
  faMoon,
  faPalette,
  faPhone,
  faSearch,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useLocalStorageState } from "ahooks"
import { lazy, Suspense, useEffect, useState } from "react"
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom"

import { Bars } from "react-loader-spinner"
import Sidebar from "./components/Sidebar"
import StyleSwitcher from "./components/StyleSwitcher"
import { usePortfolioData } from "./hooks/usePortfolioData"
import { usePortfolioStore } from "./stores/portfolioStore"

import "./styles/style.css"

// Lazy loaded components
const Home = lazy(() => import("./components/Home"))
const About = lazy(() => import("./components/About"))
const Services = lazy(() => import("./components/Services"))
const Portfolio = lazy(() => import("./components/Portfolio"))
const Blog = lazy(() => import("./components/Blog"))
const Contact = lazy(() => import("./components/Contact"))

// Loading component
const PageLoader = () => {
  const [currentColor] = useLocalStorageState("portfolio-color-theme", {
    defaultValue: "color-1",
  })
  console.log("currentColor: ", currentColor)
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
  faSun,
  faMoon,
  faReadme,
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
}

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
    if (path === "/blog") return "blog"
    if (path === "/contact") return "contact"
    return "home"
  }

  useEffect(() => {
    // Set initial dark mode
    document.body.className = isDarkMode ? "dark" : ""
  }, [isDarkMode])

  useEffect(() => {
    // Update color theme using CSS custom property
    document.documentElement.style.setProperty(
      "--skin-color",
      colorThemes[currentColor as keyof typeof colorThemes],
    )
  }, [currentColor])

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

      <div className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>

      <StyleSwitcher
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onChangeColor={changeColor}
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
