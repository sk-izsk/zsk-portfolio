import {
  errorButton,
  errorContainer,
  errorHeading,
  errorHint,
  errorPre,
} from '@components/errorBoundary/errorBoundary.css'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useMemo } from 'react'
import { ErrorBoundary as ZskErrorBoundary } from 'zsk-react-error'

const CHUNK_RELOAD_GUARD = 'zsk-chunk-reload-attempted'

const buildCacheBustedUrl = () => {
  const url = new URL(window.location.href)
  url.searchParams.set('_reboot', Date.now().toString())
  return url.toString()
}

const isChunkLoadError = (error: unknown) => {
  const message = (error as Error | undefined)?.message ?? String(error)

  return (
    message.includes('Failed to fetch dynamically imported module') ||
    message.includes('Loading chunk') ||
    message.includes('ChunkLoadError')
  )
}

const ErrorFallback: React.FC<{
  error: unknown
}> = ({ error }) => {
  const chunkLoadError = useMemo(() => isChunkLoadError(error), [error])

  useEffect(() => {
    if (!chunkLoadError || typeof window === 'undefined') {
      return
    }

    const hasReloaded = window.sessionStorage.getItem(CHUNK_RELOAD_GUARD)

    if (hasReloaded) {
      return
    }

    window.sessionStorage.setItem(CHUNK_RELOAD_GUARD, 'true')
    window.location.replace(buildCacheBustedUrl())
  }, [chunkLoadError])

  const handleRecover = async () => {
    if (typeof window === 'undefined') {
      return
    }

    window.sessionStorage.removeItem(CHUNK_RELOAD_GUARD)

    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        await Promise.all(registrations.map((registration) => registration.unregister()))
      }

      if ('caches' in window) {
        const cacheKeys = await window.caches.keys()
        await Promise.all(cacheKeys.map((key) => window.caches.delete(key)))
      }
    } catch {
      // Best effort only: do not block reload if cleanup fails.
    }

    window.location.replace(buildCacheBustedUrl())
  }

  return (
    <div className={errorContainer}>
      <h2 className={errorHeading}>System Layout Error</h2>
      <pre className={errorPre}>{(error as Error)?.message || 'Unknown network crash'}</pre>
      {chunkLoadError && (
        <p className={errorHint}>
          A deployment/cache mismatch happened while loading this screen. Reloading should recover.
        </p>
      )}
      <button className={errorButton} onClick={() => void handleRecover()}>
        Reboot System
      </button>
    </div>
  )
}

export const ErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ZskErrorBoundary fallbackRender={({ error }) => <ErrorFallback error={error} />}>
      {children}
    </ZskErrorBoundary>
  )
}
