import { listReports } from '@/app/api/admin/reports/store'
import ReportsAdminClient from './parts/ReportsAdminClient'

export default async function AdminReportsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const q = (sp.q as string) ?? ''
  const status = ((sp.status as string) as '전체' | 'open' | 'ignored' | 'warned' | 'suspended' | 'banned') ?? '전체'
  const page = Number((sp.page as string) ?? '1')
  const pageSize = Number((sp.pageSize as string) ?? '10')
  const { items, total } = listReports({ q, status, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">신고/제재</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">신고 내역을 확인하고 적절한 제재를 수행합니다.</p>
      </div>
      <ReportsAdminClient items={items} total={total} q={q} status={status} page={Number.isFinite(page) ? page : 1} pageSize={Number.isFinite(pageSize) ? pageSize : 10} />
    </div>
  )
}


