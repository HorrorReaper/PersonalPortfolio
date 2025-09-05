import React from 'react'
import Link from 'next/link'

type AnchorProps = React.ComponentProps<'a'>
type ImgProps = React.ComponentProps<'img'>
type PreProps = React.ComponentProps<'pre'>
type CodeProps = React.ComponentProps<'code'>

export const MDXComponents = {
  a: (props: AnchorProps) => {
    const { href = '#', children, className, ...rest } = props
    // If it's an external link keep native <a>
    const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:')
    if (isExternal) {
      return (
        <a
          href={href}
          className={`text-blue-300 hover:text-blue-200 underline ${className ?? ''}`}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          {...rest}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={`text-blue-300 hover:text-blue-200 underline ${className ?? ''}`} {...rest}>
        {children}
      </Link>
    )
  },
  img: (props: ImgProps) => <img {...props} className={`rounded-lg ${props.className ?? ''}`} />,
  pre: (props: PreProps) => <pre {...props} className={`rounded-lg border border-white/10 !bg-[#0b0b0c] overflow-auto ${props.className ?? ''}`} />,
  code: (props: CodeProps) => <code {...props} className={`px-1 py-0.5 rounded bg-white/10 ${props.className ?? ''}`} />,
}
