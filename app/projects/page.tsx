'use client'
import { allProjects, Project } from 'contentlayer/generated'
import Link from 'next/link'
import Image from 'next/image'
import ProjectsFilter, { ProjectLike } from '@/components/ProjectsFilter'
import React from 'react'
import Reveal from '@/components/motion/Reveal'
import StaggerOnScroll from '@/components/motion/Stagger'



export default function ProjectsPage() {
  const projects: Project[] = allProjects
    .filter((p: Project) => p.published)
    .sort((a: Project, b: Project) => +new Date(b.date) - +new Date(a.date))
  const base: ProjectLike[] = allProjects
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      tags: p.tags,
      stack: p.stack,
      url: p.url,
      cover: p.cover,
      date: p.date,
    }))
  
  // Memoize base to avoid creating a new array on every render, which would
  // cause `ProjectsFilter` to see a new `projects` prop and trigger a loop
  // when it calls `onResults` (which updates parent state).
  const memoBase = React.useMemo(() => base, [allProjects])

  const [items, setItems] = React.useState<ProjectLike[]>(base)

  /*return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold">Projects</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {projects.map((p: Project) => (
          <Link
            key={p.slug}
            href={p.url}
            className="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
              {p.cover ? (
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/0" />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm text-neutral-300 mt-1">{p.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {(p.stack ?? p.tags ?? []).slice(0, 4).map((t) => (
                  <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )*/
 return(
  <section className="container mx-auto max-w-6xl px-4 py-16">
      <Reveal>
        <h1 className="text-4xl font-bold">Projects</h1>
      </Reveal>

      <Reveal delay={0.06}>
        <ProjectsFilter projects={base} onResults={setItems} className="mt-6" />
      </Reveal>

      <StaggerOnScroll className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.slug}>
            <Link
              href={p.url}
              className="group block rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
                {p.cover ? (
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/0" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-sm text-neutral-300 mt-1">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {Array.from(new Set([...(p.stack ?? []), ...(p.tags ?? [])])).slice(0, 6).map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </StaggerOnScroll>

      {items.length === 0 && (
        <Reveal>
          <p className="mt-8 text-neutral-400">No projects match your search/filters.</p>
        </Reveal>
      )}
    </section>
 )
}
