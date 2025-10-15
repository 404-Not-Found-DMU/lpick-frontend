"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import ConfirmModal from '../../components/ConfirmModal'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ReviewRow = {
  id: number
  title: string
  author: string
  date: string
  status: '대기' | '승인' | '반려'
}

export default function WikiReviewAdminClient({ items, total, q: initialQ = '', status: initialStatus = '전체', page: initialPage = 1, pageSize: initialPageSize = 10 }: { items: ReviewRow[]; total: number; q?: string; status?: '전체' | '대기' | '승인' | '반려'; page?: number; pageSize?: number }) {
  const router = useRouter()
  const [q, setQ] = useState(initialQ)
  const [status, setStatus] = useState<'전체' | '대기' | '승인' | '반려'>(initialStatus)
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [bulk, setBulk] = useState<Set<number>>(new Set())
  const [confirmBulk, setConfirmBulk] = useState<{ open: boolean; action?: 'approve' | 'reject' }>({ open: false })

  const filtered = items
  const current = filtered

  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (status !== '전체') params.set('status', status)
    if (page > 1) params.set('page', String(page))
    if (pageSize !== 10) params.set('pageSize', String(pageSize))
    const qs = params.toString()
    router.replace(`/admin/wiki-review${qs ? `?${qs}` : ''}`)
  }, [q, status, page, pageSize, router])

  return (
    <div>
      <FilterBar
        right={
          <div className="flex items-center gap-2">
            <div className="relative">
              <select className="min-w-[120px] appearance-none rounded-full border pl-3 pr-12 py-2 text-sm bg-white dark:bg-gray-800" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value as '전체' | '대기' | '승인' | '반려') }}>
                <option value="전체">전체</option>
                <option value="대기">대기</option>
                <option value="승인">승인</option>
                <option value="반려">반려</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative">
              <select className="min-w-[100px] appearance-none rounded-full border pl-3 pr-10 py-2 text-sm bg-white dark:bg-gray-800" value={pageSize} onChange={(e) => { setPage(1); setPageSize(Number(e.target.value)) }}>
                <option value={10}>10개</option>
                <option value={20}>20개</option>
                <option value={50}>50개</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <input placeholder="검색..." className="w-64 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100" value={q} onChange={(e) => { setPage(1); setQ(e.target.value) }} />
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={current.length > 0 && current.every((r) => bulk.has(r.id))}
            onChange={(e) => {
              const checked = e.target.checked
              const ids = current.map((r) => r.id)
              setBulk((prev) => {
                const next = new Set(prev)
                ids.forEach((id) => (checked ? next.add(id) : next.delete(id)))
                return next
              })
            }}
          />
          <button className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-50" disabled={bulk.size === 0} onClick={() => setConfirmBulk({ open: true, action: 'approve' })}>선택 승인</button>
          <button className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-50" disabled={bulk.size === 0} onClick={() => setConfirmBulk({ open: true, action: 'reject' })}>선택 반려</button>
        </div>
      </FilterBar>

      <DataTable
        columns={[
          { key: 'id', header: (
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={current.length > 0 && current.every((r) => bulk.has(r.id))}
              onChange={(e) => {
                const checked = (e.target as HTMLInputElement).checked
                const ids = current.map((r) => r.id)
                setBulk((prev) => {
                  const next = new Set(prev)
                  ids.forEach((id) => (checked ? next.add(id) : next.delete(id)))
                  return next
                })
              }}
            />
          ) as unknown as string, span: 1, render: (_, r) => (
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={bulk.has(r.id)}
              onChange={(e) => {
                const checked = e.target.checked
                setBulk((prev) => {
                  const next = new Set(prev)
                  if (checked) next.add(r.id)
                  else next.delete(r.id)
                  return next
                })
              }}
            />
          ) },
          { key: 'id', header: '번호', className: 'text-left text-gray-500', headerClassName: 'text-left', span: 1 },
          { key: 'status', header: '상태', className: 'text-center', headerClassName: 'text-center', span: 1, render: (v) => (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${v === '승인' ? 'bg-emerald-100 text-emerald-700' : v === '반려' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'}`}>{v}</span>
          ) },
          { key: 'title', header: '제목', span: 7, render: (_, r) => <Link className="text-violet-600 hover:underline block truncate" href={`/admin/wiki-review/${r.id}`}>{r.title}</Link> },
          { key: 'author', header: '작성자', className: 'text-center whitespace-nowrap', headerClassName: 'text-center', span: 1 },
          { key: 'date', header: '제안일', className: 'text-center whitespace-nowrap', headerClassName: 'text-center', span: 1 },
        ]}
        rows={current}
      />

      <Paginator page={page} total={total} pageSize={pageSize} onChange={setPage} />

      <ConfirmModal
        open={confirmBulk.open}
        title={confirmBulk.action === 'approve' ? '선택 항목 승인' : '선택 항목 반려'}
        message={`선택된 ${bulk.size}건을 ${confirmBulk.action === 'approve' ? '승인' : '반려'} 처리합니다.`}
        onClose={() => setConfirmBulk({ open: false })}
        onConfirm={async () => {
          const action = confirmBulk.action
          if (!action || bulk.size === 0) return
          await Promise.all(
            Array.from(bulk).map((id) =>
              fetch(`/api/admin/wiki-review/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: action === 'approve' ? '승인' : '반려' }),
              }),
            ),
          )
          setConfirmBulk({ open: false })
          setBulk(new Set())
          router.refresh()
        }}
      />
    </div>
  )
}


