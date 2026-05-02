import {
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Cog,
  House,
  List,
  Menu,
  MessageCircle,
  User,
  X,
} from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useTranslation } from '@localization/localize'
import { usePersonalInfo, usePortfolioLoading } from '@stores/portfolioStore'
import { useSidebarStore } from '@stores/sidebarStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import { HyperText } from '@components/common/hyperText/HyperText'
import { SidebarNavItem } from '@components/sidebar/SidebarNavItem'
import {
  aside,
  asideCollapsed,
  asideOpen,
  languageButton,
  languageButtonActive,
  languageDivider,
  languageSwitcher,
  languageSwitcherHidden,
  logo,
  logoA,
  logoACompact,
  logoCollapsed,
  logoSpan,
  nav,
  navToggler,
  navTogglerOpen,
} from '@components/sidebar/sidebar.css'
import type { SidebarNavigationItem } from '@components/sidebar/sidebar.types'

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
  if (path === '/blog') {
    return 'blog'
  }
  if (path === '/contact') {
    return 'contact'
  }
  return 'home'
}

export const Sidebar: React.FC = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const isOpen = useSidebarStore((state) => state.isOpen)
  const isDesktopCollapsed = useSidebarStore((state) => state.isDesktopCollapsed)
  const toggleSidebar = useSidebarStore((state) => state.toggle)
  const closeSidebar = useSidebarStore((state) => state.close)
  const toggleDesktopCollapsed = useSidebarStore((state) => state.toggleDesktopCollapsed)
  const activeSection = getCurrentSection(location.pathname)
  const currentLanguage = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'
  const isDesktopViewport = window.innerWidth >= 1200
  const isCollapsed = isDesktopViewport && isDesktopCollapsed

  const navigationItems: SidebarNavigationItem[] = [
    { id: 'home', label: t('sidebar.nav.home'), icon: House, path: '/' },
    {
      id: 'about',
      label: t('sidebar.nav.about'),
      icon: User,
      path: '/about',
    },
    {
      id: 'service',
      label: t('sidebar.nav.services'),
      icon: List,
      path: '/services',
    },
    {
      id: 'portfolio',
      label: t('sidebar.nav.skills'),
      icon: Cog,
      path: '/portfolio',
    },
    {
      id: 'projects',
      label: t('sidebar.nav.projects'),
      icon: Briefcase,
      path: '/projects',
    },
    {
      id: 'blog',
      label: t('sidebar.nav.blog'),
      icon: BookOpen,
      path: '/blog',
    },
    {
      id: 'contact',
      label: t('sidebar.nav.contact'),
      icon: MessageCircle,
      path: '/contact',
    },
  ]

  const getLogoText = () => {
    if (loading || !personalInfo) {
      return isCollapsed ? 'Z' : 'Zeeshan'
    }
    const firstName = personalInfo.name.split(' ')[1]
    const normalized = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`
    return isCollapsed ? normalized.charAt(0) : normalized
  }

  const handleNavClick = (itemId: string, event: React.MouseEvent) => {
    if (window.innerWidth < 1200 && activeSection === itemId && isOpen) {
      event.preventDefault()
      toggleSidebar()
    }
  }

  const handleSidebarToggle = () => {
    if (window.innerWidth < 1200) {
      toggleSidebar()
      return
    }

    toggleDesktopCollapsed()
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
  }, [location.pathname, closeSidebar])

  return (
    <div
      className={`${aside} ${isOpen ? asideOpen : ''} ${isDesktopCollapsed ? asideCollapsed : ''}`}
    >
      <div className={`${logo} ${isCollapsed ? logoCollapsed : ''}`}>
        <Link to="/" className={`${logoA} ${isCollapsed ? logoACompact : ''}`}>
          <HyperText
            text={getLogoText()}
            as="span"
            animateOnLoad={true}
            animateOnHover={true}
            renderCharacter={(char, index) =>
              index === 0 ? <span className={logoSpan}>{char}</span> : char
            }
          />
        </Link>
        <div className={`${languageSwitcher} ${isCollapsed ? languageSwitcherHidden : ''}`}>
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
      <button
        className={`${navToggler} ${isOpen ? navTogglerOpen : ''}`}
        type="button"
        onClick={handleSidebarToggle}
        aria-label={
          window.innerWidth < 1200
            ? isOpen
              ? t('sidebar.toggle.close')
              : t('sidebar.toggle.open')
            : isCollapsed
              ? t('sidebar.toggle.expand')
              : t('sidebar.toggle.collapse')
        }
      >
        {window.innerWidth < 1200 ? (
          isOpen ? (
            <X size={18} />
          ) : (
            <Menu size={18} />
          )
        ) : isCollapsed ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </button>
      <ul className={nav}>
        {navigationItems.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            isCollapsed={isCollapsed}
            onClick={(e) => handleNavClick(item.id, e)}
          />
        ))}
      </ul>
    </div>
  )
}
