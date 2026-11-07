import { StyleSwitcher } from '@components/styleSwitcher/StyleSwitcher'
import * as styles from '@components/styleSwitcher/styleSwitcher.css'
import React from 'react'

// Desktop has no top bar, so the settings button floats in the corner as it used to.
export const StyleSwitcherFloating: React.FC = () => (
  <div className={styles.styleSwitcherFloating}>
    <StyleSwitcher />
  </div>
)
