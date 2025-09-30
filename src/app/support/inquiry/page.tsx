'use client'

import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

type InquiryItem = {
  id: number
  threadId: number
  type: '문의' | '답변'
  title: string
  author: string
  date: string
  views: number
  content?: string
}

// 원시 데이터: 같은 threadId의 문의/답변이 한 묶음
const RAW_INQUIRIES: InquiryItem[] = [
  { id: 701, threadId: 701, type: '문의', title: '비밀글입니다.', author: '김**', date: '2025-09-27', views: 0 },
  { id: 600, threadId: 600, type: '문의', title: '홈페이지 문의', author: '김현수', date: '2025-08-03', views: 0 },
  { id: 601, threadId: 600, type: '답변', title: '[RE] 홈페이지 문의', author: '총관리자', date: '2025-08-03', views: 0 },
  { id: 500, threadId: 500, type: '문의', title: '비밀글입니다.', author: '김**', date: '2025-08-03', views: 0 },
]

const MORE_THREADS: InquiryItem[] = Array.from({ length: 15 }).flatMap((_, i) => {
  const base = 490 - i
  const question: InquiryItem = {
    id: base,
    threadId: base,
    type: '문의',
    title: `문의 사항 ${i + 1}`,
    author: '이**',
    date: '2025-08-03',
    views: 0,
  }
  const answered = i % 3 === 0
  return answered
    ? [question, { id: base - 1, threadId: base, type: '답변', title: `[RE] 문의 사항 ${i + 1}`, author: '총관리자', date: '2025-08-03', views: 0 }]
    : [question]
})

const ALL_ITEMS: InquiryItem[] = [...RAW_INQUIRIES, ...MORE_THREADS]

type Thread = { threadId: number; question: InquiryItem; answer?: InquiryItem }

function buildThreads(items: InquiryItem[]): Thread[] {
  const map = new Map<number, Thread>()
  items.forEach((it) => {
    const t = map.get(it.threadId) ?? { threadId: it.threadId, question: it }
    if (it.type === '문의') t.question = it
    if (it.type === '답변') t.answer = it
    map.set(it.threadId, t)
  })
  // 최신 threadId 순 정렬
  return Array.from(map.values()).sort((a, b) => b.threadId - a.threadId)
}

export default function InquiryPage() {
  const [page, setPage] = useState(1)
  const pageSize = 10 // thread 단위 페이지 크기
  const threads = useMemo(() => buildThreads(ALL_ITEMS), [])
  const totalThreads = threads.length
  const pageCount = Math.max(1, Math.ceil(totalThreads / pageSize))

  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return threads.slice(start, start + pageSize)
  }, [page, threads])

  const goFirst = () => setPage(1)
  const goPrev = () => setPage((p) => Math.max(1, p - 1))
  const goNext = () => setPage((p) => Math.min(pageCount, p + 1))
  const goLast = () => setPage(pageCount)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          {/* 상단 타이틀 */}
          <div className="mb-3" />
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

          {/* 검색 + 글등록 */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative flex items-center gap-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder="문의사항 검색..."
                className="w-full rounded-full border border-gray-200 bg-white px-10 py-3 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
              <Link href="/support/inquiry/new" className="whitespace-nowrap rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">글등록</Link>
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
            {current.map((t, idx) => (
              <div key={t.threadId}>
                {/* 문의(원글) */}
                <Link href={`/support/inquiry/${t.threadId}?type=question`} className="block">
                  <div className={`grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/60 ${idx % 2 === 1 ? 'bg-gray-50/40 dark:bg-gray-800/30' : ''} border-b border-gray-100 dark:border-gray-700`}>
                    <div className="col-span-1 flex items-center justify-center text-sm text-gray-500">{totalThreads - ((page - 1) * pageSize + idx)}</div>
                    <div className="col-span-7">
                      <div className="flex items-center gap-2">
                        <span className="w-12 flex justify-start">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white bg-blue-500">문의</span>
                        </span>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 leading-tight">{t.question.title}</h3>
                      </div>
                    </div>
                    <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{t.question.author}</div>
                    <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{t.question.date}</div>
                  </div>
                </Link>
                {/* 답변 (있으면) */}
                {t.answer && (
                  <Link href={`/support/inquiry/${t.threadId}?type=answer`} className="block">
                    <div className={`grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/60 ${idx % 2 === 1 ? 'bg-gray-50/40 dark:bg-gray-800/30' : ''} border-b last:border-0 border-gray-100 dark:border-gray-700`}>
                      <div className="col-span-1" />
                      <div className="col-span-7">
                        <div className="flex items-center gap-2">
                          <span className="w-12 flex justify-start">
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white bg-green-500">답변</span>
                          </span>
                          <span className="w-4 text-gray-400 select-none">↳</span>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 leading-tight">{t.answer.title}</h4>
                        </div>
                      </div>
                      <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{t.answer.author}</div>
                      <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{t.answer.date}</div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500 dark:text-gray-400">총 {totalThreads}개의 게시물</div>
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


