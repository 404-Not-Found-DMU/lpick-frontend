'use client'

import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

type Notice = {
  id: number
  title: string
  date: string
  summary: string
  type?: '공지' | '대회' | '이벤트'
  views?: number
}

// 목업 데이터 (페이지네이션 데모용)
const RAW_NOTICES: Notice[] = [
  { id: 101, title: '홈페이지 공지 안내', date: '2025-08-02', summary: '서비스 개선 관련 공지입니다.', type: '공지', views: 331 },
  { id: 100, title: '홈페이지 공지4 안내', date: '2025-08-02', summary: '일부 기능 업데이트 안내.', type: '공지', views: 122 },
  { id: 99, title: '홈페이지 공지 안내', date: '2025-08-02', summary: '서비스 안정화 공지.', type: '공지', views: 331 },
  { id: 2, title: '홈페이지 공지2 안내', date: '2025-08-02', summary: '대회 관련 공지입니다.', type: '대회', views: 687 },
  { id: 1, title: '홈페이지 공지3 안내', date: '2025-08-02', summary: '이벤트 안내입니다.', type: '이벤트', views: 112 },
]

// 더미 목록 확장
const MOCK_NOTICES: Notice[] = [
  ...RAW_NOTICES,
  ...Array.from({ length: 18 }).map((_, i) => ({
    id: 80 - i,
    title: `일반 공지 ${i + 1}`,
    date: '2025-07-15',
    summary: '일반 공지입니다.',
    views: 200 + i * 3,
  })),
]

export default function NoticesPage() {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const total = MOCK_NOTICES.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return MOCK_NOTICES.slice(start, start + pageSize)
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
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">공지사항</h1>
            <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400">LPick의 최신 소식과 안내를 확인하세요.</p>
          </div>

          {/* 검색 */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder="공지사항 검색..."
                className="w-full rounded-full border border-gray-200 bg-white px-10 py-3 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* 목록 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 px-6 py-3 text-[13px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-700">
              <div className="col-span-1 text-center">번호</div>
              <div className="col-span-8 text-center">제목</div>
              <div className="col-span-2 text-center">작성일</div>
              <div className="col-span-1 text-right pr-1">조회수</div>
            </div>
            {current.map((n, idx) => (
              <Link key={n.id} href={`/support/notices/${n.id}`} className="block">
                <div className={`grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/60 ${idx % 2 === 1 ? 'bg-gray-50/40 dark:bg-gray-800/30' : ''} border-b last:border-0 border-gray-100 dark:border-gray-700`}>
                  <div className="col-span-1 flex items-center justify-center gap-2">
                    {n.type ? (
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${
                        n.type === '공지' ? 'bg-gray-900' : n.type === '대회' ? 'bg-red-500' : 'bg-blue-500'
                      }`}>{n.type}</span>
                    ) : (
                      <span className="text-sm text-gray-500">{total - ((page - 1) * pageSize + idx)}</span>
                    )}
                  </div>
                  <div className="col-span-8">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 leading-tight">{n.title}</h3>
                    <p className="mt-1 text-[13px] text-gray-600 dark:text-gray-300 line-clamp-1">{n.summary}</p>
                  </div>
                  <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{n.date}</div>
                  <div className="col-span-1 text-right text-sm text-gray-500 tabular-nums pr-1">{(n.views ?? 0).toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* 하단 요약 + 페이지네이션 */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500 dark:text-gray-400">총 {total}개의 게시물</div>
            <div className="flex items-center gap-2">
              <button onClick={goFirst} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏮︎</button>
              <button onClick={goPrev} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〈</button>
              {/* 페이지 번호 */}
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-8 min-w-8 px-3 rounded-full text-xs flex items-center justify-center ${
                    n === page ? 'bg-gray-900 text-white' : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button onClick={goNext} disabled={page === pageCount} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〉</button>
              <button onClick={goLast} disabled={page === pageCount} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏭︎</button>
            </div>
            <div className="text-gray-500 dark:text-gray-400">페이지 {page}/{pageCount}</div>
          </div>
        </div>
      </div>
    </div>
  )
}


