"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchAdminNoticeDetail, type AdminNoticeRecord } from '../api/notice.api'

export default function NoticeDetailClient({ noticeId }: { noticeId: string }) {
  const [notice, setNotice] = useState<AdminNoticeRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchAdminNoticeDetail(noticeId)
        if (mounted) setNotice(data)
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : '공지 정보를 불러올 수 없습니다.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [noticeId])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          공지 상세 #{noticeId}
        </h2>
        <div className="flex items-center gap-2">
          <Link href={`/admin/notices/${noticeId}/edit`} className="rounded-md border px-3 py-2 text-sm">
            수정
          </Link>
          <Link href="/admin/notices" className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">
            목록
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/60 dark:bg-red-900/20 dark:text-red-200">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-8 shadow-sm min-h-[240px] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
          </div>
        ) : null}

        {!loading && !notice ? (
          <div className="text-sm text-gray-500 dark:text-gray-300">
            존재하지 않는 공지입니다.
          </div>
        ) : null}

        {notice ? (
          <article className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {notice.title || '(제목 없음)'}
                </h3>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {notice.author || '작성자 미상'}
                  {notice.createdAt ? ` · ${formatDate(notice.createdAt)}` : null}
                </div>
              </div>
              {notice.imageUrl ? (
                <Image
                  src={notice.imageUrl}
                  alt="notice"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                />
              ) : null}
            </div>
            <div className="prose prose-sm max-w-none text-gray-800 dark:prose-invert dark:text-gray-100 whitespace-pre-wrap break-words">
              {notice.content || '내용이 없습니다.'}
            </div>
          </article>
        ) : null}
      </div>
    </div>
  )
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value.slice(0, 16)
  return `${date.toISOString().slice(0, 10)} ${date.toISOString().slice(11, 16)}`
}

