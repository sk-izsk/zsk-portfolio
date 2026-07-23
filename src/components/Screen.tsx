import { useTitle } from 'ahooks'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { SeoHead } from '@components/common/SeoHead'
import { DotPattern } from '@components/common/dotPattern/DotPattern'
import { cx } from '@utils/cn'

interface ScreenProps extends PropsWithChildren {
  sectionId: string
  sectionClassName?: string
  containerClassName?: string
  contentProtected?: boolean
  isLoading: boolean
  isError: boolean
  title?: string
  pageTitle?: string
  description?: string
  canonical?: string
  loadingMessage?: string
  errorMessage?: string
}

export const Screen: React.FC<ScreenProps> = ({
  sectionId,
  sectionClassName,
  containerClassName,
  contentProtected = false,
  isLoading,
  isError,
  title,
  pageTitle,
  description,
  canonical,
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
    <section className={cx(sectionClassName ?? sectionId, 'section', 'active')} id={sectionId}>
      <SeoHead title={resolvedPageTitle} description={description} canonical={canonical} />
      <DotPattern />
      <div
        className={cx('container', 'screen-container', containerClassName)}
        data-content-protected={contentProtected || undefined}
      >
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
