'use client'

import { useEffect, useState } from 'react'
import { Eye, UserRound, CalendarClock } from 'lucide-react'
import Link from 'next/link'
import { fetchSupportNoticeDetail, type SupportNoticeDetail } from '../api'

export default function NoticeDetailClient({ noticeId }: { noticeId: string }) {
  const [notice, setNotice] = useState<SupportNoticeDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchSupportNoticeDetail(noticeId)
        if (!active) return
        setNotice(result)
      } catch (err) {
        if (!active) return
        const message =
          err instanceof Error ? err.message : '공지사항을 불러오지 못했습니다.'
        setError(message.includes('인증') ? '로그인이 필요한 서비스입니다.' : message)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [noticeId])

  const formatDateTime = (value?: string) => {
    if (!value) return '-'
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return value
    return d.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-10 text-center text-sm text-gray-500 dark:text-gray-300">
        불러오는 중입니다...
      </div>
    )
  }

  if (error || !notice) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 dark:border-red-800/50 dark:bg-red-900/10 shadow-sm p-10 text-center text-sm text-red-600 dark:text-red-300 space-y-4">
        <p>{error ?? '공지사항을 불러오지 못했습니다.'}</p>
        <Link href="/support/notices" className="inline-flex items-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm">
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <article className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">{notice.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1">
            <UserRound className="h-4 w-4" /> 작성자: {notice.author ?? '-'}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="h-4 w-4" /> 조회수: {notice.views ?? '-'}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarClock className="h-4 w-4" /> 작성일: {formatDateTime(notice.createdAt)}
          </span>
        </div>
      </div>
      <div className="px-6 py-6">
        <div className="min-h-[320px] rounded-md bg-gray-50 dark:bg-gray-900/20 p-6">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">{notice.content}</p>
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/support/notices" className="rounded-md bg-gray-700 text-white px-5 py-2 text-sm hover:bg-gray-800">
            뒤로가기
          </Link>
        </div>
      </div>
    </article>
  )
}

