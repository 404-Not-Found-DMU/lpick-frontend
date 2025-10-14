import ExpertAdminClient from './parts/ExpertAdminClient'
import { listExperts } from '@/app/api/admin/experts/store'

export default function AdminExpertPage() {
  const { items, total } = listExperts({ page: 1, pageSize: 1000 })
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">전문가 등업 심사</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">등업 신청 확인/승인/반려를 처리합니다.</p>
      </div>
      <ExpertAdminClient items={items} total={total} />
    </div>
  )
}


