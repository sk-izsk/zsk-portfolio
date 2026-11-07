import { HyperText } from '@components/common/hyperText/HyperText'
import { StyleSwitcher } from '@components/styleSwitcher/StyleSwitcher'
import * as styles from '@components/topBar/topBar.css'
import { TopBarMenu } from '@components/topBar/TopBarMenu'
import { TopBarNavLink } from '@components/topBar/TopBarNavLink'
import { useGlassLens } from '@hooks/useGlassLens'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { useTranslation } from '@localization/localize'
import { useNavMenuStore } from '@stores/navMenuStore'
import { usePersonalInfo, usePortfolioLoading } from '@stores/portfolioStore'
import { BookOpen, Briefcase, Cog, House, List, Menu, MessageCircle, User } from 'lucide-react'
import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router'

const getActiveId = (pathname: string) => pathname.slice(1) || 'home'

export const TopBar: React.FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const toggleMenu = useNavMenuStore((state) => state.toggle)
  const activeId = getActiveId(pathname)
  const canAnimate = useMediaQuery('(prefers-reduced-motion: no-preference)')
  const barRef = useRef<HTMLElement>(null)
  const lensMapRef = useRef<SVGFEImageElement>(null)

  useGlassLens(barRef, lensMapRef)

  const items = [
    { id: 'home', label: t('topBar.nav.home'), icon: House, path: '/' },
    { id: 'about', label: t('topBar.nav.about'), icon: User, path: '/about' },
    { id: 'services', label: t('topBar.nav.services'), icon: List, path: '/services' },
    { id: 'portfolio', label: t('topBar.nav.skills'), icon: Cog, path: '/portfolio' },
    { id: 'projects', label: t('topBar.nav.projects'), icon: Briefcase, path: '/projects' },
    { id: 'blog', label: t('topBar.nav.blog'), icon: BookOpen, path: '/blog' },
    { id: 'contact', label: t('topBar.nav.contact'), icon: MessageCircle, path: '/contact' },
  ]

  const activeLabel = items.find((item) => item.id === activeId)?.label ?? ''

  const firstName = (loading ? undefined : personalInfo?.name.split(' ')[1]) ?? 'Zeeshan'
  const logoText = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`

  return (
    <>
      <svg className={styles.glassFilter} aria-hidden="true">
        <filter
          id={styles.GLASS_FILTER_ID}
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage ref={lensMapRef} x="0" y="0" preserveAspectRatio="none" result="map" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <header ref={barRef} className={styles.bar}>
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
            <TopBarNavLink
              key={item.id}
              label={item.label}
              path={item.path}
              isActive={item.id === activeId}
            />
          ))}
        </nav>
        <span className={styles.currentPage} aria-hidden="true">
          <HyperText
            key={activeLabel}
            text={activeLabel}
            as="span"
            animateOnLoad={canAnimate}
            animateOnHover={false}
          />
        </span>
        <div className={styles.controls}>
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
      <TopBarMenu items={items} activeId={activeId} />
    </>
  )
}
