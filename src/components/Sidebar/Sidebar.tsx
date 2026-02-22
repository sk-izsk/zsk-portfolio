import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import {
  usePersonalInfo,
  usePortfolioLoading,
} from "../../stores/portfolioStore"
import {
  aside,
  asideOpen,
  logo,
  logoA,
  logoSpan,
  nav,
  navA,
  navAActive,
  navAI,
  navLi,
  navToggler,
  navTogglerOpen,
  navTogglerOpenSpan,
  navTogglerSpan,
} from "./sidebar.css"

interface SidebarProps {
  activeSection: string
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  isOpen,
  toggleSidebar,
}) => {
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()

  const navigationItems = [
    { id: "home", label: "Home", icon: "home", path: "/" },
    { id: "about", label: "About", icon: "user", path: "/about" },
    { id: "service", label: "Services", icon: "list", path: "/services" },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: "briefcase",
      path: "/portfolio",
    },
    { id: "blog", label: "Blog", icon: ["fab", "readme"], path: "/blog" },
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
          <li key={item.id} className={navLi}>
            <Link
              to={item.path}
              className={`${navA} ${activeSection === item.id ? navAActive : ""}`}
              onClick={(e) => handleNavClick(item.id, e)}
            >
              <FontAwesomeIcon
                className={navAI}
                icon={
                  item.icon as
                    | "home"
                    | "user"
                    | "list"
                    | "briefcase"
                    | "comments"
                    | "envelope"
                }
              />{" "}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
