import { HyperText } from '@components/common/hyperText/HyperText'
import { StyleSwitcher } from '@components/styleSwitcher/StyleSwitcher'
import * as styles from '@components/topBar/topBar.css'
import { TopBarMenu } from '@components/topBar/TopBarMenu'
import { useTranslation } from '@localization/localize'
import { useNavMenuStore } from '@stores/navMenuStore'
import { usePersonalInfo, usePortfolioLoading } from '@stores/portfolioStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import { cx } from '@utils/cn'
import {
  BookOpen,
  Briefcase,
  Cog,
  House,
  List,
  Menu,
  MessageCircle,
  Sparkles,
  User,
} from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router'

const getActiveId = (pathname: string) => {
  if (pathname === '/ask-ai') {
    return 'askAi'
  }

  const id = pathname.slice(1)

  return id === '' ? 'home' : id
}

export const TopBar: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const toggleMenu = useNavMenuStore((state) => state.toggle)
  const closeMenu = useNavMenuStore((state) => state.close)
  const activeId = getActiveId(pathname)
  const currentLanguage = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'

  const items = [
    { id: 'home', label: t('topBar.nav.home'), icon: House, path: '/' },
    { id: 'about', label: t('topBar.nav.about'), icon: User, path: '/about' },
    { id: 'services', label: t('topBar.nav.services'), icon: List, path: '/services' },
    { id: 'portfolio', label: t('topBar.nav.skills'), icon: Cog, path: '/portfolio' },
    { id: 'projects', label: t('topBar.nav.projects'), icon: Briefcase, path: '/projects' },
    { id: 'contact', label: t('topBar.nav.contact'), icon: MessageCircle, path: '/contact' },
    { id: 'blog', label: t('topBar.nav.blog'), icon: BookOpen, path: '/blog' },
    { id: 'askAi', label: t('topBar.nav.askAi'), icon: Sparkles, path: '/ask-ai' },
  ]

  const firstName = (loading ? undefined : personalInfo?.name.split(' ')[1]) ?? 'Zeeshan'
  const logoText = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`

  const handleLanguageChange = (language: 'en' | 'fr') => {
    const label = language.toUpperCase()
    trackGaEvent('Language', 'language_switch_click', label)
    trackMixpanelEvent('language_switch_click', 'Language', label)
    void i18n.changeLanguage(language)
    closeMenu()
  }

  const renderLanguages = (className?: string) => (
    <div className={cx(styles.languages, className)}>
      {(['en', 'fr'] as const).map((language) => (
        <button
          key={language}
          className={cx(styles.language, currentLanguage === language && styles.languageActive)}
          type="button"
          aria-pressed={currentLanguage === language}
          onClick={() => handleLanguageChange(language)}
        >
          {t(`topBar.language.${language}`)}
        </button>
      ))}
    </div>
  )

  return (
    <>
      <header className={styles.bar}>
        <Link to="/" className={styles.logo}>
          <HyperText
            text={logoText}
            as="span"
            animateOnLoad={true}
            animateOnHover={true}
            renderCharacter={(char, index) =>
              index === 0 ? <span className={styles.logoInitial}>{char}</span> : char
            }
          />
        </Link>
        <nav className={styles.links}>
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              aria-current={item.id === activeId ? 'page' : undefined}
              className={cx(styles.link, item.id === activeId && styles.linkActive)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className={styles.currentPage} aria-hidden="true">
          {items.find((item) => item.id === activeId)?.label}
        </span>
        <div className={styles.controls}>
          {renderLanguages(styles.languagesInBar)}
          <StyleSwitcher />
          <button
            className={styles.menuButton}
            type="button"
            onClick={toggleMenu}
            aria-label={t('topBar.toggle.open')}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>
      <TopBarMenu items={items} activeId={activeId} languages={renderLanguages()} />
    </>
  )
}
