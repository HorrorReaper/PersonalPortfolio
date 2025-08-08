export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Patrick Eger. All rights reserved.</p>
        <p>
          Built with Next.js •{' '}
          <a className="hover:underline" href="https://vercel.com" target="_blank" rel="noreferrer">
            Deploy on Vercel
          </a>
        </p>
      </div>
    </footer>
  )
}
