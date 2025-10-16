import InquiryAdminClient from './parts/InquiryAdminClient'
import ClientSuperadminGate from '../parts/ClientSuperadminGate'
import { listInquiries } from '@/app/api/admin/inquiries/store'

async function AdminInquiryPageImpl({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const q = (sp.q as string) ?? ''
  const status = ((sp.status as string) as '전체' | '대기' | '완료') ?? '전체'
  const page = Number((sp.page as string) ?? '1')
  const pageSize = Number((sp.pageSize as string) ?? '10')
  const { items, total } = listInquiries({ q, status, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">1:1 문의 관리</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">문의 스레드/답변 작성을 관리합니다.</p>
      </div>
      <InquiryAdminClient items={items} total={total} q={q} status={status} page={Number.isFinite(page) ? page : 1} pageSize={Number.isFinite(pageSize) ? pageSize : 10} />
    </div>
  )
}

export default function AdminInquiryPage(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <ClientSuperadminGate>
      <AdminInquiryPageImpl {...props} />
    </ClientSuperadminGate>
  )
}


