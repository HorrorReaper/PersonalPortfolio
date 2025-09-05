import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { MDXRenderer } from '@/components/MDXRenderer'
import { format } from 'date-fns'

export async function generateStaticParams() {
  return allPosts.filter((p) => p.published).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug && p.published)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    alternates: post.canonical ? { canonical: post.canonical } : undefined,
    openGraph: { images: post.cover ? [post.cover] : [] },
  }
}

type ReadingTime = { text?: string; words?: number; minutes?: number }

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug && p.published)
  if (!post) {
    notFound()
    return null // for type narrowing; unreachable after notFound
  }
  const rt = post.readingTime as ReadingTime | undefined
  const readingTimeText = rt?.text ?? ''
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 prose dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="m-0 text-sm text-neutral-400">
        {format(new Date(post.date), 'LLL d, yyyy')} • {readingTimeText}
      </p>
  <MDXRenderer code={post.body.code} />
    </article>
  )
}
