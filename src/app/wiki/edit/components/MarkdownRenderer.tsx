"use client"

import ReactMarkdown, { type Options } from "react-markdown"
import remarkGfm from "remark-gfm"

export function MarkdownRenderer(props: Options) {
  return <ReactMarkdown {...props} remarkPlugins={[remarkGfm, ...(props.remarkPlugins || [])]} />
}
