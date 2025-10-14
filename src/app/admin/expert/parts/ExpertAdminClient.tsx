"use client"
import { useMemo, useState } from 'react'
import Link from 'next/link'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import ConfirmModal from '../../components/ConfirmModal'

type ExpertRow = {
  id: number
  name: string
  email: string
  date: string
  status: '대기' | '승인' | '반려'
  fields: string[]
}

export default function ExpertAdminClient({ items, total }: { items: ExpertRow[]; total: number }) {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'전체' | '대기' | '승인' | '반려'>('전체')
  const [page, setPage] = useState(1)
  const pageSize = 10
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return items.filter((n) => {
      const passQ = s ? [n.name, n.email, n.fields.join(',')].some((t) => t.toLowerCase().includes(s)) : true
      const passStatus = status === '전체' ? true : n.status === status
      return passQ && passStatus
    })
  }, [q, status, items])
  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  const [confirm, setConfirm] = useState<{ open: boolean; id?: number; type?: 'approve' | 'reject' }>(
    { open: false },
  )

  return (
    <div>
      <FilterBar
        right={
          <div className="flex items-center gap-2">
            <select
              className="rounded-full border px-3 py-2 text-sm"
              value={status}
              onChange={(e) => {
                setPage(1)
                setStatus(e.target.value as any)
              }}
            >
              <option value="전체">전체</option>
              <option value="대기">대기</option>
              <option value="승인">승인</option>
              <option value="반려">반려</option>
            </select>
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
          { key: 'name', header: '이름', span: 2 },
          { key: 'email', header: '이메일', span: 2 },
          { key: 'fields', header: '분야', span: 2, render: (v) => (
            <div className="truncate text-gray-600 dark:text-gray-300">{(v as string[]).join(', ')}</div>
          ) },
          { key: 'date', header: '신청일', className: 'text-center whitespace-nowrap', headerClassName: 'text-center', span: 2 },
          { key: 'status', header: '상태', className: 'text-center', headerClassName: 'text-center', span: 1, render: (v) => (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${v === '승인' ? 'bg-emerald-100 text-emerald-700' : v === '반려' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'}`}>{v}</span>
          ) },
          { key: 'id', header: '작업', className: 'text-right', headerClassName: 'text-center', span: 2, render: (_, r) => (
            <div className="flex justify-end gap-1">
              <Link href={`/admin/expert/${r.id}`} className="rounded-md border px-2 py-1 text-xs">상세</Link>
              <button onClick={() => setConfirm({ open: true, id: r.id, type: 'approve' })} className="rounded-md border px-2 py-1 text-xs text-emerald-700">승인</button>
              <button onClick={() => setConfirm({ open: true, id: r.id, type: 'reject' })} className="rounded-md border px-2 py-1 text-xs text-rose-600">반려</button>
            </div>
          ) },
        ]}
        rows={current}
      />

      <Paginator page={page} total={filtered.length} pageSize={pageSize} onChange={setPage} />

      <ConfirmModal
        open={confirm.open}
        title={confirm.type === 'approve' ? '승인하시겠습니까?' : '반려하시겠습니까?'}
        message={confirm.type === 'approve' ? '승인 시 상태가 승인으로 변경됩니다.' : '반려 시 상태가 반려로 변경됩니다.'}
        onClose={() => setConfirm({ open: false })}
        onConfirm={async () => {
          if (!confirm.id) return
          await fetch(`/api/admin/experts/${confirm.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: confirm.type === 'approve' ? '승인' : '반려' }),
          })
          setConfirm({ open: false })
          setPage(1)
        }}
      />
    </div>
  )
}


