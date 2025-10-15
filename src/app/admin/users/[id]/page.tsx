import Link from 'next/link'
import { getUserById, updateUser } from '@/app/api/admin/users/store'
import { redirect } from 'next/navigation'

export default async function AdminUserDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { id } = await params
  const sp = await searchParams
  const saved = sp.saved === '1'
  const item = getUserById(Number(id))
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">사용자 상세 #{id}</h2>
        <Link href="/admin/users" className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">목록</Link>
      </div>
      {saved ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">변경 사항이 저장되었습니다.</div>
      ) : null}
      {!item ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">존재하지 않는 사용자입니다.</div>
      ) : (
        <div className="space-y-6">
          <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="이름" value={item.name} />
              <Field label="이메일" value={item.email} />
              <Field label="권한" value={item.role} />
              <Field label="상태" value={item.status === 'blocked' ? '차단' : '활성'} />
              <Field label="가입일" value={item.joinedAt} />
            </div>
          </section>
          <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">최근 활동 로그</h3>
            <div className="mt-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span className="truncate pr-3 text-gray-800 dark:text-gray-200">샘플 로그 항목 {i}</span>
                  <span className="text-gray-400">2025-08-10</span>
                </div>
              ))}
            </div>
          </section>
          <Actions id={item.id} role={item.role} status={item.status} />
        </div>
      )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
      <div className="mt-1 text-sm text-gray-900 dark:text-gray-100">{value}</div>
    </div>
  )
}

function Actions({ id, role, status }: { id: number; role: 'user' | 'admin' | 'superadmin'; status: 'active' | 'blocked' }) {
  async function save(formData: FormData) {
    'use server'
    const nextRole = formData.get('role') as 'user' | 'admin' | 'superadmin'
    const nextStatus = formData.get('status') as 'active' | 'blocked'
    updateUser(id, { role: nextRole, status: nextStatus })
    redirect(`/admin/users/${id}?saved=1`)
  }
  return (
    <form action={save} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">권한</label>
          <select name="role" defaultValue={role} className="w-full rounded-md border px-3 py-2 text-sm">
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="superadmin">superadmin</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">상태</label>
          <select name="status" defaultValue={status} className="w-full rounded-md border px-3 py-2 text-sm">
            <option value="active">활성</option>
            <option value="blocked">차단</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Link href="/admin/users" className="rounded-md border px-4 py-2 text-sm">목록</Link>
        <button className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white">저장</button>
      </div>
    </form>
  )
}


