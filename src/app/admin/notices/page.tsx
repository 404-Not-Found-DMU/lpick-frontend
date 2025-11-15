import NoticesAdminClient from './parts/NoticesAdminClient'
import ClientSuperadminGate from '../parts/ClientSuperadminGate'

async function AdminNoticesPageImpl({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const q = (sp.q as string) ?? ''
  const page = Number((sp.page as string) ?? '1')
  const pageSize = Number((sp.pageSize as string) ?? '10')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">공지사항 관리</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">공지 목록/작성/수정을 관리합니다.</p>
      </div>
      <NoticesAdminClient initialQuery={q} initialPage={Number.isFinite(page) ? page : 1} initialPageSize={Number.isFinite(pageSize) ? pageSize : 10} />
    </div>
  )
}

export default function AdminNoticesPage(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <ClientSuperadminGate>
      <AdminNoticesPageImpl {...props} />
    </ClientSuperadminGate>
  )
}


