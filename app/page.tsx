'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.08 * i },
  }),
}

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
  <div className="absolute -top-24 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
  <div className="absolute -top-16 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
</div>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-24 pb-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-sm uppercase tracking-widest text-blue-300/80"
          >
            Web Developer • Frontend • Next.js
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
          >
            I build fast, elegant web experiences.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-2xl text-neutral-300"
          >
            I’m Your Name, a developer focused on delightful UX, clean architecture,
            and scalable frontend with React and Next.js.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm font-medium transition"
            >
              View Projects →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-md border border-white/20 hover:bg-white/5 text-white px-4 py-2 text-sm font-medium transition"
            >
              Read the Blog
            </Link>
            <a
              href="/YourName_CV.pdf"
              className="inline-flex items-center rounded-md border border-white/20 hover:bg-white/5 text-white px-4 py-2 text-sm font-medium transition"
            >
              Download CV
            </a>
          </motion.div>
        </section>

        {/* Featured Projects */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl font-semibold"
          >
            Featured Projects
          </motion.h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition p-4"
              >
                <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-white/10 to-white/0 mb-3" />
                <h3 className="font-medium">Project Title {i}</h3>
                <p className="text-sm text-neutral-300 mt-1">
                  Short one-liner about what it is and your role.
                </p>
                <Link href="/projects/sample" className="text-blue-300 hover:text-blue-200 inline-block mt-2 text-sm">
                  Read case study →
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Latest writing preview */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl font-semibold"
          >
            Latest Writing
          </motion.h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition p-4"
              >
                <h3 className="font-medium">Post Title {i}</h3>
                <p className="text-sm text-neutral-300 mt-1">
                  A short teaser about the topic and value of the post.
                </p>
                <div className="mt-2 text-xs text-neutral-400">5 min read • Jun 2025</div>
                <Link href="/blog/sample-post" className="text-blue-300 hover:text-blue-200 inline-block mt-2 text-sm">
                  Read post →
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={4}
            className="mt-6"
          >
            <Link href="/blog" className="text-sm text-neutral-300 hover:text-white">
              Visit the blog →
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
