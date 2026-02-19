import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PageTransition from '@/components/motion/PageTransition'
import Starfield from '@/components/Starfield'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Patrick Eger - Personal Portfolio',
  description: 'Portfolio and projects of Patrick Eger.',
  metadataBase: new URL('https://patrickeger.vercel.app/'),
  openGraph: {
    title: 'Patrick Eger — Personal Portfolio',
    description: 'Portfolio and projects of Patrick Eger.',
    url: '/',
    siteName: 'patrickeger.vercel.app',
    locale: 'en_US',
    type: 'website',
  },
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
  <PageTransition>
          <Starfield density={0.00012} maxStars={700} speed={1} parallax={12} color="#ffffff" />
          {children}
          </PageTransition>
          <Footer />
      </body>
    </html>
  )
}
