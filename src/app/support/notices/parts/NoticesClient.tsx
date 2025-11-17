'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchSupportNoticeList, type SupportNoticeSummary } from '../api'

export default function NoticesClient() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [notices, setNotices] = useState<SupportNoticeSummary[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchSupportNoticeList({ keyword, page, size: pageSize })
        if (!active) return
        setNotices(result.content ?? [])
        setTotal(result.totalElements ?? 0)
        setTotalPages(Math.max(1, result.totalPages ?? 1))
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : '공지사항을 불러오지 못했습니다.')
        setNotices([])
        setTotal(0)
        setTotalPages(1)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [keyword, page, pageSize])

  const goFirst = () => setPage(1)
  const goPrev = () => setPage((p) => Math.max(1, p - 1))
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1))
  const goLast = () => setPage(totalPages)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setKeyword(keywordInput.trim())
  }

  const formatDate = (value?: string) => {
    if (!value) return '-'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value.slice(0, 10)
    return date.toISOString().slice(0, 10)
  }

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <input
            placeholder="공지사항 검색..."
            className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
          />
          {keyword && (
            <button
              type="button"
              onClick={() => {
                setKeyword('')
                setKeywordInput('')
                setPage(1)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500"
            >
              초기화
            </button>
          )}
        </form>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 text-[13px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-700">
          <div className="col-span-1 text-center">번호</div>
          <div className="col-span-8 text-center">제목</div>
          <div className="col-span-2 text-center">작성일</div>
          <div className="col-span-1 text-right pr-1">조회수</div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20 text-sm text-gray-500 dark:text-gray-300">불러오는 중입니다...</div>
        ) : error ? (
          <div className="flex items-center justify-center py-20 text-sm text-red-500">{error}</div>
        ) : notices.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-sm text-gray-500 dark:text-gray-300">등록된 공지사항이 없습니다.</div>
        ) : (
        notices.map((n, idx) => {
          const noticeKey = n.noticeId ?? String(idx)
          const displayNumber = n.no ?? total - ((page - 1) * pageSize + idx)
          return (
            <Link key={noticeKey} href={`/support/notices/${noticeKey}`} className="block">
              <div className={`grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/60 ${idx % 2 === 1 ? 'bg-gray-50/40 dark:bg-gray-800/30' : ''} border-b last:border-0 border-gray-100 dark:border-gray-700`}>
                <div className="col-span-1 flex items-center justify-center gap-2">
                  {n.type ? (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${
                      n.type === '공지' ? 'bg-gray-900' : n.type === '대회' ? 'bg-red-500' : 'bg-blue-500'
                    }`}>{n.type}</span>
                  ) : (
                    <span className="text-sm text-gray-500">{displayNumber}</span>
                  )}
                </div>
                <div className="col-span-8">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 leading-tight">{n.title}</h3>
                  {n.summary ? <p className="mt-1 text-[13px] text-gray-600 dark:text-gray-300 line-clamp-1">{n.summary}</p> : null}
                </div>
                <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{formatDate(n.createdAt)}</div>
                <div className="col-span-1 text-right text-sm text-gray-500 tabular-nums pr-1">{n.views != null ? n.views.toLocaleString() : '-'}</div>
              </div>
            </Link>
          )
        })
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-gray-500 dark:text-gray-400">총 {total}개의 게시물</div>
        <div className="flex items-center gap-2">
          <button onClick={goFirst} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏮︎</button>
          <button onClick={goPrev} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〈</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
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
          <button onClick={goNext} disabled={page === totalPages} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〉</button>
          <button onClick={goLast} disabled={page === totalPages} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏭︎</button>
        </div>
        <div className="text-gray-500 dark:text-gray-400">페이지 {page}/{totalPages}</div>
      </div>
    </div>
  )
}


