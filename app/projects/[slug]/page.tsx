import { allProjects } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { MDXRenderer } from '@/components/MDXRenderer'
type ReadingTime = { text?: string; words?: number; minutes?: number }

export async function generateStaticParams() {
  return allProjects.filter((p) => p.published).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = allProjects.find((p) => p.slug === slug && p.published)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    openGraph: { images: project.cover ? [project.cover] : [] },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = allProjects.find((p) => p.slug === slug && p.published)
  if (!project) {
    notFound()
    return null
  }
  const rt = project.readingTime as ReadingTime | undefined
  const readingTimeText = rt?.text ?? ''

  return (
    <main className="container mx-auto max-w-6xl px-4 py-16">
      <div className="grid grid-cols-1 gap-8 items-start">
        <header className="lg:col-span-2">
          <h1 className="text-4xl font-extrabold leading-tight">{project.title}</h1>
          <p className="mt-3 text-neutral-400">{project.summary}</p>
        </header>

        {/* Full-width cover under the title */}
        {project.cover ? (
          <div className="w-full rounded-xl overflow-hidden border border-white/6">
            <div className="relative aspect-[16/9]">
              <Image src={project.cover} alt={project.title} fill className="object-cover" />
            </div>
          </div>
        ) : null}

      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <time className="text-sm text-neutral-400">{new Date(project.date).toLocaleDateString()}</time>
        <span className="text-sm text-neutral-400">•</span>
        <span className="text-sm text-neutral-400">{readingTimeText}</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(project.stack ?? project.tags ?? []).map((t) => (
          <span key={t} className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-sm text-neutral-200 border border-white/6">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow-md"
          >
            View Live
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-neutral-200 bg-white/3 hover:bg-white/5"
          >
            View Source
          </a>
        )}
      </div>

      <article className="prose dark:prose-invert mt-10 max-w-none">
        <MDXRenderer code={project.body.code} />
      </article>
    </main>
  )
}
