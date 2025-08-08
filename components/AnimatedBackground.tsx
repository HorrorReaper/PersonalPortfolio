'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

function useMouseParallax(strength = 20) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.8 })
  const y = useSpring(my, { stiffness: 60, damping: 20, mass: 0.8 })

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const { innerWidth: w, innerHeight: h } = window
      const nx = (e.clientX / w) * 2 - 1 // -1..1
      const ny = (e.clientY / h) * 2 - 1
      mx.set(nx * strength)
      my.set(ny * strength)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my, strength])

  return { x, y }
}

export default function AnimatedBackground({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const slow = { duration: 28, repeat: Infinity, ease: ['linear'] }
  const slower = { duration: 36, repeat: Infinity, ease: ['linear'] }
  const slowest = { duration: 42, repeat: Infinity, ease: ['linear'] }

  const p1 = useMouseParallax(14)
  const p2 = useMouseParallax(10)
  const p3 = useMouseParallax(18)

  return (
    <div className={clsx('fixed inset-0 -z-10 pointer-events-none overflow-hidden', className)} aria-hidden>
      {/* Blob 1 */}
      <motion.div
        className="absolute -top-24 -left-24 h-[34rem] w-[34rem] rounded-full blur-[70px]"
        style={{ x: p1.x, y: p1.y, background: 'radial-gradient(closest-side, rgba(59,130,246,0.35), transparent 70%)' }}
        animate={reduce ? {} : { rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
        transition={reduce ? undefined : slow}
      />
      {/* Blob 2 */}
      <motion.div
        className="absolute top-0 -right-24 h-[28rem] w-[28rem] rounded-full blur-[70px]"
        style={{ x: p2.x, y: p2.y, background: 'radial-gradient(closest-side, rgba(168,85,247,0.30), transparent 70%)' }}
        animate={reduce ? {} : { rotate: [0, -12, 0], scale: [1, 1.06, 1] }}
        transition={reduce ? undefined : slower}
      />
      {/* Blob 3 */}
      <motion.div
        className="absolute -bottom-32 left-20 h-[30rem] w-[30rem] rounded-full blur-[70px]"
        style={{ x: p3.x, y: p3.y, background: 'radial-gradient(closest-side, rgba(236,72,153,0.25), transparent 70%)' }}
        animate={reduce ? {} : { rotate: [0, 8, 0], scale: [1, 1.04, 1] }}
        transition={reduce ? undefined : slowest}
      />
    </div>
  )
}
