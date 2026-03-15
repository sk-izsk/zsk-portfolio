import {
  faBriefcase,
  faCogs,
  faComments,
  faHome,
  faList,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import {
  usePersonalInfo,
  usePortfolioLoading,
} from "../../stores/portfolioStore"
import { useSidebarStore } from "../../stores/sidebarStore"
import { SidebarNavItem } from "./SidebarNavItem"
import {
  aside,
  asideOpen,
  logo,
  logoA,
  logoSpan,
  nav,
  navToggler,
  navTogglerOpen,
  navTogglerOpenSpan,
  navTogglerSpan,
} from "./sidebar.css"
import type { SidebarNavigationItem } from "./sidebar.types"

const getCurrentSection = (path: string) => {
  if (path === "/" || path === "/home") return "home"
  if (path === "/about") return "about"
  if (path === "/services") return "service"
  if (path === "/portfolio") return "portfolio"
  if (path === "/projects" || path === "/blog") return "projects"
  if (path === "/contact") return "contact"
  return "home"
}

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const isOpen = useSidebarStore((state) => state.isOpen)
  const toggleSidebar = useSidebarStore((state) => state.toggle)
  const closeSidebar = useSidebarStore((state) => state.close)
  const activeSection = getCurrentSection(location.pathname)

  const navigationItems: SidebarNavigationItem[] = [
    { id: "home", label: "Home", icon: faHome, path: "/" },
    { id: "about", label: "About", icon: faUser, path: "/about" },
    { id: "service", label: "Services", icon: faList, path: "/services" },
    {
      id: "portfolio",
      label: "Skills",
      icon: faCogs,
      path: "/portfolio",
    },
    {
      id: "projects",
      label: "Projects",
      icon: faBriefcase,
      path: "/projects",
    },
    { id: "contact", label: "Contact", icon: faComments, path: "/contact" },
  ]

  const getLogoText = () => {
    if (loading || !personalInfo) return "Atlas"
    const firstName = personalInfo.name.split(" ")[1]
    return `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`
  }

  const handleNavClick = (itemId: string, event: React.MouseEvent) => {
    if (activeSection === itemId && isOpen) {
      event.preventDefault()
      toggleSidebar()
    }
  }

  useEffect(() => {
    if (window.innerWidth >= 1200 || !isOpen) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      closeSidebar()
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [location.pathname, closeSidebar])

  return (
    <div className={`${aside} ${isOpen ? asideOpen : ""}`}>
      <div className={logo}>
        <a href="#home" className={logoA}>
          <span className={logoSpan}>{getLogoText().charAt(0)}</span>
          {getLogoText().slice(1)}
        </a>
      </div>
      <div
        className={`${navToggler} ${isOpen ? navTogglerOpen : ""}`}
        onClick={toggleSidebar}
      >
        <span
          className={`${navTogglerSpan} ${isOpen ? navTogglerOpenSpan : ""}`}
        ></span>
      </div>
      <ul className={nav}>
        {navigationItems.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            onClick={(e) => handleNavClick(item.id, e)}
          />
        ))}
      </ul>
    </div>
  )
}
