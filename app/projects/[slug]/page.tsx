import { allProjects } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { MDXComponents } from '@/components/MDXComponents'
import type { Project } from 'contentlayer/generated'

export async function generateStaticParams() {
  return allProjects.filter((p) => p.published).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = allProjects.find((p) => p.slug === params.slug && p.published)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    openGraph: { images: project.cover ? [project.cover] : [] },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project: Project | undefined = allProjects.find((p) => p.slug === params.slug && p.published)
  if (!project) {
    notFound()
  }
  const MDXContent = useMDXComponent(project.body.code)
  const readingTimeText = typeof project.readingTime === 'object' && project.readingTime && 'text' in project.readingTime
    ? (project.readingTime as { text?: string }).text ?? ''
    : ''
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
      <MDXContent components={MDXComponents} />
    </article>
  )
}
