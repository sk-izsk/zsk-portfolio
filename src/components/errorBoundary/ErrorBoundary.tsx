import type { PropsWithChildren } from 'react'
import React from 'react'
import { ErrorBoundary as ZskErrorBoundary } from 'zsk-react-error'
import { errorButton, errorContainer, errorHeading, errorPre } from '@components/errorBoundary/errorBoundary.css'

export const ErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ZskErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className={errorContainer}>
          <h2 className={errorHeading}>System Layout Error</h2>
          <pre className={errorPre}>{(error as Error).message || 'Unknown network crash'}</pre>
          <button className={errorButton} onClick={resetErrorBoundary}>
            Reboot System
          </button>
        </div>
      )}
    >
      {children}
    </ZskErrorBoundary>
  )
}
