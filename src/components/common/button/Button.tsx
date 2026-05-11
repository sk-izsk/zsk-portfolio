import React from 'react'
import * as styles from '@components/common/button/button.css.ts'
import { createCn, raw } from '@utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'link'
type ButtonSize = 'small' | 'medium' | 'large'

type ButtonBaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }
type ButtonAsAnchor = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a'
    href: string
  }
type ButtonProps = ButtonAsButton | ButtonAsAnchor
const cn = createCn(styles)

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'medium',
    className = '',
    children,
    as = 'button',
    ...rest
  } = props as ButtonProps & { as?: 'button' | 'a' }

  const classes = cn(
    'button',
    {
      primary: variant === 'primary',
      secondary: variant === 'secondary',
      link: variant === 'link',
      small: size === 'small',
      medium: size === 'medium',
      large: size === 'large',
    },
    raw(className),
  )

  if (as === 'a' && 'href' in props) {
    return (
      <a
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={props.href}
        className={classes}
      >
        {children}
      </a>
    )
  }
  return (
    <button {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  )
}
