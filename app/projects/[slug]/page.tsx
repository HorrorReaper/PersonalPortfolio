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
    <article className="container mx-auto max-w-3xl px-4 py-16 prose dark:prose-invert">
      <h1>{project.title}</h1>
      {project.cover && (
        <div className="relative my-6 aspect-[16/9]">
          <Image src={project.cover} alt={project.title} fill className="object-cover rounded-xl" />
        </div>
      )}
      <p className="m-0 text-sm text-neutral-400">
        {new Date(project.date).toLocaleDateString()} • {readingTimeText}
      </p>
      {project.liveUrl || project.repoUrl ? (
        <p className="mt-2 text-sm">
          {project.liveUrl && (
            <a href={project.liveUrl} className="underline" target="_blank" rel="noreferrer">
              Live
            </a>
          )}
          {project.liveUrl && project.repoUrl && ' • '}
          {project.repoUrl && (
            <a href={project.repoUrl} className="underline" target="_blank" rel="noreferrer">
              Source
            </a>
          )}
        </p>
      ) : null}
  <MDXRenderer code={project.body.code} />
    </article>
  )
}
