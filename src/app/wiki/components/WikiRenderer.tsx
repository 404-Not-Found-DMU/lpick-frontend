"use client"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

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
      // next/image는 마크다운 내 임의 사이즈 이미지 처리에 제약이 있어 기본 img 사용
      <img src={String(src)} alt={String(alt ?? '')} className="mx-auto my-4 max-w-full rounded" />
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
    p: ({ children }) => <p className="leading-7">{children}</p>,
    ...components,
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={merged}>
      {content}
    </ReactMarkdown>
  )
}


