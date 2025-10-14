"use client"
import { useMemo, useState } from 'react'
import Link from 'next/link'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import ConfirmModal from '../../components/ConfirmModal'
import { ChevronDown } from 'lucide-react'

type InquiryRow = {
  id: number
  title: string
  author: string
  date: string
  status: '대기' | '완료'
  views: number
}

export default function InquiryAdminClient({ items }: { items: InquiryRow[] }) {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'전체' | '대기' | '완료'>('전체')
  const [page, setPage] = useState(1)
  const pageSize = 10
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return items.filter((n) => {
      const passQ = s ? [n.title, n.author].some((t) => t.toLowerCase().includes(s)) : true
      const passStatus = status === '전체' ? true : n.status === status
      return passQ && passStatus
    })
  }, [q, status, items])
  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  const [confirm, setConfirm] = useState<{ open: boolean; id?: number }>({ open: false })

  return (
    <div>
      <FilterBar
        right={
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                className="min-w-[120px] appearance-none rounded-full border pl-3 pr-12 py-2 text-sm bg-white dark:bg-gray-800"
                value={status}
                onChange={(e) => {
                  setPage(1)
                  setStatus(e.target.value as any)
                }}
              >
                <option value="전체">전체</option>
                <option value="대기">대기</option>
                <option value="완료">완료</option>
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
          </div>
        }
      />

      <DataTable
        columns={[
          { key: 'id', header: '번호', className: 'text-center text-gray-500', headerClassName: 'text-center', span: 1 },
          { key: 'status', header: '상태', className: 'text-center', headerClassName: 'text-center', span: 1, render: (v) => (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${v === '완료' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>{v}</span>
          ) },
          { key: 'title', header: '제목', headerClassName: 'text-center', span: 7, render: (_, r) => (
            <Link className="text-violet-600 hover:underline block truncate" href={`/admin/inquiry/${r.id}`}>{r.title}</Link>
          ) },
          { key: 'author', header: '작성자', className: 'text-center whitespace-nowrap', headerClassName: 'text-center', span: 1 },
          { key: 'date', header: '작성일', className: 'text-center whitespace-nowrap', headerClassName: 'text-center', span: 1 },
          { key: 'id', header: '작업', className: 'text-right', headerClassName: 'text-center', span: 1, render: (_, r) => (
            <div className="flex justify-end gap-1">
              <Link href={`/admin/inquiry/${r.id}/edit`} className="rounded-md border px-2 py-1 text-xs">수정</Link>
              <button onClick={() => setConfirm({ open: true, id: r.id })} className="rounded-md border px-2 py-1 text-xs text-red-600">삭제</button>
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
        onConfirm={async () => {
          if (!confirm.id) return
          await fetch(`/api/admin/inquiries/${confirm.id}`, { method: 'DELETE' })
          setConfirm({ open: false })
          setPage(1)
        }}
      />
    </div>
  )
}



