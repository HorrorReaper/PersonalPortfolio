import Reveal from '@/components/motion/Reveal'
import MagneticButton from '@/components/ui/MagneticButton'
import Image from 'next/image'
import Link from 'next/link'
import { allProjects, allPosts, Project, Post } from 'contentlayer/generated'
import AboutSection from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'
import ContactSection from '@/components/ContactSection'

const roles = ['Web Development', 'Next.js', 'Online Marketing']

function Socials() {
  const linkClass = 'inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition'
  return (
    <div className="flex items-center gap-4">
      <a href="https://github.com/HorrorReaper" target="_blank" rel="noreferrer" className={linkClass} aria-label="GitHub">GitHub</a>
      <a href="https://www.linkedin.com/in/patrick-eger-ba22b1212/" target="_blank" rel="noreferrer" className={linkClass} aria-label="LinkedIn">LinkedIn</a>
      <a href="mailto:pe.business004@outlook.de" className={linkClass} aria-label="Email">Email</a>
    </div>
  )
}

export default function HomePage() {
  const featuredProjects: Project[] = allProjects
    .filter((p: Project) => p.published && p.featured)
    .sort((a: Project, b: Project) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3)

  const latestPosts: Post[] = allPosts
    .filter((p: Post) => p.published)
    .sort((a: Post, b: Post) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3)

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="bg-glow" aria-hidden />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-24 pb-14">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-neutral-300">Web Development • AI Automation • Online Marketing • Writing</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Hey, I'm <span className="text-gradient">Patrick</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-neutral-300">
              I’m a business informatics student from Germany, focused on different projects in the realm of web-developement, AI-Automation and Online-Marketing.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {roles.map((r) => (
                <span key={r} className="text-xs px-2 py-1 rounded-full border border-white/10 text-neutral-300">{r}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-md">
                <Link href="/projects">View Projects →</Link>
              </MagneticButton>
              <MagneticButton className="border border-white/10 px-4 py-2 text-sm font-medium rounded-md hover:bg-white/5">
                <Link href="#contact">Contact me</Link>
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8">
              <Socials />
            </div>
          </Reveal>
        </section>
        <AboutSection/>
        <ExperienceSection/>
        {/* Featured Projects */}
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <Reveal>
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
          </Reveal>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((p: Project) => (
              <Reveal key={p.slug} y={20}>
                <Link
                  href={p.url}
                  className="group block rounded-xl border border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/7 hover:-translate-y-1 transition will-change-transform"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
                    {p.cover ? (
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        priority={false}
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
              </Reveal>
            ))}
          </div>
        </section>

        {/* Latest writing */}
        {/*<section className="mx-auto max-w-6xl px-4 pb-16">
          <Reveal>
            <h2 className="text-2xl font-semibold">Latest Writing</h2>
          </Reveal>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post: Post, i: number) => (
              <Reveal key={post.slug} delay={0.04 * i} y={16}>
                <Link
                  href={post.url}
                  className="block rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition p-4"
                >
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-neutral-300 mt-1">{post.summary}</p>
                  <div className="mt-2 text-xs text-neutral-400">
                    {new Date(post.date).toLocaleDateString()} • {(post.readingTime as { text?: string } | undefined)?.text ?? ''}
                  </div>
                  <span className="text-blue-300 hover:text-blue-200 inline-block mt-2 text-sm">Read post →</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-6">
              <Link href="/blog" className="text-sm text-neutral-300 hover:text-white">
                Visit the blog →
              </Link>
            </div>
          </Reveal>
        </section>*/}
        <ContactSection />
      </main>
    </div>
  )
}
