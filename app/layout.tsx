import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Patrick Eger — Personal Portfolio',
  description: 'Portfolio, projects, and blog by Patrick Eger.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Patrick Eger — Personal Portfolio',
    description: 'Portfolio, projects, and blog by Patrick Eger.',
    url: '/',
    siteName: 'YourName.dev',
    locale: 'en_US',
    type: 'website',
  },
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
