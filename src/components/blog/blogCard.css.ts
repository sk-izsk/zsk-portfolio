import { globalStyle, style } from '@vanilla-extract/css'
import { projectContent, projectItemInner, projectTitle } from '@components/projects/projects.css'
import { vars } from '@styles/theme.css'

export const compactBlogCard = style({})

globalStyle(`${compactBlogCard} .${projectItemInner}`, {
  minHeight: '600px',
  '@media': {
    '(max-width: 991px)': {
      minHeight: '580px',
    },
    '(max-width: 767px)': {
      minHeight: '560px',
    },
  },
})

globalStyle(`${compactBlogCard} .${projectTitle}`, {
  minHeight: '108px',
  marginBottom: '12px',
})

globalStyle(`${compactBlogCard} .${projectContent}`, {
  minHeight: '225px',
  maxHeight: '225px',
  WebkitLineClamp: '9',
})

globalStyle(`${compactBlogCard} .${projectContent}::before`, {
  height: '44px',
  background: `linear-gradient(180deg, transparent 0%, ${vars.color.background[100]} 100%)`,
})
