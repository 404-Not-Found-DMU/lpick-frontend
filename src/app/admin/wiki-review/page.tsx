import { listReviews } from '@/app/api/admin/wiki-review/store'
import WikiReviewAdminClient from './parts/WikiReviewAdminClient'

export default async function AdminWikiReviewPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const q = (sp.q as string) ?? ''
  const status = ((sp.status as string) as '전체' | '대기' | '승인' | '반려') ?? '전체'
  const page = Number((sp.page as string) ?? '1')
  const pageSize = Number((sp.pageSize as string) ?? '10')
  const { items, total } = listReviews({ q, status, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">위키 검수</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">편집 대기 목록을 확인하고 승인/반려합니다.</p>
      </div>
      <WikiReviewAdminClient items={items} total={total} q={q} status={status} page={Number.isFinite(page) ? page : 1} pageSize={Number.isFinite(pageSize) ? pageSize : 10} />
    </div>
  )
}


