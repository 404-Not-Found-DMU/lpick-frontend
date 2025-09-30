'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

type FAQ = { q: string; a: string }

export default function FaqClient({ faqs }: { faqs: FAQ[] }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqs
    return faqs.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
  }, [faqs, query])

  return (
    <>
      <div className="max-w-3xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="FAQ 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white px-10 py-3 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 shadow-sm">
        {filtered.map((item, idx) => (
          <details key={idx} className="group p-5">
            <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.q}</h3>
              <span className="text-violet-600 dark:text-violet-400 text-sm group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.a}</p>
          </details>
        ))}
        {filtered.length === 0 && (
          <div className="p-6 text-sm text-gray-500 dark:text-gray-400">검색 결과가 없습니다.</div>
        )}
      </div>
    </>
  )
}


