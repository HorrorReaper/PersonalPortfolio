'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  //{ href: '/blog', label: 'Blog' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-white">Patrick Eger</span><span className="text-gradient">.dev</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={clsx(
                  'px-3 py-1.5 rounded-md hover:bg-white/5 transition',
                  pathname === l.href && 'text-gradient'
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-neutral-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Open main menu</span>
          {/* Hamburger */}
          <svg
            className={clsx('h-6 w-6', open && 'hidden')}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
          {/* Close */}
          <svg
            className={clsx('h-6 w-6', !open && 'hidden')}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        id="mobile-menu"
        className={clsx(
          'md:hidden absolute left-0 right-0 top-14 overflow-hidden border-b border-white/10 bg-black/70 backdrop-blur',
          'transition-all duration-300 ease-out',
          open ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <ul className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-1 text-base">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={clsx(
                  'block px-3 py-2 rounded-md hover:bg-white/5 transition',
                  pathname === l.href && 'text-gradient'
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
