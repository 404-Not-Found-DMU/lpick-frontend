'use client'

import { useMemo, useState } from 'react'
import { QuickActions } from './components/QuickActions'
import { ContactCards } from './components/ContactCards'
import { FAQList } from './components/FAQList'
import { FAQ_LIST } from './constants'

export default function SupportPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return FAQ_LIST
    return FAQ_LIST.filter((f) =>
      [f.title, f.excerpt, ...f.tags].some((t) => t.toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <QuickActions onSearch={setQuery} />
      <ContactCards />
      <FAQList items={filtered} />
    </div>
  )
}


