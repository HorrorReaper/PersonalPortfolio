import React from 'react'
import Link from 'next/link'

export const MDXComponents = {
  a: (props: any) => <Link {...props} className="text-blue-300 hover:text-blue-200 underline" />,
  img: (props: any) => <img {...props} className="rounded-lg" />,
  pre: (props: any) => <pre {...props} className="rounded-lg border border-white/10 !bg-[#0b0b0c] overflow-auto" />,
  code: (props: any) => <code {...props} className="px-1 py-0.5 rounded bg-white/10" />,
}
