'use client'

import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

type Inquiry = {
  id: number
  title: string
  author: string
  date: string
  views: number
  type?: '문의' | '답변'
}

const RAW_INQUIRIES: Inquiry[] = [
  { id: 7, title: '비밀글입니다.', author: '김**', date: '2025-09-27', views: 0, type: '문의' },
  { id: 6, title: '홈페이지 문의', author: '김현수', date: '2025-08-03', views: 0, type: '문의' },
  { id: 5, title: '[RE] 홈페이지 문의', author: '총관리자', date: '2025-08-03', views: 0, type: '답변' },
  { id: 4, title: '비밀글입니다.', author: '김**', date: '2025-08-03', views: 0, type: '문의' },
]

const MOCK_INQUIRIES: Inquiry[] = [
  ...RAW_INQUIRIES,
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: 4 - i,
    title: `문의 사항 ${i + 1}`,
    author: '이**',
    date: '2025-08-03',
    views: 0,
    type: i % 3 === 0 ? '답변' : '문의',
  })),
]

export default function InquiryPage() {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const total = MOCK_INQUIRIES.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return MOCK_INQUIRIES.slice(start, start + pageSize)
  }, [page])

  const goFirst = () => setPage(1)
  const goPrev = () => setPage((p) => Math.max(1, p - 1))
  const goNext = () => setPage((p) => Math.min(pageCount, p + 1))
  const goLast = () => setPage(pageCount)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          {/* 돌아가기 */}
          <div className="mb-8">
            <Link href="/support" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">고객센터로 돌아가기</span>
            </Link>
          </div>

          {/* 제목 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">1:1 문의</h1>
            <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400">개별 문의사항을 남겨주시면 빠르게 답변드릴게요.</p>
          </div>

          {/* 검색 */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder="문의사항 검색..."
                className="w-full rounded-full border border-gray-200 bg-white px-10 py-3 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* 목록 테이블 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 px-6 py-3 text-[13px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-700">
              <div className="col-span-1 text-center">번호</div>
              <div className="col-span-7">제목</div>
              <div className="col-span-2 text-center">작성자</div>
              <div className="col-span-2 text-center">작성일</div>
            </div>
            {current.map((q, idx) => (
              <Link key={q.id} href={`/support/inquiry/${q.id}`} className="block">
                <div className={`grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/60 ${idx % 2 === 1 ? 'bg-gray-50/40 dark:bg-gray-800/30' : ''} border-b last:border-0 border-gray-100 dark:border-gray-700`}>
                  <div className="col-span-1 flex items-center justify-center text-sm text-gray-500">{total - ((page - 1) * pageSize + idx)}</div>
                  <div className="col-span-7">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${q.type === '답변' ? 'bg-green-500' : 'bg-blue-500'}`}>{q.type}</span>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 leading-tight">{q.title}</h3>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{q.author}</div>
                  <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{q.date}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500 dark:text-gray-400">총 {total}개의 게시물</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(1)} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏮︎</button>
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〈</button>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} className={`h-8 min-w-8 px-3 rounded-full text-xs flex items-center justify-center ${n === page ? 'bg-gray-900 text-white' : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50'}`}>{n}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page === pageCount} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〉</button>
              <button onClick={() => setPage(pageCount)} disabled={page === pageCount} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏭︎</button>
            </div>
            <div className="text-gray-500 dark:text-gray-400">페이지 {page}/{pageCount}</div>
          </div>
        </div>
      </div>
    </div>
  )
}


