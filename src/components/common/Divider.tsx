import React from 'react'
import { divider, dividerVertical } from './projectModalExtra.css'

interface DividerProps {
  vertical?: boolean
}

export const Divider: React.FC<DividerProps> = ({ vertical = false }) => (
  <div className={vertical ? dividerVertical : divider} role="separator" />
)

export default Divider
