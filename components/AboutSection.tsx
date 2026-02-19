// components/AboutSection.tsx
import Image from 'next/image'
//import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
//import MagneticButton from '@/components/ui/MagneticButton'

const skills = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS', 'JavaScript'],
  Backend: ['Node.js', 'PostgreSQL', 'Prisma', 'Rest API', 'MySQL'],
  Tools: ['Vercel', 'Git/GitHub', 'Figma', 'Framer'],
}

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Portrait */}
        <Reveal>
          <div className="relative mx-auto h-60 w-60 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg">
            {/* Replace with your image: put /public/images/Me.jpeg */}
            <Image
              src="/images/Me.jpeg" /* must start with / and match file case exactly */
              alt="Patrick Eger portrait"
              fill
              className="object-cover"
              sizes="240px"
              priority
            />
            {/* Subtle gradient border accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-neutral-300">About me</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
              I’m Patrick Eger, I love building things.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 text-neutral-300">
               I care about consistent designs,
              great User Experience, and performance. Recently, I’ve build my own projects, like the chrome extension and projects for some clients.
            </p>
          </Reveal>

          {/* Highlights */}
          <Reveal delay={0.18}>
            <ul className="mt-4 grid gap-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                5+ years building Web-Development projects
              </li>
              {/*<li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-pink-400" />
                Open source and writing: posts on self-improvement, dev, and productivity
              </li>*/}
            </ul>
          </Reveal>

          {/* Skills */}
          <Reveal delay={0.24}>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {Object.entries(skills).map(([group, list]) => (
                <div key={group} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <h3 className="text-sm font-semibold">{group}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {list.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTAs */}
          {/*
          <Reveal delay={0.3}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticButton className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-md">
                <Link href="/projects">View Projects →</Link>
              </MagneticButton>
              <MagneticButton className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm font-medium rounded-md">
                <Link href="/blog">Read Blog →</Link>
              </MagneticButton>

            </div>
          </Reveal>*/}
        </div>
      </div>
    </section>
  )
}
