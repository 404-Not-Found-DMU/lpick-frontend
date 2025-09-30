'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { NoticeItem } from '../../types'

export default function NoticesClient({ notices }: { notices: NoticeItem[] }) {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const total = notices.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return notices.slice(start, start + pageSize)
  }, [page, notices])

  const goFirst = () => setPage(1)
  const goPrev = () => setPage((p) => Math.max(1, p - 1))
  const goNext = () => setPage((p) => Math.min(pageCount, p + 1))
  const goLast = () => setPage(pageCount)

  return (
    <>
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

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-gray-500 dark:text-gray-400">총 {total}개의 게시물</div>
        <div className="flex items-center gap-2">
          <button onClick={goFirst} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏮︎</button>
          <button onClick={goPrev} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〈</button>
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
    </>
  )
}


