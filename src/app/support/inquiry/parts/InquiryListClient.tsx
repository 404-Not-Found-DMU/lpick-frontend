'use client'

import Link from 'next/link'
import { MouseEvent, useMemo, useState } from 'react'
import { Modal } from '@/components/Modal'

export type InquiryItem = {
  id: number
  threadId: number
  type: '문의' | '답변'
  title: string
  author: string
  date: string
  views: number
  isSecret?: boolean
  authorId?: string
}

type Thread = { threadId: number; question: InquiryItem; answer?: InquiryItem }

function buildThreads(items: InquiryItem[]): Thread[] {
  const map = new Map<number, Thread>()
  items.forEach((it) => {
    const t = map.get(it.threadId) ?? { threadId: it.threadId, question: it }
    if (it.type === '문의') t.question = it
    if (it.type === '답변') t.answer = it
    map.set(it.threadId, t)
  })
  return Array.from(map.values()).sort((a, b) => b.threadId - a.threadId)
}

export default function InquiryListClient({ items, currentUserId = 'guest' }: { items: InquiryItem[]; currentUserId?: string }) {
  const [page, setPage] = useState(1)
  const [secretOpen, setSecretOpen] = useState(false)
  const pageSize = 10
  const threads = useMemo(() => buildThreads(items), [items])
  const totalThreads = threads.length
  const pageCount = Math.max(1, Math.ceil(totalThreads / pageSize))

  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return threads.slice(start, start + pageSize)
  }, [page, threads])

  const handleGuard = (e: MouseEvent, t: Thread) => {
    const isSecret = t.question.isSecret === true
    const isOwner = !!t.question.authorId && t.question.authorId === currentUserId
    if (isSecret && !isOwner) {
      e.preventDefault()
      setSecretOpen(true)
    }
  }

  return (
    <>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 text-[13px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-700">
          <div className="col-span-1 text-center">번호</div>
          <div className="col-span-7">제목</div>
          <div className="col-span-2 text-center">작성자</div>
          <div className="col-span-2 text-center">작성일</div>
        </div>
        {current.map((t, idx) => (
          <div key={t.threadId}>
            <Link href={`/support/inquiry/${t.threadId}?type=question`} className="block" onClick={(e) => handleGuard(e, t)}>
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
            {t.answer && (
              <Link href={`/support/inquiry/${t.threadId}?type=answer`} className="block" onClick={(e) => handleGuard(e, t)}>
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

      <Modal
        open={secretOpen}
        onClose={() => setSecretOpen(false)}
        title="비밀글입니다!"
        description={<span>이 글은 비밀글로 설정되어 있어 작성자만 볼 수 있습니다.</span>}
        confirmText="확인"
      />
    </>
  )
}
