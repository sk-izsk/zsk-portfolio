import React from 'react'

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
export type ButtonProps = ButtonAsButton | ButtonAsAnchor

declare const Button: React.FC<ButtonProps>
export default Button
