'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { FAQItem } from '../types'

type FAQListProps = {
  items: FAQItem[]
}

export function FAQList({ items }: FAQListProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">자주 묻는 질문</h2>

        <div className="divide-y divide-gray-100 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          {items.map((faq) => (
            <div key={faq.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                      {faq.id}
                    </span>
                    {faq.popular && (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                        자주 묻는 질문
                      </span>
                    )}
                    <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                      {faq.visibility}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 leading-snug">{faq.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.excerpt}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {faq.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gray-50 dark:bg-gray-700/60 px-2 py-0.5 text-[11px] text-gray-500 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="#"
                  className="ml-4 inline-flex items-center text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 text-sm"
                >
                  자세히 보기
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


