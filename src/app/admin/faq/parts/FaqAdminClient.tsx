"use client"
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import ConfirmModal from '../../components/ConfirmModal'
import { useRouter } from 'next/navigation'

type FaqRow = {
  id: number
  question: string
  date: string
  views: number
  tags?: string[]
}

export default function FaqAdminClient({ items }: { items: FaqRow[]; total: number }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [sortBy, setSortBy] = useState<'date' | 'views'>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (page > 1) params.set('page', String(page))
    if (sortBy !== 'date') params.set('sortBy', sortBy)
    if (sortDir !== 'desc') params.set('sortDir', sortDir)
    const qs = params.toString()
    router.replace(`/admin/faq${qs ? `?${qs}` : ''}`)
  }, [q, page, sortBy, sortDir, router])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter((n) => [n.question, (n.tags ?? []).join(',')].some((t) => t?.toLowerCase().includes(s)))
  }, [q, items])
  const sorted = useMemo(() => {
    const arr = [...filtered]
    const dir = sortDir === 'asc' ? 1 : -1
    if (sortBy === 'views') return arr.sort((a, b) => (a.views - b.views) * dir)
    return arr.sort((a, b) => a.date.localeCompare(b.date) * dir)
  }, [filtered, sortBy, sortDir])
  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, page])

  const [confirm, setConfirm] = useState<{ open: boolean; id?: number }>({ open: false })

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
            <Link href="/admin/faq/new" className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700">새 FAQ</Link>
          </div>
        }
      />

      <DataTable
        columns={[
          { key: 'id', header: '번호', className: 'text-center text-gray-500', headerClassName: 'text-center', span: 1 },
          { key: 'question', header: '질문', headerClassName: 'text-center', span: 7, render: (_, r) => (
            <Link className="text-violet-600 hover:underline block truncate" href={`/admin/faq/${r.id}`}>{r.question}</Link>
          ) },
          { key: 'date', header: '작성일', className: 'text-center whitespace-nowrap', headerClassName: 'text-center', span: 2, sortable: true, sortActive: sortBy === 'date', sortDir: sortDir, onSort: () => { setPage(1); setSortBy('date'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc') } },
          { key: 'views', header: '조회수', className: 'text-right whitespace-nowrap', headerClassName: 'text-right', span: 1, sortable: true, sortActive: sortBy === 'views', sortDir: sortDir, onSort: () => { setPage(1); setSortBy('views'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc') } },
          { key: 'id', header: '작업', className: 'text-right', headerClassName: 'text-center', span: 1, render: (_, r) => (
            <div className="flex justify-end gap-1">
              <Link href={`/admin/faq/${r.id}/edit`} className="rounded-md border px-2 py-1 text-xs">수정</Link>
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
          await fetch(`/api/admin/faqs/${confirm.id}`, { method: 'DELETE' })
          setConfirm({ open: false })
          // 실제 구현에선 서버 리패치 권장
          setPage(1)
        }}
      />
    </div>
  )
}


