"use client"
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import ConfirmModal from '../../components/ConfirmModal'
import { fetchAdminNoticeList, deleteAdminNotice, type AdminNoticeRecord } from '../api/notice.api'

type NoticeTableRow = {
  id: string
  order: number
  title: string
  author?: string
  date?: string
  summary?: string
}

export default function NoticesAdminClient({ initialQuery = '', initialPage = 1, initialPageSize = 10 }: { initialQuery?: string; initialPage?: number; initialPageSize?: number }) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState(initialQuery)
  const [q, setQ] = useState(initialQuery)
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [rows, setRows] = useState<NoticeTableRow[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<{ open: boolean; id?: string }>({ open: false })

  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (page > 1) params.set('page', String(page))
    if (pageSize !== 10) params.set('pageSize', String(pageSize))
    const qs = params.toString()
    router.replace(`/admin/notices${qs ? `?${qs}` : ''}`)
  }, [q, page, pageSize, router])

  const loadNotices = useCallback(async (override?: { page?: number; size?: number; keyword?: string }) => {
    setLoading(true)
    setError(null)
    try {
      const nextPage = override?.page ?? page
      const nextSize = override?.size ?? pageSize
      const nextKeyword = override?.keyword ?? q
      const result = await fetchAdminNoticeList({ page: nextPage, size: nextSize, keyword: nextKeyword })
      setTotal(result.total)
      setRows(
        result.items.map((item, idx) => mapToRow(item, {
          page: result.page ?? nextPage,
          size: result.size ?? nextSize,
          index: idx,
        })),
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : '공지 목록을 불러오지 못했습니다.'
      setError(message)
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, q])

  useEffect(() => {
    loadNotices()
  }, [loadNotices])

  const emptyStateVisible = useMemo(() => !loading && rows.length === 0, [loading, rows.length])

  return (
    <div className="space-y-4">
      <FilterBar
        right={
          <div className="flex flex-wrap items-center gap-2">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                setPage(1)
                setQ(searchInput.trim())
              }}
            >
              <input
                placeholder="제목/내용 검색"
                className="w-64 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="rounded-full border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100">
                검색
              </button>
              {q && (
                <button
                  type="button"
                  className="text-xs text-gray-500 underline decoration-dotted"
                  onClick={() => {
                    setSearchInput('')
                    setPage(1)
                    setQ('')
                  }}
                >
                  초기화
                </button>
              )}
            </form>
            <Link href="/admin/notices/new" className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700">
              새 공지
            </Link>
          </div>
        }
      />

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/60 dark:bg-red-900/20 dark:text-red-200">
          {error}
        </div>
      ) : null}

      <div className="relative">
        {loading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-gray-900/70">
            <div className="rounded-full border-4 border-violet-200 border-t-violet-600 h-10 w-10 animate-spin" />
          </div>
        ) : null}
        <DataTable
          columns={[
            { key: 'order', header: '번호', className: 'text-center text-gray-500', headerClassName: 'text-center', span: 1 },
            {
              key: 'title',
              header: '제목',
              headerClassName: 'text-left',
              span: 5,
              render: (_, row) => (
                <Link className="text-violet-600 hover:underline block truncate font-medium" href={`/admin/notices/${row.id}`}>
                  {row.title || '(제목 없음)'}
                </Link>
              ),
            },
            { key: 'author', header: '작성자', className: 'text-center text-gray-700 dark:text-gray-300', headerClassName: 'text-center', span: 2, render: (value) => value || '-' },
            { key: 'date', header: '작성일', className: 'text-center text-gray-700 dark:text-gray-300 whitespace-nowrap', headerClassName: 'text-center', span: 2, render: (value) => value || '-' },
            {
              key: 'id',
              header: '작업',
              className: 'text-right whitespace-nowrap overflow-visible',
              headerClassName: 'text-right',
              span: 2,
              truncate: false,
              render: (_, r) => (
                <div className="inline-flex justify-end gap-2">
                  <Link
                    href={`/admin/notices/${r.id}/edit`}
                    className="inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => setConfirm({ open: true, id: r.id })}
                    className="inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    삭제
                  </button>
                </div>
              ),
            },
          ]}
          rows={rows}
        />
      </div>

      {emptyStateVisible ? (
        <div className="rounded-md border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          일치하는 항목이 없습니다.
        </div>
      ) : null}

      <Paginator
        page={page}
        total={total}
        pageSize={pageSize}
        onChange={setPage}
        onChangePageSize={(size) => {
          setPage(1)
          setPageSize(size)
        }}
      />

      <ConfirmModal
        open={confirm.open}
        title="삭제하시겠습니까?"
        message="삭제 후에는 되돌릴 수 없습니다."
        onClose={() => setConfirm({ open: false })}
        onConfirm={async () => {
          if (!confirm.id) return
          try {
            await deleteAdminNotice(confirm.id)
            setConfirm({ open: false })
            setPage(1)
            await loadNotices({ page: 1 })
          } catch (err) {
            setError(err instanceof Error ? err.message : '삭제에 실패했습니다.')
          }
        }}
      />
    </div>
  )
}

function mapToRow(item: AdminNoticeRecord, meta: { page: number; size: number; index: number }): NoticeTableRow {
  return {
    id: item.id,
    order: (meta.page - 1) * meta.size + meta.index + 1,
    title: item.title ?? '',
    author: item.author ?? '',
    date: formatDate(item.createdAt ?? item.updatedAt ?? ''),
    summary: item.content ? truncate(stripHtml(item.content), 120) : undefined,
  }
}

function formatDate(value?: string) {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10)
  }
  return date.toISOString().slice(0, 10)
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function truncate(value: string, len: number) {
  if (value.length <= len) return value
  return `${value.slice(0, len)}…`
}



