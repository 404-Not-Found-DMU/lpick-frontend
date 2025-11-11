"use client"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"

type Components = Parameters<typeof ReactMarkdown>[0]['components']

export default function WikiRenderer({ content, components }: { content: string; components?: Components }) {
  const merged: Components = {
    a: ({ href, children, ...props }) => {
      const url = String(href ?? '')
      if (url.startsWith('/wiki/')) {
        return (
          <Link href={url} {...props} className="text-violet-600 hover:underline">
            {children}
          </Link>
        )
      }
      const isExternal = /^https?:\/\//.test(url)
      return (
        <a
          href={url}
          {...props}
          className="text-violet-600 hover:underline"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
    img: ({ src, alt }) => (
      <Image
        src={String(src)}
        alt={String(alt ?? '')}
        width={1200}
        height={800}
        sizes="(min-width: 768px) 720px, 100vw"
        className="mx-auto my-4 max-w-full h-auto rounded object-contain"
      />
    ),
    pre: ({ children }) => (
      <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-gray-100">
        {children}
      </pre>
    ),
    code: ({ children, className }) => (
      <code className={`rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800 ${className ?? ''}`}>{children}</code>
    ),
    table: ({ children }) => (
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse [&_th]:bg-gray-50 dark:[&_th]:bg-gray-900/40 [&_th]:text-left [&_th]:font-medium [&_th,&_td]:border [&_th,&_td]:border-gray-200 dark:[&_th,&_td]:border-gray-700 [&_th,&_td]:px-3 [&_th,&_td]:py-2">
          {children}
        </table>
      </div>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 dark:text-gray-300">{children}</blockquote>
    ),
    ul: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
    p: ({ children }) => <p className="leading-7 text-gray-800 dark:text-gray-200">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{children}</h3>,
    ...components,
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]} components={merged}>
      {content}
    </ReactMarkdown>
  )
}


