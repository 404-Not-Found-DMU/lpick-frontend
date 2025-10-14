"use client"
import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import ConfirmModal from '../../components/ConfirmModal'
import type { NoticeItem } from '@/app/support/types'
import { ChevronDown } from 'lucide-react'

export default function NoticesAdminClient({ items, q: initialQ = '', page: initialPage = 1, total, pageSize, sortBy: initialSortBy = 'date', sortDir: initialSortDir = 'desc' }: { items: NoticeItem[]; q?: string; page?: number; total: number; pageSize: number; sortBy?: 'date' | 'views'; sortDir?: 'asc' | 'desc' }) {
  const router = useRouter()
  const [q, setQ] = useState(initialQ)
  const [page, setPage] = useState(initialPage)
  const [sortBy, setSortBy] = useState<'date' | 'views'>(initialSortBy)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(initialSortDir)
  const [confirm, setConfirm] = useState<{ open: boolean; id?: number }>({ open: false })
  const _pageSize = pageSize

  const filtered = items // 서버에서 필터/페이지 처리됨
  const current = filtered

  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (page > 1) params.set('page', String(page))
    if (_pageSize !== 10) params.set('pageSize', String(_pageSize))
    if (sortBy !== 'date') params.set('sortBy', sortBy)
    if (sortDir !== 'desc') params.set('sortDir', sortDir)
    const qs = params.toString()
    router.replace(`/admin/notices${qs ? `?${qs}` : ''}`)
  }, [q, page, _pageSize, sortBy, sortDir, router])

  return (
    <div>
      <FilterBar
        right={
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                className="min-w-[180px] appearance-none rounded-full border pl-3 pr-12 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
                value={`${sortBy}:${sortDir}`}
                onChange={(e) => {
                  const [sb, sd] = e.target.value.split(':') as ['date' | 'views', 'asc' | 'desc']
                  setPage(1)
                  setSortBy(sb)
                  setSortDir(sd)
                }}
              >
                <option value="date:desc">작성일 최신순</option>
                <option value="date:asc">작성일 오래된순</option>
                <option value="views:desc">조회수 많은순</option>
                <option value="views:asc">조회수 적은순</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <input
              placeholder="검색..."
              className="w-64 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              value={q}
              onChange={(e) => {
                setPage(1)
                setQ(e.target.value)
              }}
            />
            <Link href="/admin/notices/new" className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700">새 공지</Link>
          </div>
        }
      />

      <DataTable
        columns={[
          { key: 'id', header: '번호', className: 'text-center text-gray-500', span: 1 },
          { key: 'type', header: '구분', className: 'text-center', span: 1, render: (v) => (
            v ? (
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                v === '공지' ? 'bg-violet-100 text-violet-700' : v === '대회' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
              }`}>{v}</span>
            ) : <span className="text-gray-400">-</span>
          ) },
          { key: 'title', header: '제목', span: 7, render: (_, r) => (
            <Link className="text-violet-600 hover:underline block truncate" href={`/admin/notices/${r.id}`}>{r.title}</Link>
          ) },
          { key: 'date', header: '작성일', className: 'text-center whitespace-nowrap', span: 1 },
          { key: 'views', header: '조회수', className: 'text-right whitespace-nowrap', span: 1 },
          { key: 'id', header: '메션', className: 'text-right', span: 1, render: (_, r) => (
            <div className="flex justify-end gap-1">
              <Link href={`/admin/notices/${r.id}/edit`} className="rounded-md border px-2 py-1 text-xs">수정</Link>
              <button onClick={() => setConfirm({ open: true, id: r.id as number })} className="rounded-md border px-2 py-1 text-xs text-red-600">삭제</button>
            </div>
          ) },
        ]}
        rows={current}
      />

      {current.length === 0 && (
        <div className="mt-6 rounded-md border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          일치하는 항목이 없습니다.
        </div>
      )}

      <Paginator page={page} total={total} pageSize={_pageSize} onChange={setPage} />

      <ConfirmModal
        open={confirm.open}
        title="삭제하시겠습니까?"
        message="삭제 후에는 되돌릴 수 없습니다."
        onClose={() => setConfirm({ open: false })}
        onConfirm={async () => {
          if (!confirm.id) return
          await fetch(`/api/admin/notices/${confirm.id}`, { method: 'DELETE' })
          setConfirm({ open: false })
          router.refresh()
          setPage(1)
        }}
      />
    </div>
  )
}



