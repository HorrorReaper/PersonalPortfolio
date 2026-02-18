'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'

type Props = {
  children: React.ReactNode
  delayChildren?: number
  stagger?: number
  amount?: number
  once?: boolean
  childDuration?: number
  childDistance?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

export default function StaggerOnScroll({
  children,
  delayChildren = 0,
  stagger = 0.08,
  amount = 0.2,
  once = true,
  childDuration = 0.5,
  childDistance = 14,
  direction = 'up',
  className,
}: Props) {
  const offset =
    direction === 'up' ? { y: childDistance } :
    direction === 'down' ? { y: -childDistance } :
    direction === 'left' ? { x: childDistance } :
    direction === 'right' ? { x: -childDistance } :
    {}

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  }

  const child: Variants = {
    hidden: { opacity: 0, ...offset },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: childDuration, ease: 'easeOut' } },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, (c, i) => (
        <motion.div variants={child} key={i}>
          {c}
        </motion.div>
      ))}
    </motion.div>
  )
}
