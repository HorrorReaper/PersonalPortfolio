import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { MDXComponents } from '@/components/MDXComponents'
import { format } from 'date-fns'
import type { Post } from 'contentlayer/generated'

export async function generateStaticParams() {
  return allPosts.filter((p) => p.published).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = allPosts.find((p) => p.slug === params.slug && p.published)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    alternates: post.canonical ? { canonical: post.canonical } : undefined,
    openGraph: { images: post.cover ? [post.cover] : [] },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post: Post | undefined = allPosts.find((p) => p.slug === params.slug && p.published)
  if (!post) {
    notFound()
  }
  // Hook must run unconditionally – after possible notFound() which throws
  const MDXContent = useMDXComponent(post.body.code)
  const readingTimeText = typeof post.readingTime === 'object' && post.readingTime && 'text' in post.readingTime
    ? (post.readingTime as { text?: string }).text ?? ''
    : ''
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 prose dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="m-0 text-sm text-neutral-400">
        {format(new Date(post.date), 'LLL d, yyyy')} • {readingTimeText}
      </p>
      <MDXContent components={MDXComponents} />
    </article>
  )
}
