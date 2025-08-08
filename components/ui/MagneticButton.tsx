'use client'
import { useRef } from 'react'

export default function MagneticButton({
  children,
  className = '',
  strength = 24,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { strength?: number }) {
  const ref = useRef<HTMLButtonElement>(null)

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    el.animate(
      [{ transform: `translate(${relX / strength}px, ${relY / strength}px)` }],
      { duration: 150, fill: 'forwards' }
    )
  }
  function onMouseLeave() {
    ref.current?.animate([{ transform: 'translate(0,0)' }], { duration: 200, fill: 'forwards' })
  }

  return (
    <button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-flex items-center justify-center rounded-md transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
