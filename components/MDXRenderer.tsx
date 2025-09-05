'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import { MDXComponents } from '@/components/MDXComponents'

interface MDXRendererProps {
  code: string
}

export function MDXRenderer({ code }: MDXRendererProps) {
  const MDXContent = useMDXComponent(code)
  return <MDXContent components={MDXComponents} />
}
