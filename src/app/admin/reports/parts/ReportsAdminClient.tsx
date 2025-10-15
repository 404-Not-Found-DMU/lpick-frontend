"use client"
import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ReportRow = {
  id: number
  targetType: 'post' | 'comment' | 'user'
  targetId: number
  targetTitle: string
  reason: string
  reporter: string
  date: string
  status: 'open' | 'ignored' | 'warned' | 'suspended' | 'banned'
}

export default function ReportsAdminClient({ items, total, q: initialQ = '', status: initialStatus = '전체', page: initialPage = 1, pageSize: initialPageSize = 10 }: { items: ReportRow[]; total: number; q?: string; status?: '전체' | 'open' | 'ignored' | 'warned' | 'suspended' | 'banned'; page?: number; pageSize?: number }) {
  const router = useRouter()
  const [q, setQ] = useState(initialQ)
  const [status, setStatus] = useState<'전체' | 'open' | 'ignored' | 'warned' | 'suspended' | 'banned'>(initialStatus)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (status !== '전체') params.set('status', status)
    if (page > 1) params.set('page', String(page))
    if (pageSize !== 10) params.set('pageSize', String(pageSize))
    const qs = params.toString()
    router.replace(`/admin/reports${qs ? `?${qs}` : ''}`)
  }, [q, status, page, pageSize, router])

  return (
    <div>
      <FilterBar
        right={
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" checked={items.length > 0 && items.every((r) => selected.has(r.id))} onChange={(e) => { const on = e.target.checked; setSelected(prev => { const next = new Set(prev); items.forEach(r => on ? next.add(r.id) : next.delete(r.id)); return next }) }} />
            <button className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-50" disabled={selected.size === 0} onClick={async () => { await Promise.all(Array.from(selected).map(id => fetch(`/api/admin/reports/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'ignored' }) }))); setSelected(new Set()); router.refresh() }}>선택 무시</button>
            <button className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-50" disabled={selected.size === 0} onClick={async () => { await Promise.all(Array.from(selected).map(id => fetch(`/api/admin/reports/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'warned' }) }))); setSelected(new Set()); router.refresh() }}>선택 경고</button>
            <div className="relative">
              <select className="min-w-[140px] appearance-none rounded-full border pl-3 pr-12 py-2 text-sm bg-white dark:bg-gray-800" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value as '전체' | 'open' | 'ignored' | 'warned' | 'suspended' | 'banned') }}>
                <option value="전체">전체 상태</option>
                <option value="open">미처리</option>
                <option value="ignored">무시</option>
                <option value="warned">경고</option>
                <option value="suspended">일시정지</option>
                <option value="banned">영구정지</option>
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
      />

      <DataTable
        columns={[
          {
            key: 'id',
            header: (
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={items.length > 0 && items.every((r) => selected.has(r.id))}
                onChange={(e) => {
                  const on = (e.target as HTMLInputElement).checked
                  setSelected((prev) => {
                    const next = new Set(prev)
                    items.forEach((r) => (on ? next.add(r.id) : next.delete(r.id)))
                    return next
                  })
                }}
              />
            ) as unknown as string,
            span: 1,
            render: (_, r) => (
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={selected.has(r.id)}
                onChange={(e) => {
                  const on = e.target.checked
                  setSelected((prev) => {
                    const next = new Set(prev)
                    if (on) next.add(r.id)
                    else next.delete(r.id)
                    return next
                  })
                }}
              />
            ),
          },
          { key: 'id', header: '번호', className: 'text-center text-gray-500', headerClassName: 'text-center', span: 1 },
          { key: 'targetTitle', header: '대상', span: 3 },
          { key: 'reason', header: '사유', span: 2 },
          { key: 'reporter', header: '신고자', className: 'text-center', headerClassName: 'text-center', span: 1 },
          { key: 'date', header: '일시', className: 'text-center', headerClassName: 'text-center', span: 1 },
          { key: 'status', header: '상태', className: 'text-center', headerClassName: 'text-center', span: 1, render: (v) => (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${v === 'open' ? 'bg-amber-100 text-amber-800' : v === 'ignored' ? 'bg-gray-200 text-gray-700' : v === 'warned' ? 'bg-rose-100 text-rose-700' : v === 'suspended' ? 'bg-violet-100 text-violet-700' : 'bg-black/10 text-black/70'}`}>{v}</span>
          ) },
          { key: 'id', header: '작업', className: 'text-right', headerClassName: 'text-center', span: 2, render: (_, r) => (
            <div className="flex flex-wrap justify-end gap-1">
              <button className="rounded-md border px-2 py-1 text-[11px]" onClick={async () => { await fetch(`/api/admin/reports/${r.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'ignored' }) }); router.refresh() }}>무시</button>
              <button className="rounded-md border px-2 py-1 text-[11px] text-amber-700" onClick={async () => { await fetch(`/api/admin/reports/${r.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'warned' }) }); router.refresh() }}>경고</button>
              <button className="rounded-md border px-2 py-1 text-[11px] text-violet-700" onClick={async () => { await fetch(`/api/admin/reports/${r.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'suspended' }) }); router.refresh() }}>일시정지</button>
              <button className="rounded-md border px-2 py-1 text-[11px] text-red-600" onClick={async () => { await fetch(`/api/admin/reports/${r.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'banned' }) }); router.refresh() }}>영구정지</button>
            </div>
          ) },
        ]}
        rows={items}
      />

      <Paginator page={page} total={total} pageSize={pageSize} onChange={setPage} onChangePageSize={setPageSize} />
    </div>
  )
}


