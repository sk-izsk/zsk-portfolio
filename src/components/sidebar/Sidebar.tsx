import {
  faBriefcase,
  faCogs,
  faComments,
  faHome,
  faList,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { trackGaEvent, trackMixpanelEvent } from '../../hooks/useAnalytics'
import { useTranslation } from '../../localization/localize'
import { usePersonalInfo, usePortfolioLoading } from '../../stores/portfolioStore'
import { useSidebarStore } from '../../stores/sidebarStore'
import { SidebarNavItem } from './SidebarNavItem'
import {
  aside,
  asideOpen,
  languageButton,
  languageButtonActive,
  languageDivider,
  languageSwitcher,
  logo,
  logoA,
  logoSpan,
  nav,
  navToggler,
  navTogglerOpen,
  navTogglerOpenSpan,
  navTogglerSpan,
} from './sidebar.css'
import type { SidebarNavigationItem } from './sidebar.types'

const getCurrentSection = (path: string) => {
  if (path === '/' || path === '/home') {
    return 'home'
  }
  if (path === '/about') {
    return 'about'
  }
  if (path === '/services') {
    return 'service'
  }
  if (path === '/portfolio') {
    return 'portfolio'
  }
  if (path === '/projects') {
    return 'projects'
  }
  if (path === '/contact') {
    return 'contact'
  }
  return 'home'
}

export const Sidebar: React.FC = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const isOpen = useSidebarStore((state) => state.isOpen)
  const toggleSidebar = useSidebarStore((state) => state.toggle)
  const closeSidebar = useSidebarStore((state) => state.close)
  const activeSection = getCurrentSection(router.pathname)
  const currentLanguage = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'

  const navigationItems: SidebarNavigationItem[] = [
    { id: 'home', label: t('sidebar.nav.home'), icon: faHome, path: '/' },
    {
      id: 'about',
      label: t('sidebar.nav.about'),
      icon: faUser,
      path: '/about',
    },
    {
      id: 'service',
      label: t('sidebar.nav.services'),
      icon: faList,
      path: '/services',
    },
    {
      id: 'portfolio',
      label: t('sidebar.nav.skills'),
      icon: faCogs,
      path: '/portfolio',
    },
    {
      id: 'projects',
      label: t('sidebar.nav.projects'),
      icon: faBriefcase,
      path: '/projects',
    },
    {
      id: 'contact',
      label: t('sidebar.nav.contact'),
      icon: faComments,
      path: '/contact',
    },
  ]

  const getLogoText = () => {
    if (loading || !personalInfo) {
      return 'Zeeshan'
    }
    const firstName = personalInfo.name.split(' ')[1]
    return `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`
  }

  const handleNavClick = (itemId: string, event: React.MouseEvent) => {
    if (activeSection === itemId) {
      event.preventDefault()

      if (isOpen) {
        toggleSidebar()
      }
    }
  }

  const handleLanguageChange = (language: 'en' | 'fr') => {
    const label = language.toUpperCase()
    trackGaEvent('Language', 'language_switch_click', label)
    trackMixpanelEvent('language_switch_click', 'Language', label)
    void i18n.changeLanguage(language)
    if (window.innerWidth < 1200) {
      closeSidebar()
    }
  }

  const isOpenRef = useRef(isOpen)
  useEffect(() => {
    isOpenRef.current = isOpen
  }, [isOpen])

  useEffect(() => {
    if (window.innerWidth >= 1200 || !isOpenRef.current) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      closeSidebar()
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [router.pathname, closeSidebar])

  return (
    <div className={`${aside} ${isOpen ? asideOpen : ''}`}>
      <div className={logo}>
        <a href="#home" className={logoA}>
          <span className={logoSpan}>{getLogoText().charAt(0)}</span>
          {getLogoText().slice(1)}
        </a>
        <div className={languageSwitcher}>
          <button
            className={`${languageButton} ${currentLanguage === 'en' ? languageButtonActive : ''}`}
            type="button"
            onClick={() => handleLanguageChange('en')}
          >
            {t('sidebar.language.en')}
          </button>
          <span className={languageDivider}>|</span>
          <button
            className={`${languageButton} ${currentLanguage === 'fr' ? languageButtonActive : ''}`}
            type="button"
            onClick={() => handleLanguageChange('fr')}
          >
            {t('sidebar.language.fr')}
          </button>
        </div>
      </div>
      <div className={`${navToggler} ${isOpen ? navTogglerOpen : ''}`} onClick={toggleSidebar}>
        <span className={`${navTogglerSpan} ${isOpen ? navTogglerOpenSpan : ''}`}></span>
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
