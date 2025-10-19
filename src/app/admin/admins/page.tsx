import { listUsers, updateUser } from '@/app/api/admin/users/store'
import Link from 'next/link'

export default async function AdminAdminsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const page = Number((sp.page as string) ?? '1')
  const pageSize = Number((sp.pageSize as string) ?? '10')
  const { items } = listUsers({ page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  const admins = items.filter((u) => u.role === 'admin' || u.role === 'superadmin')
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">관리자 관리</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">총관리자(개발자)는 관리자 권한을 부여/해제할 수 있습니다.</p>
        </div>
        <Link href="/admin/users" className="rounded-md border px-3 py-2 text-sm">사용자 목록</Link>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="px-3 py-2">이름</th>
              <th className="px-3 py-2">이메일</th>
              <th className="px-3 py-2">역할</th>
              <th className="px-3 py-2 text-right">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {admins.map((u) => (
              <tr key={u.id}>
                <td className="px-3 py-2 text-gray-800 dark:text-gray-200">{u.name}</td>
                <td className="px-3 py-2 text-gray-600 dark:text-gray-300">{u.email}</td>
                <td className="px-3 py-2">{u.role}</td>
                <td className="px-3 py-2 text-right">
                  <form action={async () => { 'use server'; updateUser(u.id, { role: u.role === 'superadmin' ? 'superadmin' : 'user' }) }}>
                    <button className="rounded-md border px-3 py-1.5 text-xs" disabled={u.role === 'superadmin'}>
                      {u.role === 'admin' ? '관리자 해제' : '해제 불가'}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


