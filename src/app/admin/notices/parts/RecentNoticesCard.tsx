"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchAdminNoticeList } from '../api/notice.api'

export default function RecentNoticesCard() {
  const [items, setItems] = useState<{ id: string; title: string; date?: string }[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await fetchAdminNoticeList({ page: 1, size: 3 })
        if (!mounted) return
        setItems(
          res.items.slice(0, 3).map((item) => ({
            id: item.id,
            title: item.title ?? '(제목 없음)',
            date: formatDate(item.createdAt ?? item.updatedAt ?? ''),
          })),
        )
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : '공지 정보를 불러올 수 없습니다.')
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">최근 공지</h3>
        <Link href="/admin/notices" className="text-sm text-violet-600 hover:underline">
          전체 보기
        </Link>
      </div>
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-800/60 dark:bg-red-900/20 dark:text-red-200">
          {error}
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
          {items.length === 0 ? (
            <div className="py-4 text-gray-500 dark:text-gray-400">불러올 공지가 없습니다.</div>
          ) : (
            items.map((n) => (
              <div key={n.id} className="py-2 flex items-center justify-between">
                <Link href={`/admin/notices/${n.id}`} className="truncate pr-3 text-gray-800 dark:text-gray-200 hover:underline">
                  {n.title}
                </Link>
                <span className="text-gray-400">{n.date ?? '-'}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function formatDate(value?: string) {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  return date.toISOString().slice(0, 10)
}

