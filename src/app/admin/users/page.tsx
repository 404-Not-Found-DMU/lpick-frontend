import UsersAdminClient from './parts/UsersAdminClient'
import { listUsers } from '@/app/api/admin/users/store'

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const q = (sp.q as string) ?? ''
  const status = ((sp.status as string) as 'all' | 'active' | 'blocked') ?? 'all'
  const role = ((sp.role as string) as 'all' | 'user' | 'admin') ?? 'all'
  const page = Number((sp.page as string) ?? '1')
  const pageSize = Number((sp.pageSize as string) ?? '10')
  const { items, total } = listUsers({ q, status, role, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">사용자 관리</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">사용자 목록/검색과 역할 변경을 관리합니다.</p>
      </div>
      <UsersAdminClient items={items} total={total} q={q} status={status} role={role} page={Number.isFinite(page) ? page : 1} pageSize={Number.isFinite(pageSize) ? pageSize : 10} />
    </div>
  )
}


