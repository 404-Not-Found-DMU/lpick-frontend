import ExpertAdminClient from './parts/ExpertAdminClient'
import { listExperts } from '@/app/api/admin/experts/store'

export default async function AdminExpertPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const q = (sp.q as string) ?? ''
  const status = ((sp.status as string) as '전체' | '대기' | '승인' | '반려') ?? '전체'
  const page = Number((sp.page as string) ?? '1')
  const pageSize = Number((sp.pageSize as string) ?? '10')
  const { items, total } = listExperts({ q, status, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">전문가 등업 심사</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">등업 신청 확인/승인/반려를 처리합니다.</p>
      </div>
      <ExpertAdminClient items={items} total={total} q={q} status={status} page={Number.isFinite(page) ? page : 1} pageSize={Number.isFinite(pageSize) ? pageSize : 10} />
    </div>
  )
}


