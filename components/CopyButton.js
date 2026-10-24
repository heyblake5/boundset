'use client'
import { useState } from 'react'
export default function CopyButton({ text, label = 'Copy template', className = 'px-6 py-3 rounded-full bg-brand text-white font-medium hover:bg-brand/90' }) {
  const [done, setDone] = useState(false)
  return (
    <button type="button" onClick={() => { navigator.clipboard?.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500) }}
      className={className} aria-live="polite">{done ? 'Copied' : label}</button>
  )
}
