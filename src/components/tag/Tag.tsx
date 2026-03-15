import React from 'react'
import { tag } from './tag.css'

interface TagProps {
  label: string
}

export const Tag: React.FC<TagProps> = ({ label }) => {
  return <span className={tag}>{label}</span>
}
