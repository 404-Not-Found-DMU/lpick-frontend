'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { fetchInquiryList, type InquirySummary } from '../api'

export default function InquiryListClient() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [items, setItems] = useState<InquirySummary[]>([])
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
        const res = await fetchInquiryList({ keyword, page, size: pageSize })
        if (!active) return
        setItems(res.content ?? [])
        setTotal(res.totalElements ?? 0)
        setTotalPages(Math.max(1, res.totalPages ?? 1))
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : '문의 목록을 불러오지 못했습니다.')
        setItems([])
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

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault()
    setPage(1)
    setKeyword(keywordInput.trim())
    }

  const list = useMemo(() => items ?? [], [items])

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="relative flex items-center gap-3">
          <input
            placeholder="문의사항 검색..."
            className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
          />
          {keyword && (
            <button
              type="button"
              className="text-xs text-gray-500"
              onClick={() => {
                setKeyword('')
                setKeywordInput('')
                setPage(1)
              }}
            >
              초기화
            </button>
          )}
          <Link href="/support/inquiry/new" className="whitespace-nowrap rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">
            글등록
          </Link>
        </form>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 text-[13px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-700">
          <div className="col-span-1 text-center">번호</div>
          <div className="col-span-7">제목</div>
          <div className="col-span-2 text-center">작성자</div>
          <div className="col-span-2 text-center">작성일</div>
        </div>
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-500 dark:text-gray-300">불러오는 중입니다...</div>
        ) : error ? (
          <div className="py-16 text-center text-sm text-red-500">{error}</div>
        ) : list.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-500 dark:text-gray-300">등록된 문의가 없습니다.</div>
        ) : (
          list.map((item, idx) => {
            const displayNumber = total - ((page - 1) * pageSize + idx)
            const answer = item.answerInfo
            return (
              <div key={item.questionId}>
                <Link href={`/support/inquiry/${item.questionId}?type=question`} className="block">
              <div className={`grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/60 ${idx % 2 === 1 ? 'bg-gray-50/40 dark:bg-gray-800/30' : ''} border-b border-gray-100 dark:border-gray-700`}>
                    <div className="col-span-1 flex items-center justify-center text-sm text-gray-500">{displayNumber}</div>
                <div className="col-span-7">
                  <div className="flex items-center gap-2">
                    <span className="w-12 flex justify-start">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white bg-blue-500">문의</span>
                    </span>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 leading-tight">{item.title}</h3>
                  </div>
                </div>
                    <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{item.author}</div>
                    <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{new Date(item.createdAt).toISOString().slice(0, 10)}</div>
              </div>
            </Link>
                {answer && (
                  <Link href={`/support/inquiry/${item.questionId}?type=answer`} className="block">
                    <div className={`grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/60 border-b last:border-0 border-gray-100 dark:border-gray-700 ${idx % 2 === 1 ? 'bg-gray-50/40 dark:bg-gray-800/30' : ''}`}>
                  <div className="col-span-1" />
                  <div className="col-span-7">
                    <div className="flex items-center gap-2">
                      <span className="w-12 flex justify-start">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white bg-green-500">답변</span>
                      </span>
                      <span className="w-4 text-gray-400 select-none">↳</span>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 leading-tight">{answer.title}</h4>
                    </div>
                  </div>
                      <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{answer.author}</div>
                      <div className="col-span-2 text-center text-sm text-gray-500 tabular-nums">{answer.createdAt ? new Date(answer.createdAt).toISOString().slice(0, 10) : '-'}</div>
                </div>
              </Link>
            )}
          </div>
            )
          })
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-gray-500 dark:text-gray-400">총 {total}개의 게시물</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(1)} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏮︎</button>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〈</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)} className={`h-8 min-w-8 px-3 rounded-full text-xs flex items-center justify-center ${n === page ? 'bg-gray-900 text-white' : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50'}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〉</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏭︎</button>
        </div>
        <div className="text-gray-500 dark:text-gray-400">페이지 {page}/{totalPages}</div>
      </div>

    </div>
  )
}
