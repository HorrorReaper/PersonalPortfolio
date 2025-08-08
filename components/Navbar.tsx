'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-white">Patrick Eger</span><span className="text-gradient">.dev</span>
        </Link>
        <ul className="flex items-center gap-1 text-sm">
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
      </nav>
    </header>
  )
}
