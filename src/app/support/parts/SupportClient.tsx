'use client'

import { useMemo, useState } from 'react'
import { QuickActions } from '../components/QuickActions'
import { ContactCards } from '../components/ContactCards'
import { FAQList } from '../components/FAQList'
import { FAQ_LIST } from '../constants'
import { Search } from 'lucide-react'

export default function SupportClient() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return FAQ_LIST
    return FAQ_LIST.filter((f) => [f.title, f.excerpt, ...f.tags].some((t) => t.toLowerCase().includes(q)))
  }, [query])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <QuickActions />
      <div className="mt-6 max-w-3xl mx-auto px-6 md:px-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="궁금한 내용을 검색해보세요..."
            className="w-full rounded-full border border-gray-200 bg-white px-10 py-3 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <ContactCards />
      <FAQList items={filtered} />
    </div>
  )
}


