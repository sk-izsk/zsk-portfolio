import { useTitle } from 'ahooks'
import type { PropsWithChildren } from 'react'
import React from 'react'

interface ScreenProps extends PropsWithChildren {
  sectionId: string
  sectionClassName?: string
  containerClassName?: string
  isLoading: boolean
  isError: boolean
  title?: string
  pageTitle?: string
  loadingMessage?: string
  errorMessage?: string
}

export const Screen: React.FC<ScreenProps> = ({
  sectionId,
  sectionClassName,
  containerClassName,
  isLoading,
  isError,
  title,
  pageTitle,
  loadingMessage = 'Loading...',
  errorMessage = 'Error loading data',
  children,
}) => {
  const resolvedPageTitle = pageTitle ?? title

  useTitle(resolvedPageTitle ?? '')

  const state = isLoading
    ? {
        message: loadingMessage,
        className: 'screen-state screen-state--loading',
      }
    : isError
      ? {
          message: errorMessage,
          className: 'screen-state screen-state--error',
        }
      : null

  return (
    <section className={`${sectionClassName ?? sectionId} section active`} id={sectionId}>
      <div className={`container screen-container ${containerClassName ?? ''}`}>
        {title && (
          <div className="row">
            <div className="section-title padd-15">
              <h2>{title}</h2>
            </div>
          </div>
        )}
        {state ? <div className={state.className}>{state.message}</div> : children}
      </div>
    </section>
  )
}
