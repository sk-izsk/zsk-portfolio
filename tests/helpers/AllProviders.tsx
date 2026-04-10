import type { PropsWithChildren } from 'react'
import React from 'react'
import { LocalizeProvider } from 'zsk-react-i18n'
import { localizeConfig } from '../../src/localization/localize'

interface WrapperProps extends PropsWithChildren {}

/**
 * Full providers wrapper for component/screen tests.
 */
export const AllProviders: React.FC<WrapperProps> = ({ children }) => {
  return <LocalizeProvider config={localizeConfig}>{children}</LocalizeProvider>
}
