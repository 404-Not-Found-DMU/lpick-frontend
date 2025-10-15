import NoticesAdminClient from './parts/NoticesAdminClient'
import ClientSuperadminGate from '../parts/ClientSuperadminGate'
import type { NoticeItem } from '@/app/support/types'
import { listNotices } from '@/app/api/admin/notices/store'

async function AdminNoticesPageImpl({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const q = (sp.q as string) ?? ''
  const page = Number((sp.page as string) ?? '1')
  const pageSize = Number((sp.pageSize as string) ?? '10')
  const sortBy = (sp.sortBy as 'date' | 'views') ?? 'date'
  const sortDir = (sp.sortDir as 'asc' | 'desc') ?? 'desc'
  const { items, total } = listNotices({
    q,
    page: Number.isFinite(page) ? page : 1,
    pageSize: Number.isFinite(pageSize) ? pageSize : 10,
    sortBy,
    sortDir,
  })
  const mapped: NoticeItem[] = items.map((n) => ({
    id: n.id,
    title: n.title,
    summary: n.summary,
    date: n.date,
    type: n.type,
    views: n.views,
  }))
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">공지사항 관리</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">공지 목록/작성/수정을 관리합니다.</p>
      </div>
      <NoticesAdminClient
        items={mapped}
        q={q}
        page={Number.isFinite(page) ? page : 1}
        total={total}
        pageSize={Number.isFinite(pageSize) ? pageSize : 10}
        sortBy={sortBy}
        sortDir={sortDir}
      />
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


