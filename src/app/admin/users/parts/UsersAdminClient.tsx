"use client"
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import ConfirmModal from '../../components/ConfirmModal'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/Toast/ToastProvider'

type UserRow = {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
  status: 'active' | 'blocked'
  joinedAt: string
}

export default function UsersAdminClient({ items, total, q: initialQ = '', status: initialStatus = 'all', role: initialRole = 'all', page: initialPage = 1, pageSize: initialPageSize = 10 }: { items: UserRow[]; total: number; q?: string; status?: 'all' | 'active' | 'blocked'; role?: 'all' | 'user' | 'admin'; page?: number; pageSize?: number }) {
  const router = useRouter()
  const { push } = useToast()
  const [q, setQ] = useState(initialQ)
  const [status, setStatus] = useState<'all' | 'active' | 'blocked'>(initialStatus)
  const [role, setRole] = useState<'all' | 'user' | 'admin'>(initialRole)
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [confirm, setConfirm] = useState<{ open: boolean; id?: number; action?: 'block' | 'unblock' }>(() => ({ open: false }))
  const [bulk, setBulk] = useState<Set<number>>(new Set())
  const [confirmBulk, setConfirmBulk] = useState<{ open: boolean; action?: 'block' | 'unblock' }>({ open: false })

  const filtered = useMemo(() => items, [items])
  const current = filtered

  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (status !== 'all') params.set('status', status)
    if (role !== 'all') params.set('role', role)
    if (page > 1) params.set('page', String(page))
    if (pageSize !== 10) params.set('pageSize', String(pageSize))
    const qs = params.toString()
    router.replace(`/admin/users${qs ? `?${qs}` : ''}`)
  }, [q, status, role, page, pageSize, router])

  const toggleAllCurrent = (checked: boolean) => {
    const ids = current.map((u) => u.id)
    setBulk((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => (checked ? next.add(id) : next.delete(id)))
      return next
    })
  }

  return (
    <div>
      <FilterBar
        right={
          <div className="flex items-center gap-2">
            <div className="relative">
              <select className="min-w-[120px] appearance-none rounded-full border pl-3 pr-12 py-2 text-sm bg-white dark:bg-gray-800" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value as 'all' | 'active' | 'blocked') }}>
                <option value="all">상태: 전체</option>
                <option value="active">활성</option>
                <option value="blocked">차단</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative">
              <select className="min-w-[120px] appearance-none rounded-full border pl-3 pr-12 py-2 text-sm bg-white dark:bg-gray-800" value={role} onChange={(e) => { setPage(1); setRole(e.target.value as 'all' | 'user' | 'admin') }}>
                <option value="all">권한: 전체</option>
                <option value="user">일반</option>
                <option value="admin">관리자</option>
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
            <input placeholder="검색..." className="w-72 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100" value={q} onChange={(e) => { setPage(1); setQ(e.target.value) }} />
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={current.length > 0 && current.every((u) => bulk.has(u.id))}
            onChange={(e) => toggleAllCurrent(e.target.checked)}
          />
          <button
            className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-50"
            disabled={bulk.size === 0}
            onClick={() => setConfirmBulk({ open: true, action: 'block' })}
          >
            선택 차단
          </button>
          <button
            className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-50"
            disabled={bulk.size === 0}
            onClick={() => setConfirmBulk({ open: true, action: 'unblock' })}
          >
            선택 해제
          </button>
        </div>
      </FilterBar>

      <DataTable
        columns={[
          { key: 'id', header: (
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={current.length > 0 && current.every((u) => bulk.has(u.id))}
              onChange={(e) => toggleAllCurrent((e.target as HTMLInputElement).checked)}
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
          { key: 'name', header: '이름', span: 1, render: (_, r) => <Link href={`/admin/users/${r.id}`} className="text-violet-600 hover:underline">{r.name}</Link> },
          { key: 'email', header: '이메일', span: 5 },
          { key: 'role', header: '권한', className: 'text-center', headerClassName: 'text-center', span: 1, render: (v, r) => (
            <select
              className="mx-auto block rounded border px-2 py-1 text-xs"
              defaultValue={String(v)}
              onChange={async (e) => {
                const role = e.target.value as 'user' | 'admin'
                await fetch(`/api/admin/users/${r.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role }) })
                push('권한을 변경했습니다.', 'success')
                router.refresh()
              }}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          ) },
          { key: 'status', header: '상태', className: 'text-center', headerClassName: 'text-center', span: 1, render: (v) => (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${v === 'blocked' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{v === 'blocked' ? '차단' : '활성'}</span>
          ) },
          { key: 'joinedAt', header: '가입일', className: 'text-center whitespace-nowrap', headerClassName: 'text-center', span: 1 },
          { key: 'id', header: '작업', className: 'text-right', headerClassName: 'text-center', span: 1, render: (_, r) => (
            <div className="flex justify-end gap-1">
              {r.status === 'blocked' ? (
                <button onClick={() => setConfirm({ open: true, id: r.id, action: 'unblock' })} className="rounded-md border px-2 py-1 text-xs text-emerald-700">해제</button>
              ) : (
                <button onClick={() => setConfirm({ open: true, id: r.id, action: 'block' })} className="rounded-md border px-2 py-1 text-xs text-rose-600">차단</button>
              )}
            </div>
          ) },
        ]}
        rows={current}
      />

      <Paginator page={page} total={total} pageSize={pageSize} onChange={setPage} />

      <ConfirmModal
        open={confirm.open}
        title={confirm.action === 'block' ? '이 사용자를 차단할까요?' : '차단을 해제할까요?'}
        message={confirm.action === 'block' ? '차단 시 로그인이 제한될 수 있습니다.' : '해제 시 사용자가 다시 이용할 수 있습니다.'}
        onClose={() => setConfirm({ open: false })}
        onConfirm={async () => {
          if (!confirm.id || !confirm.action) return
          await fetch(`/api/admin/users/${confirm.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: confirm.action === 'block' ? 'blocked' : 'active' }) })
          push(confirm.action === 'block' ? '사용자를 차단했습니다.' : '차단을 해제했습니다.', 'success')
          setConfirm({ open: false })
          router.refresh()
        }}
      />

      <ConfirmModal
        open={confirmBulk.open}
        title={confirmBulk.action === 'block' ? '선택 사용자 차단' : '선택 사용자 차단 해제'}
        message={`선택된 ${bulk.size}명에 대해 ${confirmBulk.action === 'block' ? '차단' : '해제'} 처리합니다.`}
        onClose={() => setConfirmBulk({ open: false })}
        onConfirm={async () => {
          const action = confirmBulk.action
          if (!action || bulk.size === 0) return
          await Promise.all(
            Array.from(bulk).map((id) =>
              fetch(`/api/admin/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: action === 'block' ? 'blocked' : 'active' }),
              }),
            ),
          )
          push(action === 'block' ? '선택 사용자를 차단했습니다.' : '선택 사용자 차단을 해제했습니다.', 'success')
          setConfirmBulk({ open: false })
          setBulk(new Set())
          router.refresh()
        }}
      />
    </div>
  )
}


