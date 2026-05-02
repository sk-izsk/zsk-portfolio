import { HyperText } from '@components/common/hyperText/HyperText'
import { SidebarNavItem } from '@components/sidebar/SidebarNavItem'
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
} from '@components/sidebar/sidebar.css'
import type { SidebarNavigationItem } from '@components/sidebar/sidebar.types'
import { useTranslation } from '@localization/localize'
import { usePersonalInfo, usePortfolioLoading } from '@stores/portfolioStore'
import { useSidebarStore } from '@stores/sidebarStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import { BookOpen, Briefcase, Cog, House, List, Menu, MessageCircle, User, X } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
  const toggleSidebar = useSidebarStore((state) => state.toggle)
  const closeSidebar = useSidebarStore((state) => state.close)
  const activeSection = getCurrentSection(location.pathname)
  const currentLanguage = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'

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
      return 'Zeeshan'
    }
    const firstName = personalInfo.name.split(' ')[1]
    return `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`
  }

  const handleNavClick = (itemId: string, event: React.MouseEvent) => {
    if (window.innerWidth < 1200 && activeSection === itemId && isOpen) {
      event.preventDefault()
      toggleSidebar()
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
  }, [location.pathname, closeSidebar])

  return (
    <div className={`${aside} ${isOpen ? asideOpen : ''}`}>
      <div className={logo}>
        <Link to="/" className={logoA}>
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
      <button
        className={`${navToggler} ${isOpen ? navTogglerOpen : ''}`}
        type="button"
        onClick={toggleSidebar}
        aria-label={isOpen ? t('sidebar.toggle.close') : t('sidebar.toggle.open')}
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
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
