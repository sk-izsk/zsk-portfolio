import { useTranslation } from '@localization/localize'
import { BookOpen, Briefcase, Cog, House, List, MessageCircle, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLocation } from 'react-router'

export interface TopBarItem {
  id: string
  label: string
  icon: LucideIcon
  path: string
}

const getActiveId = (pathname: string) => pathname.slice(1) || 'home'

export const useTopBarItems = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const activeId = getActiveId(pathname)

  const items: TopBarItem[] = [
    { id: 'home', label: t('topBar.nav.home'), icon: House, path: '/' },
    { id: 'about', label: t('topBar.nav.about'), icon: User, path: '/about' },
    { id: 'services', label: t('topBar.nav.services'), icon: List, path: '/services' },
    { id: 'portfolio', label: t('topBar.nav.skills'), icon: Cog, path: '/portfolio' },
    { id: 'projects', label: t('topBar.nav.projects'), icon: Briefcase, path: '/projects' },
    { id: 'blog', label: t('topBar.nav.blog'), icon: BookOpen, path: '/blog' },
    { id: 'contact', label: t('topBar.nav.contact'), icon: MessageCircle, path: '/contact' },
  ]

  const activeLabel = items.find((item) => item.id === activeId)?.label ?? ''

  return { items, activeId, activeLabel }
}
