import React from 'react'
import { tag, tagLabel } from '@components/tag/tag.css'

interface TagProps {
  label: string
}

export const Tag: React.FC<TagProps> = ({ label }) => {
  return (
    <span className={tag}>
      <span className={tagLabel}>{label}</span>
    </span>
  )
}
