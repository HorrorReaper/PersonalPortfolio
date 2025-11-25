/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type AnchorProps = React.ComponentProps<'a'>
type ImgProps = React.ComponentProps<'img'>
type PreProps = React.ComponentProps<'pre'>
type CodeProps = React.ComponentProps<'code'>
type HeadingProps = React.ComponentProps<'h2'>

export const MDXComponents = {
  h2: (props: HeadingProps) => (
    <h2 {...props} className={`mt-10 scroll-mt-20 text-2xl font-semibold border-l-4 border-blue-500 pl-4 ${props.className ?? ''}`} />
  ),
  h3: (props: HeadingProps) => (
    <h3 {...props} className={`mt-8 scroll-mt-20 text-xl font-semibold text-neutral-200 ${props.className ?? ''}`} />
  ),
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
  // eslint-disable-next-line @next/next/no-img-element
  img: (props: ImgProps) => {
    const { alt = '', src = '', className, ...rest } = props as ImgProps & { src?: string }
    // If external or data URL fallback to plain img to avoid errors
    if (typeof src === 'string' && (src.startsWith('http') || src.startsWith('data:'))) {
      return <img {...rest} src={src} alt={alt} className={`rounded-lg ${className ?? ''}`} />
    }
    if (typeof src !== 'string') {
      return <img {...rest} alt={alt} className={`rounded-lg ${className ?? ''}`} />
    }
    return <Image src={src} alt={alt} width={800} height={450} className={`rounded-lg ${className ?? ''}`} />
  },
  pre: (props: PreProps) => <pre {...props} className={`rounded-lg border border-white/10 !bg-[#0b0b0c] overflow-auto ${props.className ?? ''}`} />,
  code: (props: CodeProps) => <code {...props} className={`px-1 py-0.5 rounded bg-white/10 ${props.className ?? ''}`} />,
}
