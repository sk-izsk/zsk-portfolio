import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { usePortfolioData } from "../hooks/usePortfolioData"

interface SidebarProps {
  activeSection: string
  onNavigation: (section: string) => void
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigation,
  isOpen,
  toggleSidebar,
}) => {
  const { loading, data } = usePortfolioData()

  const navigationItems = [
    { id: "home", label: "Home", icon: "home" },
    { id: "about", label: "About", icon: "user" },
    { id: "service", label: "Services", icon: "list" },
    { id: "portfolio", label: "Portfolio", icon: "briefcase" },
    { id: "blog", label: "Blog", icon: ["fab", "readme"] },
    { id: "contact", label: "Contact", icon: "comments" },
  ]

  const getLogoText = () => {
    if (loading || !data) return "Atlas"
    const firstName = data.personalInfo.name.split(" ")[0]
    return `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`
  }

  return (
    <div className={`aside ${isOpen ? "open" : ""}`}>
      <div className="logo">
        <a href="#home">
          <span>{getLogoText().charAt(0)}</span>
          {getLogoText().slice(1)}
        </a>
      </div>
      <div
        className={`nav-toggler ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <span></span>
      </div>
      <ul className="nav">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={activeSection === item.id ? "active" : ""}
              onClick={(e) => {
                e.preventDefault()
                onNavigation(item.id)
              }}
            >
              <FontAwesomeIcon
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
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
