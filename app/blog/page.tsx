import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { format } from 'date-fns'

export const metadata = {
  title: 'Blog',
  description: 'Notes on frontend, Next.js, and UI engineering.',
}

export default function BlogPage() {
  const posts = allPosts
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold">Blog</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.url}
            className="block rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition p-4"
          >
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-neutral-300 mt-1">{post.summary}</p>
            <div className="mt-2 text-xs text-neutral-400">
              {format(new Date(post.date), 'LLL d, yyyy')} • {(typeof post.readingTime === 'object' && post.readingTime && 'text' in post.readingTime ? (post.readingTime as { text?: string }).text : '') || ''}
            </div>
            <span className="text-blue-300 hover:text-blue-200 inline-block mt-2 text-sm">Read post →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
