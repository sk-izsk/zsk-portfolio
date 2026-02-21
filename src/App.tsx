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
import { useEffect, useState } from "react"

import About from "./components/About"
import Blog from "./components/Blog"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Portfolio from "./components/Portfolio"
import Services from "./components/Services"
import Sidebar from "./components/Sidebar"
import StyleSwitcher from "./components/StyleSwitcher"

import "./styles/style.css"

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

function App() {
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentColor, setCurrentColor] = useState("color-1")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const colorThemes = {
    "color-1": "#ec1839",
    "color-2": "#fa5b0f",
    "color-3": "#37b182",
    "color-4": "#1854b4",
    "color-5": "#f021b2",
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

  const handleNavigation = (section: string) => {
    setActiveSection(section)
    if (window.innerWidth < 1200) {
      setIsSidebarOpen(false)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const changeColor = (color: string) => {
    setCurrentColor(color)
  }

  return (
    <div className="main-container">
      <Sidebar
        activeSection={activeSection}
        onNavigation={handleNavigation}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="main-content">
        <Home isActive={activeSection === "home"} />
        <About isActive={activeSection === "about"} />
        <Services isActive={activeSection === "service"} />
        <Portfolio isActive={activeSection === "portfolio"} />
        <Blog isActive={activeSection === "blog"} />
        <Contact isActive={activeSection === "contact"} />
      </div>

      <StyleSwitcher
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onChangeColor={changeColor}
      />
    </div>
  )
}

export default App
