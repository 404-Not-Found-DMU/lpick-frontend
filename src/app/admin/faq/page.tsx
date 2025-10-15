import FaqAdminClient from './parts/FaqAdminClient'
import ClientSuperadminGate from '../parts/ClientSuperadminGate'
import { listFaqs } from '@/app/api/admin/faqs/store'

function AdminFaqPageImpl() {
  const { items, total } = listFaqs({ page: 1, pageSize: 1000 })
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">FAQ 관리</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">FAQ 목록/작성/수정을 관리합니다.</p>
      </div>
      <FaqAdminClient items={items} total={total} />
    </div>
  )
}

export default function AdminFaqPage() {
  return (
    <ClientSuperadminGate>
      <AdminFaqPageImpl />
    </ClientSuperadminGate>
  )
}


