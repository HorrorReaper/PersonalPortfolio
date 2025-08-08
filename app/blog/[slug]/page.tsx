import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { MDXComponents } from '@/components/MDXComponents'
import { format } from 'date-fns'

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
  const post = allPosts.find((p) => p.slug === params.slug && p.published)
  if (!post) return notFound()

  const MDX = useMDXComponent(post.body.code)

  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 prose dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="m-0 text-sm text-neutral-400">
        {format(new Date(post.date), 'LLL d, yyyy')} • {(post.readingTime?.text as any) ?? ''}
      </p>
      <MDX components={MDXComponents as any} />
    </article>
  )
}
