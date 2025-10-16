"use client"
import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

type CommentRow = {
  id: number
  postId: number
  postTitle: string
  author: string
  date: string
  content: string
  status: 'visible' | 'hidden' | 'deleted'
  reportedCount?: number
}

export default function CommentsAdminClient({ items, total, q: initialQ = '', status: initialStatus = '전체', page: initialPage = 1, pageSize: initialPageSize = 10 }: { items: CommentRow[]; total: number; q?: string; status?: '전체' | 'visible' | 'hidden' | 'deleted'; page?: number; pageSize?: number }) {
  const router = useRouter()
  const [q, setQ] = useState(initialQ)
  const [status, setStatus] = useState<'전체' | 'visible' | 'hidden' | 'deleted'>(initialStatus)
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [preview, setPreview] = useState<{ open: boolean; title?: string; content?: string }>(() => ({ open: false }))

  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (status !== '전체') params.set('status', status)
    if (page > 1) params.set('page', String(page))
    if (pageSize !== 10) params.set('pageSize', String(pageSize))
    const qs = params.toString()
    router.replace(`/admin/comments${qs ? `?${qs}` : ''}`)
  }, [q, status, page, pageSize, router])

  return (
    <div>
      <FilterBar
        right={
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" checked={items.length > 0 && items.every((r) => selected.has(r.id))} onChange={(e) => { const on = e.target.checked; setSelected(prev => { const next = new Set(prev); items.forEach(r => on ? next.add(r.id) : next.delete(r.id)); return next }) }} />
            <button className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-50" disabled={selected.size === 0} onClick={async () => { await Promise.all(Array.from(selected).map(id => fetch(`/api/admin/comments/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'hidden' }) }))); setSelected(new Set()); router.refresh() }}>선택 숨김</button>
            <button className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-50" disabled={selected.size === 0} onClick={async () => { await Promise.all(Array.from(selected).map(id => fetch(`/api/admin/comments/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'visible' }) }))); setSelected(new Set()); router.refresh() }}>선택 노출</button>
            <button className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-50" disabled={selected.size === 0} onClick={async () => { await Promise.all(Array.from(selected).map(id => fetch(`/api/admin/comments/${id}`, { method: 'DELETE' }))); setSelected(new Set()); router.refresh() }}>선택 삭제</button>
            <div className="relative">
              <select className="min-w-[120px] appearance-none rounded-full border pl-3 pr-12 py-2 text-sm bg-white dark:bg-gray-800" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value as '전체' | 'visible' | 'hidden' | 'deleted') }}>
                <option value="전체">전체</option>
                <option value="visible">노출</option>
                <option value="hidden">숨김</option>
                <option value="deleted">삭제</option>
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
          { key: 'postTitle', header: '게시물', span: 4, render: (v, r) => (
            <button className="text-left text-violet-600 hover:underline" onClick={() => setPreview({ open: true, title: r.postTitle, content: r.content })}>{r.postTitle}</button>
          ) },
          { key: 'content', header: '내용', span: 2, render: (v, r) => (
            <div className="line-clamp-2" title={r.content}>{r.content}</div>
          ) },
          { key: 'author', header: '작성자', className: 'text-center whitespace-nowrap', headerClassName: 'text-center', span: 1 },
          { key: 'reportedCount', header: '신고', className: 'text-center', headerClassName: 'text-center', span: 1, render: (v, r) => v ? (
            <button className="rounded-full bg-rose-100 px-2 py-0.5 text-xs text-rose-700" onClick={() => {
              const params = new URLSearchParams({ q: r.postTitle, targetType: 'comment' })
              router.replace(`/admin/reports?${params.toString()}`)
            }}>{v}</button>
          ) : <span className="text-gray-400">-</span> },
          { key: 'status', header: '상태', className: 'text-center', headerClassName: 'text-center', span: 1, render: (v) => (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${v === 'visible' ? 'bg-emerald-100 text-emerald-700' : v === 'hidden' ? 'bg-amber-100 text-amber-800' : 'bg-gray-200 text-gray-600'}`}>{v}</span>
          ) },
          { key: 'id', header: '작업', className: 'text-right', headerClassName: 'text-center', span: 1, render: (_, r) => (
            <div className="flex justify-end gap-1">
              <button className="rounded-md border px-2 py-1 text-xs" onClick={async () => { await fetch(`/api/admin/comments/${r.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: r.status === 'hidden' ? 'visible' : 'hidden' }) }); router.refresh() }}>{r.status === 'hidden' ? '노출' : '숨김'}</button>
              <button className="rounded-md border px-2 py-1 text-xs text-red-600" onClick={async () => { await fetch(`/api/admin/comments/${r.id}`, { method: 'DELETE' }); router.refresh() }}>삭제</button>
            </div>
          ) },
        ]}
        rows={items}
      />

      <Paginator page={page} total={total} pageSize={pageSize} onChange={setPage} onChangePageSize={setPageSize} />

      {preview.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">본문 미리보기</h3>
              <button className="rounded-md border px-2 py-1 text-sm" onClick={() => setPreview({ open: false })}>닫기</button>
            </div>
            <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              <div className="mb-2 font-medium text-gray-700 dark:text-gray-300">{preview.title}</div>
              {preview.content}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


