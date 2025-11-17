'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, CalendarClock, MessageSquare, Reply } from 'lucide-react'
import { fetchInquiryDetail, type InquiryDetail } from '../api'

export default function InquiryDetailClient({ questionId }: { questionId: string }) {
  const [detail, setDetail] = useState<InquiryDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useSearchParams()
  const router = useRouter()
  const viewType = params.get('type') === 'question' ? 'question' : 'answer'

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetchInquiryDetail(questionId)
        if (!active) return
        setDetail(res)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : '문의 내역을 불러오지 못했습니다.')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [questionId])

  const formattedQuestionDate = useMemo(() => formatDate(detail?.createdAt), [detail])
  const formattedAnswerDate = useMemo(() => formatDate(detail?.answerInfo?.createdAt), [detail])

  const handleToggle = (type: 'answer' | 'question') => {
    const url = new URL(window.location.href)
    url.searchParams.set('type', type)
    router.replace(url.pathname + '?' + url.searchParams.toString())
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-10 text-center text-sm text-gray-500 dark:text-gray-300">
        불러오는 중입니다...
      </div>
    )
  }

  if (error || !detail) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 dark:border-red-800/50 dark:bg-red-900/10 shadow-sm p-10 text-center text-sm text-red-600 dark:text-red-300 space-y-4">
        <p>{error ?? '문의 내역을 불러오지 못했습니다.'}</p>
        <Link href="/support/inquiry" className="inline-flex items-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm">
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link href="/support/inquiry" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">목록으로</span>
        </Link>
      </div>

      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          onClick={() => handleToggle('answer')}
          className={`px-3 py-1.5 rounded-md text-sm ${viewType === 'answer' ? 'bg-violet-600 text-white' : 'border border-gray-300 text-gray-700 dark:text-gray-300'}`}
        >
          문의+답변 보기
        </button>
        <button
          onClick={() => handleToggle('question')}
          className={`px-3 py-1.5 rounded-md text-sm ${viewType === 'question' ? 'bg-violet-600 text-white' : 'border border-gray-300 text-gray-700 dark:text-gray-300'}`}
        >
          문의만 보기
        </button>
      </div>

      <article className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            {detail.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>작성자: {detail.author}</span>
            <span className="inline-flex items-center gap-1">
              <CalendarClock className="h-4 w-4" />
              {formattedQuestionDate}
            </span>
          </div>
        </div>
        <div className="px-6 py-6">
          <div className="min-h-[220px] rounded-md bg-gray-50 dark:bg-gray-900/20 p-6">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">{detail.content}</p>
          </div>
        </div>
      </article>

      {viewType === 'answer' && (
        <article className="rounded-2xl border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
          {detail.answerInfo ? (
            <>
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-green-50/60 dark:bg-green-900/20">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Reply className="h-5 w-5 text-green-600" />
                  {detail.answerInfo.title}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>작성자: {detail.answerInfo.author}</span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarClock className="h-4 w-4" />
                    {formattedAnswerDate}
                  </span>
                </div>
              </div>
              <div className="px-6 py-6">
                <div className="min-h-[160px] rounded-md bg-gray-50 dark:bg-gray-900/20 p-6">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">{detail.answerInfo.content}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="px-6 py-6 text-sm text-gray-500 dark:text-gray-400">
              아직 등록된 답변이 없습니다. 운영팀이 확인 중입니다.
            </div>
          )}
        </article>
      )}
    </div>
  )
}

function formatDate(value?: string) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

