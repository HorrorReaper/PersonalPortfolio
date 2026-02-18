"use client"

import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export type ExperienceItem = {
  role: string
  company: string
  url?: string
  location?: string
  start: string // e.g. "2022-09"
  end: string   // e.g. "2025-06" or "Present"
  achievements: string[]
  stack?: string[]
}

const defaultItems: ExperienceItem[] = [
  {
    role: 'Working Student IT-Systemadministration',
    company: 'Dresden-IT',
    url: 'https://dresden-it.de',
    location: 'Hybrid',
    start: '2024-09',
    end: '2025-09',
    achievements: [
      'Administration and support of client systems and networks',
      'Build own solutions with PowerShell to automate tasks',
    ],
    stack: ['PowerShell', 'M365'],
  },
  {
    role: 'Online Marketing',
    company: 'AE-Werbung Meusegast',
    url: 'https://ae-werbung-meusegast.de',
    location: 'Dresden, DE',
    start: '2022-11',
    end: '2024-08',
    achievements: [
      'Built the Landing Page with HTML, CSS and JavaScript',
      'Managed the Instagram account and created content',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Instagram', 'Canva'],
  },
]

// Helpers
function fmtMonthYear(iso: string) {
  // iso: "YYYY-MM" or "YYYY"
  const [y, m = '01'] = iso.split('-')
  const d = new Date(Number(y), Number(m) - 1, 1)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
}

function duration(start: string, end: string) {
  const s = parseYM(start)
  const e = end.toLowerCase() === 'present' ? new Date() : parseYM(end)
  const months = Math.max(0, (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()) + 1)
  const y = Math.floor(months / 12)
  const m = months % 12
  const yStr = y ? `${y} yr${y > 1 ? 's' : ''}` : ''
  const mStr = m ? `${m} mo${m > 1 ? 's' : ''}` : ''
  return [yStr, mStr].filter(Boolean).join(' ')
}

function parseYM(iso: string) {
  const [y, m = '01'] = iso.split('-')
  return new Date(Number(y), Number(m) - 1, 1)
}

export default function ExperienceSection({ items = defaultItems }: { items?: ExperienceItem[] }) {
  // Scroll-linked car animation state
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const [trackHeight, setTrackHeight] = useState(0)
  useEffect(() => {
    function measure() {
      if (timelineRef.current) setTrackHeight(timelineRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  // Scroll progress relative to the timeline container
  // Scroll progress: start when top of timeline hits center, finish when bottom hits center
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start center', 'end center'] })
  // Size of the moving dot (in px) used to compute max travel distance
  const dotSize = 16
  const dotY = useTransform(scrollYProgress, (v) => v * Math.max(0, trackHeight - dotSize))
  const progressHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`)
  const progressWidth = useTransform(scrollYProgress, (v) => `${2 + (6 - 2) * v}px`) // grow 2px -> 6px

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16">
      <Reveal>
        <p className="text-sm uppercase tracking-widest text-neutral-300">Experience</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Work Experience</h2>
      </Reveal>

      <div ref={timelineRef} className="mt-8 relative">
        {/* Timeline rail with progress overlay */}
        <div aria-hidden className="absolute left-[13px] top-0 bottom-0 w-px bg-white/10 overflow-visible">
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-400 via-purple-400 to-pink-500 shadow-[0_0_6px_2px_rgba(147,197,253,0.35)]"
            style={{ height: progressHeight, width: progressWidth }}
          />
        </div>
        {/* Moving dot that follows scroll */}
        <motion.div
          aria-hidden
          style={{ y: dotY }}
          className="pointer-events-none absolute left-[13px] top-0 z-10 -translate-x-1/2"
        >
          <span className="block h-4 w-4 -translate-x-[1px] rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 ring-2 ring-black/40 shadow-md" />
        </motion.div>
        <ul className="space-y-8">
          {items.map((job, i) => (
            <Reveal key={`${job.company}-${job.role}-${i}`} delay={0.04 * i} y={20}>
              <li className="relative pl-10">
                {/* Timeline dot */}
                <article className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07] transition">
                  <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold">
                      {job.role}{' '}
                      <span className="text-neutral-300">
                        at{' '}
                        {job.url ? (
                          <Link href={job.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-white">
                            {job.company}
                          </Link>
                        ) : (
                          job.company
                        )}
                      </span>
                    </h3>
                    <div className="text-sm text-neutral-400">
                      <span>
                        {fmtMonthYear(job.start)} — {job.end.toLowerCase() === 'present' ? 'Present' : fmtMonthYear(job.end)}
                      </span>
                      <span className="mx-1.5">•</span>
                      <span>{duration(job.start, job.end)}</span>
                    </div>
                  </header>

                  <div className="mt-1 text-sm text-neutral-400">{job.location}</div>

                  {/* Achievements */}
                  <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                    {job.achievements.map((a, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  {job.stack && job.stack.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.stack.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

    </section>
  )
}
