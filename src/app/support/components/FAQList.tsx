'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { FAQItem } from '../types'

type FAQListProps = {
  items: FAQItem[]
}

function getVisibilityBadgeStyles(visibility: FAQItem['visibility']) {
  switch (visibility) {
    case '모든 사용자':
      return 'bg-gray-50 text-gray-600 border border-gray-200 dark:bg-gray-800/60 dark:text-gray-300 dark:border-gray-700'
    case '회원':
      return 'bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800'
    case '비회원':
      return 'bg-zinc-50 text-zinc-600 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700'
  }
}

function getTagBadgeStyles(tag: string) {
  if (tag.includes('서비스')) {
    return 'bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800'
  }
  if (tag.includes('기본') || tag.includes('게시글')) {
    return 'bg-zinc-50 text-zinc-600 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700'
  }
  if (tag.includes('음반') || tag.includes('워키')) {
    return 'bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800'
  }
  if (tag.includes('위키')) {
    return 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800'
  }
  if (tag.includes('커뮤니티')) {
    return 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 dark:border-fuchsia-800'
  }
  return 'bg-gray-50 text-gray-600 border border-gray-200 dark:bg-gray-800/60 dark:text-gray-300 dark:border-gray-700'
}

export function FAQList({ items }: FAQListProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">자주 묻는 질문</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              LPick 서비스 이용에 대해 가장 많이 문의하시는 내용들입니다.
            </p>
          </div>
          <Link
            href="/support/faq"
            className="inline-flex items-center text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 text-sm"
          >
            자세히 보기
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
          {items.map((faq) => (
            <div key={faq.id} className="p-5 hover:bg-violet-50/30 dark:hover:bg-violet-900/10 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start gap-4">
                {/* left: content */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                      {faq.id}
                    </span>
                    {faq.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${getTagBadgeStyles(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 leading-snug">{faq.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.excerpt}</p>
                </div>

                {/* right: badges */}
                <div className="md:ml-6 flex md:flex-col items-end gap-2 md:gap-3 md:justify-between">
                  <div className="flex items-center gap-2">
                    {faq.popular && (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[11px] font-semibold dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">
                        자주 묻는 질문
                      </span>
                    )}
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${getVisibilityBadgeStyles(faq.visibility)}`}>
                      {faq.visibility}
                    </span>
                  </div>
                  {/* per-row link 제거 - 상단 우측 링크 사용 */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


