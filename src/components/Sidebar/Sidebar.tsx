import React from "react"
import {
  usePersonalInfo,
  usePortfolioLoading,
} from "../../stores/portfolioStore"
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

interface SidebarProps {
  activeSection: string
  isOpen: boolean
  toggleSidebar: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  isOpen,
  toggleSidebar,
}) => {
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()

  const navigationItems: SidebarNavigationItem[] = [
    { id: "home", label: "Home", icon: "home", path: "/" },
    { id: "about", label: "About", icon: "user", path: "/about" },
    { id: "service", label: "Services", icon: "list", path: "/services" },
    {
      id: "portfolio",
      label: "Skills",
      icon: "cogs",
      path: "/portfolio",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "briefcase",
      path: "/projects",
    },
    { id: "contact", label: "Contact", icon: "comments", path: "/contact" },
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
