'use client'

import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'

export type ProjectLike = {
  slug: string
  title: string
  summary: string
  tags?: string[]
  stack?: string[]
  url: string
  cover?: string
  date: string
}

type Props = {
  projects: ProjectLike[]
  initialQuery?: string
  className?: string
  onResults?: (items: ProjectLike[]) => void
}

export default function ProjectsFilter({ projects, initialQuery = '', className, onResults }: Props) {
  const [query, setQuery] = useState(initialQuery)
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [showTags, setShowTags] = useState<'tags' | 'stack'>('tags')

  // Collect all tags/stacks for chips
  const allTags = useMemo(() => {
    const set = new Set<string>()
    projects.forEach(p => (p.tags ?? []).forEach(t => set.add(String(t).toLowerCase())))
    return Array.from(set).sort()
  }, [projects])

  const allStack = useMemo(() => {
    const set = new Set<string>()
    projects.forEach(p => (p.stack ?? []).forEach(t => set.add(String(t).toLowerCase())))
    return Array.from(set).sort()
  }, [projects])

  // Filtering logic
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter(p => {
      // text search
      const matchesText = q.length === 0
        || String(p.title ?? '').toLowerCase().includes(q)
        || String(p.summary ?? '').toLowerCase().includes(q)

      // tags/stack filter (project must include ALL active tags)
      const source = showTags === 'tags' ? (p.tags ?? []) : (p.stack ?? [])
      const tags = new Set(source.map(s => String(s ?? '').toLowerCase()))
      const matchesTags = activeTags.length === 0
        || activeTags.every(t => tags.has(t.toLowerCase()))

      return matchesText && matchesTags
    })
  }, [projects, query, activeTags, showTags])

  useEffect(() => {
    onResults?.(results)
  }, [results, onResults])

  // helpers
  function toggleTag(tag: string) {
    const key = tag.toLowerCase()
    setActiveTags(prev => prev.includes(key) ? prev.filter(t => t !== key) : [...prev, key])
  }
  function clearFilters() {
    setActiveTags([])
    setDraft('')
    setQuery('')
  }

  // debounce typing
  const [draft, setDraft] = useState(query)
  useEffect(() => {
    const id = setTimeout(() => setQuery(draft), 200)
    return () => clearTimeout(id)
  }, [draft])

  // sync external initialQuery changes
  useEffect(() => {
    setQuery(initialQuery)
    setDraft(initialQuery)
  }, [initialQuery])

  return (
    <div className={clsx('rounded-xl border border-white/10 bg-white/5 p-4', className)}>
      {/* Search + counts */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <label htmlFor="project-search" className="block text-xs text-neutral-400">Search projects</label>
          <input
            id="project-search"
            value={draft}
            onChange={(e) => {
              const v = e.target.value
              setDraft(v)
              // if the input is empty or only whitespace, update query immediately (avoid debounce)
              if (v.trim() === '') setQuery('')
            }}
            placeholder="Type to search by title or summary…"
            className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-neutral-400 focus:border-white/20"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400">
            {results.length} / {projects.length} results
          </span>
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs rounded-md border border-white/10 px-2 py-1 hover:bg-white/5"
            aria-label="Clear search and filters"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-neutral-400">Filter by:</span>
          <button
            type="button"
            onClick={() => setShowTags('tags')}
            className={clsx('text-xs rounded-md px-2 py-1', showTags === 'tags' ? 'bg-white/10 border border-white/10' : 'hover:bg-white/5')}
          >
            Tags
          </button>
          <button
            type="button"
            onClick={() => setShowTags('stack')}
            className={clsx('text-xs rounded-md px-2 py-1', showTags === 'stack' ? 'bg-white/10 border border-white/10' : 'hover:bg-white/5')}
          >
            Stack
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(showTags === 'tags' ? allTags : allStack).map(tag => {
            const active = activeTags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={clsx(
                  'text-[11px] px-2 py-0.5 rounded border',
                  active ? 'bg-blue-500/30 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/7'
                )}
                aria-pressed={active}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
