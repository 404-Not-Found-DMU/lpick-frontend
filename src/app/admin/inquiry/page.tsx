import InquiryAdminClient from './parts/InquiryAdminClient'
import { listInquiries } from '@/app/api/admin/inquiries/store'

export default function AdminInquiryPage() {
  const { items, total } = listInquiries({ page: 1, pageSize: 1000 })
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">1:1 문의 관리</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">문의 스레드/답변 작성을 관리합니다.</p>
      </div>
      <InquiryAdminClient items={items} />
    </div>
  )
}


