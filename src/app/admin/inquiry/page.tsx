import InquiryAdminClient from './parts/InquiryAdminClient'
import ClientSuperadminGate from '../parts/ClientSuperadminGate'

export default function AdminInquiryPage() {
  return (
    <ClientSuperadminGate>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl.font-bold text-gray-900 dark:text-gray-100">1:1 문의 관리</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">문의 스레드/답변 작성을 관리합니다.</p>
        </div>
        <InquiryAdminClient />
      </div>
    </ClientSuperadminGate>
  )
}


