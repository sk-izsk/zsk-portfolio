import React from 'react'
import {
  button,
  large,
  link,
  medium,
  primary,
  secondary,
  small,
} from '@components/common/button/button.css.ts'

export type ButtonVariant = 'primary' | 'secondary' | 'link'
export type ButtonSize = 'small' | 'medium' | 'large'

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

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'medium',
    className = '',
    children,
    as = 'button',
    ...rest
  } = props as ButtonProps & { as?: 'button' | 'a' }

  const classes = [
    button,
    variant === 'primary' && primary,
    variant === 'secondary' && secondary,
    variant === 'link' && link,
    size === 'small' && small,
    size === 'medium' && medium,
    size === 'large' && large,
    className,
  ]
    .filter(Boolean)
    .join(' ')

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
