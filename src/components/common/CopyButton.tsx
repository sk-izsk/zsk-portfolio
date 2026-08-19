import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'

interface CopyButtonProps {
  text: string
  label: string
  className?: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, label, className }) => {
  const [copied, setCopied] = useState(false)

  const copyText = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button className={className} type="button" onClick={() => void copyText()} aria-label={label} title={label}>
      {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
    </button>
  )
}
