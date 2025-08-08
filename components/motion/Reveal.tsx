'use client'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Reveal({
  children,
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } })
  }, [isInView, controls, delay])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={controls}>
      {children}
    </motion.div>
  )
}
