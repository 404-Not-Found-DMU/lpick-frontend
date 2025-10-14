"use client"
import { useMemo, useState } from 'react'
import Link from 'next/link'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import ConfirmModal from '../../components/ConfirmModal'
import type { NoticeItem } from '@/app/support/types'

export default function NoticesAdminClient({ items }: { items: NoticeItem[] }) {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [confirm, setConfirm] = useState<{ open: boolean; id?: number }>({ open: false })
  const pageSize = 10

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter((n) => [n.title, n.summary, n.type ?? ''].some((t) => t?.toLowerCase().includes(s)))
  }, [q, items])

  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [page, filtered])

  return (
    <div>
      <FilterBar
        right={
          <div className="flex items-center gap-2">
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
          { key: 'id', header: '번호', className: 'text-center' },
          { key: 'title', header: '제목', render: (_, r) => <Link className="text-violet-600 hover:underline" href={`/admin/notices/${r.id}`}>{r.title}</Link> },
          { key: 'date', header: '작성일', className: 'text-center' },
          { key: 'views', header: '조회수', className: 'text-right' },
          { key: 'type', header: '구분', className: 'text-center', render: (v) => v ?? '-' },
          { key: 'id', header: '액션', className: 'text-right', render: (_, r) => (
            <div className="flex justify-end gap-2">
              <Link href={`/admin/notices/${r.id}/edit`} className="rounded-md border px-2 py-1 text-xs">수정</Link>
              <button onClick={() => setConfirm({ open: true, id: r.id as number })} className="rounded-md border px-2 py-1 text-xs text-red-600">삭제</button>
            </div>
          ) },
        ]}
        rows={current}
      />

      <Paginator page={page} total={filtered.length} pageSize={pageSize} onChange={setPage} />

      <ConfirmModal
        open={confirm.open}
        title="삭제하시겠습니까?"
        message="삭제 후에는 되돌릴 수 없습니다."
        onClose={() => setConfirm({ open: false })}
        onConfirm={() => {
          // TODO: API 연동
          setConfirm({ open: false })
        }}
      />
    </div>
  )
}



