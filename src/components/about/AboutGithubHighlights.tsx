import {
  githubStatsBottomGrid,
  githubStatsCard,
  githubStatsCardTitle,
  githubStatsDescription,
  githubStatsEyebrow,
  githubStatsGrid,
  githubStatsHeader,
  githubStatsImage,
  githubStatsImageLink,
  githubStatsInlineSvg,
  githubStatsLink,
  githubStatsMedia,
  githubStatsTitle,
} from '@components/about/about.css'
import { Button } from '@components/common/button/Button'
import { useTranslation } from '@localization/localize'
import { useContactInfo } from '@stores/portfolioStore'
import { useThemeStore } from '@stores/themeStore'
import { vars } from '@styles/theme.css'
import React, { useEffect, useState } from 'react'

type ThemePalette = {
  skin: string
  background: string
  surface: string
  border: string
  text: string
  textMuted: string
  emptyCell: string
  quoteBackground: string
}

const DEFAULT_LIGHT_PALETTE: ThemePalette = {
  skin: '#37b182',
  background: '#f2f2fc',
  surface: '#fdf9ff',
  border: '#e8dfec',
  text: '#302e4d',
  textMuted: '#504e70',
  emptyCell: '#e8dfec',
  quoteBackground: '#ffffff',
}

const DEFAULT_DARK_PALETTE: ThemePalette = {
  skin: '#37b182',
  background: '#151515',
  surface: '#222222',
  border: '#393939',
  text: '#ffffff',
  textMuted: '#e9e9e9',
  emptyCell: '#393939',
  quoteBackground: '#1b1b1b',
}

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '')
  const safeHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((value) => value + value)
          .join('')
      : normalized

  const numeric = Number.parseInt(safeHex, 16)

  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  }
}

const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) =>
  `#${[r, g, b]
    .map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0'))
    .join('')}`

const mixHex = (baseHex: string, targetHex: string, amount: number) => {
  const base = hexToRgb(baseHex)
  const target = hexToRgb(targetHex)

  return rgbToHex({
    r: base.r + (target.r - base.r) * amount,
    g: base.g + (target.g - base.g) * amount,
    b: base.b + (target.b - base.b) * amount,
  })
}

const normalizeCssColorToHex = (value: string) => {
  const color = value.trim()

  if (color.startsWith('#')) {
    return color
  }

  const matched = color.match(/\d+(\.\d+)?/g)

  if (!matched || matched.length < 3) {
    return color
  }

  return rgbToHex({
    r: Number(matched[0]),
    g: Number(matched[1]),
    b: Number(matched[2]),
  })
}

const toParamColor = (hex: string) => hex.replace('#', '')

const getPaletteFromTheme = (isDarkMode: boolean): ThemePalette => {
  if (typeof document === 'undefined') {
    return isDarkMode ? DEFAULT_DARK_PALETTE : DEFAULT_LIGHT_PALETTE
  }

  const styles = getComputedStyle(document.body)
  const fallback = isDarkMode ? DEFAULT_DARK_PALETTE : DEFAULT_LIGHT_PALETTE

  const skin = normalizeCssColorToHex(styles.getPropertyValue(vars.color.skin)) || fallback.skin
  const background =
    normalizeCssColorToHex(styles.getPropertyValue(vars.color.background[900])) || fallback.background
  const surface =
    normalizeCssColorToHex(styles.getPropertyValue(vars.color.background[100])) || fallback.surface
  const border =
    normalizeCssColorToHex(styles.getPropertyValue(vars.color.background[50])) || fallback.border
  const text = normalizeCssColorToHex(styles.getPropertyValue(vars.color.text[900])) || fallback.text
  const textMuted =
    normalizeCssColorToHex(styles.getPropertyValue(vars.color.text[700])) || fallback.textMuted

  return {
    skin,
    background,
    surface,
    border,
    text,
    textMuted,
    emptyCell: mixHex(surface, border, isDarkMode ? 0.78 : 0.52),
    quoteBackground: mixHex(surface, background, isDarkMode ? 0.2 : 0.06),
  }
}

const getContributionShades = (palette: ThemePalette, isDarkMode: boolean) => {
  const blendTarget = isDarkMode ? '#ffffff' : '#0f172a'

  return [
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.12 : 0.05),
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.22 : 0.16),
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.34 : 0.28),
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.46 : 0.4),
  ]
}

const getBrightness = (hex: string) => {
  const { r, g, b } = hexToRgb(hex)
  return 0.299 * r + 0.587 * g + 0.114 * b
}

const transformContributionSvg = (
  svgMarkup: string,
  palette: ThemePalette,
  isDarkMode: boolean,
) => {
  if (typeof DOMParser === 'undefined') {
    return null
  }

  const parser = new DOMParser()
  const parsed = parser.parseFromString(svgMarkup, 'image/svg+xml')
  const svg = parsed.querySelector('svg')

  if (!svg) {
    return null
  }

  const shades = getContributionShades(palette, isDarkMode)
  const cellFillValues = Array.from(svg.querySelectorAll('rect'))
    .map((rect) => rect.getAttribute('fill'))
    .filter((fill): fill is string => Boolean(fill) && fill !== 'none')

  const uniqueCellFills = Array.from(new Set(cellFillValues)).sort(
    (left, right) => getBrightness(left) - getBrightness(right),
  )

  const remapped = new Map<string, string>()

  uniqueCellFills.forEach((fill, index) => {
    if (index === 0) {
      remapped.set(fill, palette.emptyCell)
      return
    }

    const shadeIndex = Math.min(index - 1, shades.length - 1)
    remapped.set(fill, shades[shadeIndex])
  })

  svg.setAttribute('style', `max-width: 100%; height: auto; background: transparent;`)
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')

  parsed.querySelectorAll('rect').forEach((rect) => {
    const fill = rect.getAttribute('fill')

    if (fill && remapped.has(fill)) {
      rect.setAttribute('fill', remapped.get(fill) ?? fill)
    }
  })

  parsed.querySelectorAll('text').forEach((textNode) => {
    textNode.setAttribute('fill', palette.textMuted)
  })

  parsed.querySelectorAll('line, path').forEach((node) => {
    if (node.getAttribute('stroke')) {
      node.setAttribute('stroke', palette.border)
    }
  })

  return svg.outerHTML
}

const getGithubUsername = (githubUrl?: string): string | null => {
  if (!githubUrl) {
    return null
  }

  try {
    const { pathname } = new URL(githubUrl)
    const username = pathname.split('/').filter(Boolean)[0]
    return username || null
  } catch {
    return null
  }
}

export const AboutGithubHighlights: React.FC = () => {
  const { t } = useTranslation()
  const contact = useContactInfo()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const currentColor = useThemeStore((state) => state.currentColor)
  const githubUrl = contact?.social.github?.url
  const githubUsername = getGithubUsername(githubUrl)
  const [contributionSvg, setContributionSvg] = useState<string | null>(null)

  if (!githubUrl || !githubUsername) {
    return null
  }

  const palette = getPaletteFromTheme(isDarkMode)
  const contributionChartUrl = `https://ghchart.rshah.org/${toParamColor(palette.skin)}/${githubUsername}`
  const streakStatsUrl = `https://streak-stats.demolab.com?user=${githubUsername}&hide_border=true&background=${toParamColor(
    palette.surface,
  )}&border=${toParamColor(palette.border)}&stroke=${toParamColor(
    palette.border,
  )}&ring=${toParamColor(palette.skin)}&fire=${toParamColor(
    palette.skin,
  )}&currStreakNum=${toParamColor(palette.skin)}&sideNums=${toParamColor(
    palette.skin,
  )}&currStreakLabel=${toParamColor(palette.skin)}&sideLabels=${toParamColor(
    palette.text,
  )}&dates=${toParamColor(palette.textMuted)}&excludeDaysLabel=${toParamColor(
    palette.textMuted,
  )}&locale=en`
  const randomQuoteUrl = `https://quotes-github-readme.vercel.app/api?type=horizontal&border=false&quoteColor=${toParamColor(
    palette.text,
  )}&authorColor=${toParamColor(palette.skin)}&backgroundColor=${toParamColor(
    palette.quoteBackground,
  )}&symbolColor=${toParamColor(palette.skin)}`

  useEffect(() => {
    let cancelled = false

    const loadContributionSvg = async () => {
      try {
        const nextPalette = getPaletteFromTheme(isDarkMode)
        const response = await fetch(contributionChartUrl)
        const svgMarkup = await response.text()

        if (cancelled) {
          return
        }

        const transformedSvg = transformContributionSvg(svgMarkup, nextPalette, isDarkMode)
        setContributionSvg(transformedSvg)
      } catch {
        if (!cancelled) {
          setContributionSvg(null)
        }
      }
    }

    void loadContributionSvg()

    return () => {
      cancelled = true
    }
  }, [contributionChartUrl, currentColor, isDarkMode])

  return (
    <>
      <div className={githubStatsHeader}>
        <div>
          <p className={githubStatsEyebrow}>{t('about.github.eyebrow')}</p>
          <h3 className={githubStatsTitle}>{t('about.github.title')}</h3>
          <p className={githubStatsDescription}>{t('about.github.description')}</p>
        </div>
        <Button
          as="a"
          href={githubUrl}
          variant="secondary"
          size="small"
          className={githubStatsLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('about.github.profileLink')}
        </Button>
      </div>
      <div className={githubStatsGrid}>
        <article className={githubStatsCard}>
          <h4 className={githubStatsCardTitle}>{t('about.github.cards.contributions')}</h4>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={githubStatsImageLink}
          >
            <div className={githubStatsMedia}>
              {contributionSvg ? (
                <div
                  className={githubStatsInlineSvg}
                  dangerouslySetInnerHTML={{ __html: contributionSvg }}
                />
              ) : (
                <img
                  src={contributionChartUrl}
                  alt={t('about.github.alt.contributions', { username: githubUsername })}
                  loading="lazy"
                  decoding="async"
                  className={githubStatsImage}
                />
              )}
            </div>
          </a>
        </article>
      </div>
      <div className={githubStatsBottomGrid}>
        {[
          {
            title: t('about.github.cards.streak'),
            href: githubUrl,
            imageUrl: streakStatsUrl,
            alt: t('about.github.alt.streak', { username: githubUsername }),
          },
          {
            title: t('about.github.cards.quote'),
            href: githubUrl,
            imageUrl: randomQuoteUrl,
            alt: t('about.github.alt.quote'),
          },
        ].map((card) => (
          <article key={card.title} className={githubStatsCard}>
            <h4 className={githubStatsCardTitle}>{card.title}</h4>
            <a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className={githubStatsImageLink}
            >
              <div className={githubStatsMedia}>
                <img
                  src={card.imageUrl}
                  alt={card.alt}
                  loading="lazy"
                  decoding="async"
                  className={githubStatsImage}
                />
              </div>
            </a>
          </article>
        ))}
      </div>
    </>
  )
}
